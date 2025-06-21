import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Avatar,
  Container 
} from '@mui/material';

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user } = UserAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      const q = query(
        collection(db, 'messages'),
        where('roomId', '==', roomId),
        orderBy('createdAt')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesData);
      });

      return () => unsubscribe();
    }
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: user.displayName || user.email,
        userId: user.uid,
        roomId: roomId
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Room: {roomId}
        </Typography>
        <Box sx={{ 
          height: '60vh', 
          overflowY: 'auto', 
          border: '1px solid #ddd', 
          borderRadius: 1, 
          p: 2,
          mb: 2
        }}>
          <List>
            {messages.map((message) => (
              <ListItem 
                key={message.id} 
                sx={{ 
                  display: 'flex',
                  flexDirection: message.userId === user.uid ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  mb: 1
                }}
              >
                <Avatar sx={{ 
                  bgcolor: message.userId === user.uid ? 'primary.main' : 'secondary.main',
                  width: 32, 
                  height: 32,
                  mr: message.userId === user.uid ? 0 : 1,
                  ml: message.userId === user.uid ? 1 : 0
                }}>
                  {message.user.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ 
                  bgcolor: message.userId === user.uid ? 'primary.light' : 'secondary.light',
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: '70%'
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {message.user}
                  </Typography>
                  <Typography variant="body1">{message.text}</Typography>
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            sx={{ mr: 1 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!newMessage.trim()}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatRoom;

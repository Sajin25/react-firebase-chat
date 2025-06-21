import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button, TextField, List, ListItem, ListItemText, Container, Typography, Box } from '@mui/material';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, 'rooms'));
      const roomsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRooms(roomsData);
    };
    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (newRoomName.trim() === '') return;
    
    try {
      const docRef = await addDoc(collection(db, 'rooms'), {
        name: newRoomName,
        createdAt: new Date()
      });
      setRooms([...rooms, { id: docRef.id, name: newRoomName }]);
      setNewRoomName('');
    } catch (error) {
      console.error('Error adding room: ', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Chat Rooms
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            label="New Room Name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button 
            variant="contained" 
            onClick={handleCreateRoom}
          >
            Create
          </Button>
        </Box>
        <List>
          {rooms.map(room => (
            <ListItem 
              key={room.id} 
              button 
              component={Link} 
              to={`/rooms/${room.id}`}
              sx={{ border: '1px solid #ddd', mb: 1, borderRadius: 1 }}
            >
              <ListItemText primary={room.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default RoomList;

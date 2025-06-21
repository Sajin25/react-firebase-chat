import { Avatar, Box, Typography } from '@mui/material';
import { UserAuth } from '../../context/AuthContext';

const Message = ({ message }) => {
  const { user } = UserAuth();

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: message.userId === user.uid ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
      mb: 2,
      gap: 1
    }}>
      <Avatar sx={{ 
        bgcolor: message.userId === user.uid ? 'primary.main' : 'secondary.main',
        width: 32, 
        height: 32
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
    </Box>
  );
};

export default Message;

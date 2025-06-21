import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to React Chat
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          A real-time chat application built with React and Firebase
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/login"
            size="large"
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/signup"
            size="large"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;

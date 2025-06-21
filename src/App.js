import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import RoomList from './components/Chat/RoomList';
import ChatRoom from './components/Chat/ChatRoom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/rooms" 
            element={
              <ProtectedRoute>
                <RoomList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rooms/:roomId" 
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;

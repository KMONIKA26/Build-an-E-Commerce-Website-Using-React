import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './Context/AuthContext';
import Navbar from './Components/Navbar';
import Home from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/product/:productId' element={<ProductDetailsPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

const PrivateRoute = ({ children }) => {
  const { authstate } = usecontext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authstate.isAuthenticated) {
      navigate('/login');
    }
  }, [authstate.isAuthenticated, navigate]);

  return authstate.isAuthenticated ? children : null;
};

export default App;

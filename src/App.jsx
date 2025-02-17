import React, { useEffect } from 'react';
import Login from './Pages/Login';
import { Outlet, useNavigate } from 'react-router-dom';
import Layout from './Components/Layout';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);
  
  return token ? <Layout><Outlet /></Layout> : <Login />;
}

export default App;
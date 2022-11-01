import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Template from './components/Template';
import Login from './pages/Login';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/login');
    }
    // if (initialLoading === false) {
    //   if (pathname.startsWith('/admin')) {
    //     if (!isLogin) navigate('/login');
    //   }
    //   if (pathname === '/login') {
    //     if (isLogin) navigate('/admin/dashboard');
    //   }
    // }
  }, [pathname, navigate]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;

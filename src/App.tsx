import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Template from './components/Template';
import Login from './pages/Login';
import { AuthContext } from './contexts/AuthContext';
import { Spin } from 'antd';
import Dashboard from './pages/Admin/Dashboard';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { initialLoading, isLogin } = useContext(AuthContext);

  useEffect(() => {
    if (pathname === '/') {
      navigate('/login');
    }
    if (initialLoading === false) {
      if (pathname.startsWith('/admin')) {
        if (!isLogin) navigate('/login');
      }
      if (pathname === '/login') {
        if (isLogin) navigate('/admin/dashboard');
      }
    }
  }, [pathname, navigate, isLogin, initialLoading]);

  if (initialLoading) {
    return (
      <div className="fixed w-screen h-screen bg-white flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      {isLogin && (
        <Route path="admin" element={<Template />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;

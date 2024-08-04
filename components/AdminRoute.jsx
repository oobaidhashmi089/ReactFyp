import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);

  if (!authData || !authData.user || !authData.user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;

// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element, isAuthenticated, isAdmin }) => {
  return isAuthenticated && isAdmin ? element : <Navigate to="/login" />;
};

export default AdminRoute;

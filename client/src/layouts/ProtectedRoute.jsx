import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getSessionUser } from '../store/session';

const ProtectedRoute = ({ children }) => {
  const sessionUser = useSelector(getSessionUser);

  return sessionUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

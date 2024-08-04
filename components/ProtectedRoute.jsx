// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const { authData } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       element={
//         authData ? (
//           Component
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };


const ProtectedRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);

  return authData ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

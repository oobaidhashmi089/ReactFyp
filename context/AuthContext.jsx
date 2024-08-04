// // src/contexts/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Create a Context for authentication
// const AuthContext = createContext();

// // Create a Provider component
// export const AuthProvider = ({ children }) => {
//   const storedAuth = localStorage.getItem('authData');
//   const [authData, setAuthData] = useState(storedAuth ? JSON.parse(storedAuth) : null);
//   const navigate = useNavigate();

//   // Update localStorage when authData changes
//   const updateAuthData = (data) => {
//     setAuthData(data);
//     if (data) {
//       localStorage.setItem('authData', JSON.stringify(data));
//     } else {
//       localStorage.removeItem('authData');
//     }
//   };

//   const logout = () => {
//     setAuthData(null);
//     localStorage.removeItem('authData');
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ authData, setAuthData: updateAuthData, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedAuth = localStorage.getItem('authData');
  const [authData, setAuthData] = useState(storedAuth ? JSON.parse(storedAuth) : null);
  const navigate = useNavigate();

  const updateAuthData = (data) => {
    setAuthData(data);
    if (data) {
      localStorage.setItem('authData', JSON.stringify(data));
    } else {
      localStorage.removeItem('authData');
    }
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData: updateAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

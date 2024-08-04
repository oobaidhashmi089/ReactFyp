
// src/components/Logout.js
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Ensure the import path is correct

const Logout = () => {
  const { logout } = useContext(AuthContext); // Destructure logout from context

  const handleLogout = () => {
    if (typeof logout === 'function') {
      logout(); // Call logout function
      alert('You have been logged out.');
    } else {
      console.error('logout is not a function:', logout);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;


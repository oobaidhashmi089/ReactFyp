// // src/components/Login.js
// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import AuthContext from '../context/AuthContext'; // Import default export

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { setAuthData } = useContext(AuthContext); // Destructure setAuthData from context

//   // Check if setAuthData is available
//   if (!setAuthData) {
//     throw new Error('AuthContext is not provided properly');
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://nodejs-fyp-production.up.railway.app/login', { email, password });
//       setAuthData(response.data);
//       localStorage.setItem('token', response.data.token);
//       alert('Login successful!');
//     } catch (error) {
//       console.error('Error logging in:', error); // Log error details for debugging
//       alert('Error logging in');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import default export

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData } = useContext(AuthContext); 
  const navigate = useNavigate(); // Destructure setAuthData from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://nodejs-fyp-production.up.railway.app/login', { email, password });
     // setAuthData(response.data);
     const userData = response.data;
      setAuthData(userData);
      if (!userData || !userData.user || typeof userData.user.isAdmin === 'undefined') {
        throw new Error('Invalid response from server');
      }
      if (userData.user.isAdmin) {
        navigate('/Admin');
      } else {
        navigate('/'); // Or any default user page
      }
     
     // navigate('/'); // Set authData from response
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error); // Log error details for debugging
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


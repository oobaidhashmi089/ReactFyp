// src/components/CreateWidget.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom'; 

const PublishWidget = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [widgetName, setWidgetName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [Image, setImage] = useState('');
  const navigate = useNavigate(); 

  // Handle case where authData is null or token is not available
  if (!authData || !authData.token) {
    return <p>You need to be logged in to create a widget.</p>; // Or redirect to login
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://nodejs-fyp-production.up.railway.app/widgets', 
        { widgetName, code, category, Image }, 
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      navigate('/'); 
      alert('Widget created successfully and pending approval');
    } catch (error) {
      console.error('Error creating widget:', error.response ? error.response.data : error.message);
      alert('Error creating widget');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Widget Name"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
        required
      />
      <textarea
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={Image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <Button type="submit">Create Widget</Button>
   
    </form>
  );
};


export default PublishWidget;

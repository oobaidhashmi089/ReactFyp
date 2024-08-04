// src/components/UpdateWidget.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const UpdateWidget = () => {
  const { id } = useParams();
  const { authData } = useContext(AuthContext);
  const [widgetName, setWidgetName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWidget = async () => {
      try {
        const response = await axios.get(`https://nodejs-fyp-production.up.railway.app/my-widgets/${id}`, {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        const widget = response.data;
        setWidgetName(widget.widgetName);
        setCode(widget.code);
        setCategory(widget.category);
        setImage(widget.Image);
      } catch (error) {
        console.error('Error fetching widget details:', error);
        alert('Failed to fetch widget details. Please try again.');
      }
    };

    fetchWidget();
  }, [id, authData.token]);

  const handleUpdateWidget = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://nodejs-fyp-production.up.railway.app/widgets/${id}`, 
        { widgetName, code, category, Image: image }, 
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      alert('Widget updated successfully');
      navigate('/MyWidgets');
    } catch (error) {
      console.error('Error updating widget:', error);
      alert('Failed to update widget. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Widget</h2>
      <form onSubmit={handleUpdateWidget}>
        <input
          type="text"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          placeholder="Widget Name"
          required
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          required
        />
        <button type="submit">Update Widget</button>
      </form>
    </div>
  );
};

export default UpdateWidget;

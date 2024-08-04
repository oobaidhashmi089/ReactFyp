// src/components/MyWidgets.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyWidgets = () => {
  const { authData } = useContext(AuthContext);
  const [widgets, setWidgets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await axios.get('https://nodejs-fyp-production.up.railway.app/my-widgets', {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        setWidgets(response.data);
      } catch (error) {
        console.error('Error fetching widgets:', error);
        alert('Failed to fetch widgets. Please try again.');
      }
    };

    fetchWidgets();
  }, [authData.token]);

  const handleUpdate = (id) => {
    navigate(`/UpdateWidget/${id}`);
  };

  const handleDeleteWidget = async (id) => {
    try {
      await axios.delete(`https://nodejs-fyp-production.up.railway.app/widgets/${id}`, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });
      setWidgets(widgets.filter(widget => widget._id !== id));
      alert('Widget deleted successfully');
    } catch (error) {
      console.error('Error deleting widget:', error.response ? error.response.data : error.message);
      alert('Failed to delete widget. Please try again.');
    }
  };

  return (
    <div>
      <h2>My Widgets</h2>
      <ul>
        {widgets.map(widget => (
          <li key={widget._id}>
            <h3>{widget.widgetName}</h3>
            <p>{widget.code}</p>
            <p>_______________</p>
            <p>{widget.status}</p>
            <p>_______________</p>
            <p>Category: {widget.category}</p>
            <img src={widget.Image} alt={widget.widgetName} style={{ width: '100px' }} />
            <h1>|</h1>
            <button onClick={() => handleUpdate(widget._id)}>Update</button>
            <h1>|</h1>
            <button onClick={() => handleDeleteWidget(widget._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyWidgets;

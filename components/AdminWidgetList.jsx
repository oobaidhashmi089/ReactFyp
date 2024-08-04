// src/components/AdminWidgetList.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext'; 

const AdminWidgetList = () => {
  const { authData } = useContext(AuthContext);
  const [widgets, setWidgets] = useState([]);
  
  if (!authData || !authData.token) {
    return <p>You need to be logged in to create a widget.</p>; // Or redirect to login
  }

  useEffect(() => {
    const fetchWidgets = async () => {
      const response = await axios.get('https://nodejs-fyp-production.up.railway.app/widgets');
      setWidgets(response.data);
    };

    fetchWidgets();
  }, []);

 

  const handleApprove = async (id) => {
    try {
      await axios.put(`https://nodejs-fyp-production.up.railway.app/admin/widgets/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });
      alert('Widget approved');
      setWidgets(widgets.filter(widget => widget._id !== id));
    } catch (error) {
      alert('Error Approving Widget or Only Admin Can Approve!');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`https://nodejs-fyp-production.up.railway.app/admin/widgets/${id}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });
      alert('Widget rejected');
      setWidgets(widgets.filter(widget => widget._id !== id));
    } catch (error) {
      alert('Error rejecting Widget or Only Admin Can Reject!');
    }
  };

  return (
    <div>
      <h1>Admin Widget List</h1>
      <ul>
        {widgets.map((widget) => (
          <li key={widget._id}>
            {widget.widgetName} 
            <button onClick={() => handleApprove(widget._id)}>Approve</button>
            <button onClick={() => handleReject(widget._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AdminWidgetList;

// src/components/WidgetList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Approvedwidgets = () => {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    const fetchWidgets = async () => {
      const response = await axios.get('https://nodejs-fyp-production.up.railway.app/approvedwidgets');
      console.log(response.data);
      setWidgets(response.data);
    };

    fetchWidgets();
  }, []);

  return (
    <div>
      <h1>Widgets</h1>
      <ul>
        {widgets.map((widget) => (
          <li key={widget._id}>  {`${widget.widgetName}, ${widget.code}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Approvedwidgets;

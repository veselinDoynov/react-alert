import React, { useState, useEffect } from 'react';
import { alerts } from '../alerts-mockup';
import { Link, useParams } from 'react-router-dom';
const Alert = () => {
  const [name, setName] = useState('default name');
  const { id, currentPage } = useParams();


  useEffect(() => {
    const newAlert = alerts.find((alert) => alert.id === parseInt(id));
    setName(newAlert.name);
  }, []);
  return (
    <div>
      <h1>{name}</h1>
        <Link to={`/alerts/${currentPage}`} className='btn'>Back To Alerts</Link>
    </div>
  );
};

export default Alert;

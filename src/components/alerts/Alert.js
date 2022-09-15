import React, { useState, useEffect } from 'react';
import { alerts } from '../alerts-mockup';
import { Table  } from "antd";
import "../../index.css";
import "antd/dist/antd.css";
const Alert = ({id}) => {
  const [alert, setAlert] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Alert description',
            dataIndex: 'moreDetails',
            key: 'moreDetails',
        },

    ];


  useEffect(() => {
    const newAlert = alerts.find((alert) => alert.id === parseInt(id));
    setAlert(newAlert);
  });
  return (
    <div className="container">
        <h3>{alert.name}</h3>
        <Table
            dataSource={[alert]}
            columns={columns}
            pagination={false}
        />
    </div>
  );
};

export default Alert;

import React, { useState, useEffect } from 'react';
import {Spin, Table} from "antd";
import "../../index.css";
import "antd/dist/antd.css";


import {getRequest, postRequest, postRequestFromData} from "../services/ApiRequests";
import moment from "moment";

const Alert = ({id}) => {
    const [alert, setAlert] = useState([]);

    const columns = [
        {
            title: 'Titel',
            dataIndex: 'Titel',
            key: 'Titel',
        },
        {
            title: 'Begindatum',
            dataIndex: 'Begindatum',
            key: 'Begindatum',
            render: function( date ) {
                return moment(date).toLocaleString();
            }
        },
        {
            title: 'Message',
            dataIndex: 'text',
            key: 'text',
            render: function( text ) { return <div dangerouslySetInnerHTML={{__html: text}} />; }
        },

    ];


  useEffect(() => {

      let postData = {username: process.env.REACT_APP_AWT_USERNAME, password: process.env.REACT_APP_AWT_PASSWORD}
      postRequestFromData(process.env.REACT_APP_AWT_LOGIN, postData).then(response => {
          let token = response.data.access_token;

          getRequest(process.env.REACT_APP_ALERTS_URI, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
              }
          }).then(response => {
              const newAlert = response.response.find((alert) => alert.id === parseInt(id));
              setAlert(newAlert);
          })

      })
  });
  return (
    <>

        {alert.id == id ? (
            <>
                <h3>{alert.Titel}</h3>
                <Table
                    dataSource={[alert]}
                    columns={columns}
                    pagination={false}
                />
            </>
        ) : (
            <Spin size="large" tip="Loading..."/>
        )}
    </>
  );
};

export default Alert;

import React, { useState, useEffect } from 'react';
import {Spin, Table} from "antd";
import "../../index.css";
import "antd/dist/antd.css";


import {getRequest, postRequest} from "../services/ApiRequests";
import moment from "moment";

const url = 'https://sugarcrm-test.internal.degiro.eu/sugar_spice_api_test/messages.php'

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
      getRequest(url, {
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              //'Cookie':'PHPSESSID=e51f435753622e2b2b6be8b11b09685f'
          }
      }).then( response => {
          const newAlert = response.response.find((alert) => alert.id === parseInt(id));
          setAlert(newAlert);
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

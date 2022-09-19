import React from "react";
import { Table, Input, Button, DatePicker} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../index.css";
import "antd/dist/antd.css";
import {alerts} from '../alerts-mockup';
import Alert from "./Alert";
import moment from "moment";
import {getRequest, postRequest} from "../services/ApiRequests";

const url = 'https://sugarcrm-test.internal.degiro.eu/sugar_spice_api_test/messages.php'

const columns = [
    {
        title: 'Titel',
        dataIndex: 'Titel',
        key: 'Titel',
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                         }) => {
            return (
                <>
                    <Input
                        autoFocus
                        placeholder="Search ..."
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}
                    ></Input>
                    <Button
                        onClick={() => {
                            confirm();
                        }}
                        type="primary"
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters();
                        }}
                        type="warning"
                    >
                        Reset
                    </Button>
                </>
            )
        },
        filterIcon: () => {
            return <SearchOutlined />
        },
        onFilter: (value, record) => {
            return record.Titel.toLowerCase().includes(value.toLowerCase());
        },
    },
    {
        title: 'Begindatum',
        dataIndex: 'Begindatum',
        key: 'Begindatum',
        sorter: (a, b) => moment(a.Begindatum) - moment(b.Begindatum),
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                         }) => {
            return (
                <>
                    <DatePicker.RangePicker
                        style={{ marginBottom: 8, display: 'block' }}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e ? [e] : [])}
                        dateFormat={"d/M/Y h:mm"}
                    />
                    <Button
                        onClick={() => {
                            confirm();
                        }}
                        type="primary"
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters();
                        }}
                        type="warning"
                    >
                        Reset
                    </Button>
                </>
            )
        },
        filterIcon: () => {
            return <SearchOutlined />
        },
        onFilter: (value, record) => {

            return record.Begindatum ? moment(record.Begindatum).isBetween(value[0], value[1], 'day', '[]') : ""
        }
    },
    {
        title: 'Type',
        dataIndex: 'Typename',
        key: 'Typename',
    },
    {
        title: 'Message',
        dataIndex: 'text',
        key: 'text',
        render: function( text ) { return <div dangerouslySetInnerHTML={{__html: text}} />; }
    },
    {
        title: 'Open',
        dataIndex: 'link',
        key: 'link',
    },

];

class Alerts extends React.Component {
    state = {
        data: [],
        showAlert: false,
        alertId : 0,
        alertsData: [],
    };

    componentDidMount() {

        getRequest(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                //'Cookie':'PHPSESSID=e51f435753622e2b2b6be8b11b09685f'
            }
        }).then( response => {
            this.setState({
                alertsData: this.updateData(response.response),
            })
        })
        this.setState({
            data: this.updateData(alerts),
        })

    }

    updateData = (data) => {
        return data.map((row)  => {
            return  {...row, link:<a href="#" id={`${row.id}`} >View</a>, key: `${row.id}`};
        });
    }

    showAlert = (id) => {

        this.setState({
            showAlert: true,
            alertId: id,
        })
    }

    render() {
        const { data, alertsData } = this.state;

        return (
            <>
                {alertsData.length > 0 ? (
                    <>
                        <br/>
                        {this.state.showAlert ? <Alert id={this.state.alertId}/> :''}
                        <br/>
                        <h3>Alerts</h3>
                        <Table
                            dataSource={alertsData}
                            columns={columns}
                            pagination={{ showSizeChanger: true}}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => {
                                        this.showAlert(record.id);
                                    }, // click row
                                };
                            }}
                        />
                    </>
                ) : (
                    <p>Loading ...</p>
                )}
            </>
        );
    }
}

export default Alerts;

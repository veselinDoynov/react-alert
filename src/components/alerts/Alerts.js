import React from "react";
import {Table, Input, Button, DatePicker} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import "../../index.css";
import "antd/dist/antd.css";
import AlertComponent from "./Alert";
import moment from "moment";
import {getRequest, postRequest, postRequestFromData} from "../services/ApiRequests";
import {Alert, Spin} from 'antd';


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
                            confirm({closeDropdown: false});
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
            return <SearchOutlined/>
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
                        style={{marginBottom: 8, display: 'block'}}
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
            return <SearchOutlined/>
        },
        onFilter: (value, record) => {

            return record.Begindatum ? moment(record.Begindatum).isBetween(value[0], value[1], 'day', '[]') : ""
        }
    },
    {
        title: 'Type',
        dataIndex: 'Typename',
        key: 'Typename',
        filters: [
            {
                text: 'MESSAGE',
                value: 'MESSAGE',
            },
            {
                text: 'ALERT',
                value: 'ALERT',
            },
        ],
        onFilter: (value, record) => record.Typename.startsWith(value),
        filterSearch: true,
    },
    {
        title: 'Message',
        dataIndex: 'text',
        key: 'text',
        render: function (text) {
            return <div dangerouslySetInnerHTML={{__html: text}}/>;
        }
    },
    {
        title: '',
        dataIndex: 'link',
        key: 'link',
    },

];

class Alerts extends React.Component {
    state = {
        data: [],
        showAlert: false,
        alertId: 0,
        alertsData: [],
    };

    componentDidMount() {

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
                this.setState({
                    alertsData: this.updateData(response.response)
                });
            })

        })
    }

    updateData = (data) => {
        return data.map((row) => {
            return {...row, link: <a href="#" id={`${row.id}`}>View</a>, key: `${row.id}`};
        });
    }

    showAlert = (id) => {

        this.setState({
            showAlert: true,
            alertId: id,
        })
    }

    render() {
        const {data, alertsData} = this.state;

        return (
            <>
                {alertsData.length > 0 ? (
                    <>
                        <br/>
                        {this.state.showAlert ? <AlertComponent id={this.state.alertId}/> : ''}
                        <br/>
                        <h3>Alerts</h3>
                        <Table
                            dataSource={alertsData}
                            columns={columns}
                            pagination={{showSizeChanger: true}}
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
                    <Spin size="large" tip="Loading..."/>
                )}
            </>
        );
    }
}

export default Alerts;

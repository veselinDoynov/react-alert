import React from "react";
import { Table, Input, Button, DatePicker} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../index.css";
import "antd/dist/antd.css";
import {alerts} from '../alerts-mockup';
import Alert from "./Alert";
import moment from "moment";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
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
            return record.name.toLowerCase().includes(value.toLowerCase());
        },
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
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
            return record.date ? moment(record.date).isBetween(value[0], value[1], 'day', '[]') : ""
        }
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
    };

    componentDidMount() {

        this.setState({
            data: this.updateData(alerts),
        })
    }

    updateData = (data) => {
        return data.map((row)  => {
            return  {...row, link:<a href="#" id={`${row.id}`} >View Alert</a>};
        });
    }

    showAlert = (id) => {

        this.setState({
            showAlert: true,
            alertId: id,
        })
    }

    render() {
        const { data} = this.state;
        return (
            <>
                <br/>
                {this.state.showAlert ? <Alert id={this.state.alertId}/> :''}
                <br/>
                <h3>Alerts</h3>
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={{ showSizeChanger: true}}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                this.showAlert(record.id);
                            }, // click row
                        };
                    }}
                />;
            </>

        );
    }
}

export default Alerts;

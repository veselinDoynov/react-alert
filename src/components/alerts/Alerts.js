import React from "react";
import { Table  } from "antd";
import "../../index.css";
import "antd/dist/antd.css";
import {alerts} from '../alerts-mockup';
import Alert from "./Alert";

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

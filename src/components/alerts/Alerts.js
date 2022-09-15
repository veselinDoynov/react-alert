import React from "react";
import { Pagination, Table  } from "antd";
import "../../index.css";
import "antd/dist/antd.css";
import {alerts} from '../alerts-mockup';
import {Link} from "react-router-dom";

const pageSize = 4;

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
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    };

    componentDidMount() {

        const currentPageParam = window.location.href.split("alerts/");
        const currentPage = currentPageParam[1] ? parseInt(currentPageParam[1]) : 0;
        this.setState({
            data: this.updateData(alerts),
            totalPage: alerts.length / pageSize,
            minIndex: 0,
            maxIndex: pageSize
        })
        if(currentPage > 0) {
            this.handleChange(currentPage);
        }
    }

    handleChange = (page) => {
        this.setState({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
        this.setState({
            data: this.updateData(alerts),
        })
    };

    updateData = (data) => {
        return data.map((row)  => {
            return  {...row, link:<Link to={`/alert/${row.id}/${this.state.current}`}>Open</Link>};
        });
    }

    render() {
        const { data, current, minIndex, maxIndex } = this.state;
        return (
            <>
                <h1>Alert Page</h1>
                {/*<Items  data = {data} minIndex= {minIndex} maxIndex= {maxIndex} currentPage = {current} />*/}
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={{ pageSize: 5, showSizeChanger: true}}
                />;
                {/*<Pagination*/}
                {/*    pageSize={pageSize}*/}
                {/*    current={current}*/}
                {/*    total={data.length}*/}
                {/*    onChange={this.handleChange}*/}
                {/*    style={{ bottom: "0px" }}*/}
                {/*    showSizeChanger*/}
                {/*    showQuickJumper*/}
                {/*    showTotal={(total) => `Total ${total} items`}*/}
                {/**/}
                {/*/>*/}
            </>

        );
    }
}

const Items = ({ data, minIndex, maxIndex, currentPage }) =>  {
    return (
        <>
            {data?.map(
            (alert, index) =>
                index >= minIndex &&
                index < maxIndex && (
                    <div key={alert.id} className='item'>
                        <h4>{alert.name}</h4>
                        <h3>{alert.date}</h3>
                        <Link to={`/alert/${alert.id}/${currentPage}`}>Open</Link>
                    </div>
                )
        )}
        </>
    );
}



export default Alerts;

import React from "react";
import { Pagination } from "antd";
import "../../index.css";
import "antd/dist/antd.css";
import {alerts} from '../alerts-mockup';
import {Link} from "react-router-dom";


const pageSize = 4;

class Alerts extends React.Component {
    state = {
        data: [],
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    };

    componentDidMount() {
        this.setState({
            data: alerts,
            totalPage: alerts.length / pageSize,
            minIndex: 0,
            maxIndex: pageSize
        })
    }

    handleChange = (page) => {
        this.setState({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };

    render() {
        const { data, current, minIndex, maxIndex } = this.state;
        return (
            <>
                <h1>Alert Page</h1>
                <Items  data = {data} minIndex= {minIndex} maxIndex= {maxIndex} currentPage = {current} />
                <Pagination
                    pageSize={pageSize}
                    current={current}
                    total={data.length}
                    onChange={this.handleChange}
                    style={{ bottom: "0px" }}
                />
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

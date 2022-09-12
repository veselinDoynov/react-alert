import React, {useState, useEffect} from 'react';
import { alerts } from '../alerts-mockup';
import {Link, useParams} from 'react-router-dom';
import ReactPaginate from 'react-paginate';


const Alerts = () => {

    const itemsPerPage = 4;
    const [pageCount, setPageCount] = useState(0);
    const [currentItems, setCurrentItems] = useState(alerts);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;

        setCurrentItems(alerts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(alerts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % alerts.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <h1>Alert Page</h1>
            <Items currentItems={currentItems} currentOffset={itemOffset}/>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </div>
    );
};

const Items = ({ currentItems, currentOffset }) =>  {
    return (
        <>
            {currentItems.map((alert) => {
                return (
                    <div key={alert.id} className='item'>
                        <h4>{alert.name}</h4>
                        <h3>{alert.date}</h3>
                        <Link to={`/alert/${alert.id}/${currentOffset}`}>Open</Link>
                    </div>
                );
            })}
        </>
    );
}

export default Alerts;

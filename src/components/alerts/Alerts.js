import React, {useState, useEffect} from 'react';
import { alerts } from '../alerts-mockup';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';


const Alerts = () => {

    const itemsPerPage = 4;
    const pageOffsetInProgress = window.location.href.split("alerts/");
    const rowsOffset = pageOffsetInProgress[1] ? parseInt(pageOffsetInProgress[1]) : 0;
    let pageCountInitial = 0;
    let currentItemsInitial = alerts;
    let itemsOffsetInitial = 0;
    let forcePageInitial = 0;

    const [isInitialOffset, setIsInitialOffset] = useState(0);


    if(isInitialOffset === 0 && rowsOffset > 0) {
        const endOffset = rowsOffset + itemsPerPage;
        itemsOffsetInitial = rowsOffset;
        currentItemsInitial = alerts.slice(itemsOffsetInitial, endOffset);
        pageCountInitial = Math.ceil(alerts.length / itemsPerPage);
        forcePageInitial = rowsOffset/itemsPerPage

    }
    const [forcePage, setForcePage] = useState(forcePageInitial);
    const [pageCount, setPageCount] = useState(pageCountInitial);
    const [currentItems, setCurrentItems] = useState(currentItemsInitial);
    const [itemOffset, setItemOffset] = useState(itemsOffsetInitial);

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
        setIsInitialOffset(0);
    };

    return (
        <div>
            <h1>Alert Page</h1>
            <Items currentItems={currentItems} currentOffset={itemOffset}/>
            <ReactPaginate
                forcePage={forcePage}
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

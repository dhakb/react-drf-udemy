import * as React from "react"

import {useApiClient} from "../utils/api-client";


function Pagination ({ setData, nextPage, prevPage, setNextPage, setPrevPage}){
    const fetchPages = useApiClient()
    const [pageNumber, setPageNumber] = React.useState(1)

    const func = () => {

    }

    const nextPageHandler = () => {
        setPageNumber((prev) => prev + 1);

        fetchPages(nextPage, {method: "GET", pagination: true}).then((res) => {
            const {results, next, previous} = res.data
            setData(results)
            setNextPage(next)
            setPrevPage(previous)
        }).catch(console.log)

    };


    const prevPageHandler = () => {
        if(pageNumber === 1) return;
        setPageNumber((prev) => prev - 1);

        fetchPages(prevPage, {method: "GET", pagination: true}).then((res) => {
            const {results, next, previous} = res.data
            setData(results)
            setNextPage(next)
            setPrevPage(previous)
        }).catch(console.log)

    };


    return (
        <div className="container my-5 d-flex justify-content-center gap-5">
            <button onClick={prevPageHandler} className="bt btn-success" disabled={!prevPage}>
                Prev
            </button>
            <p>{pageNumber}</p>
            <button onClick={nextPageHandler} className="bt btn-success" disabled={!nextPage}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
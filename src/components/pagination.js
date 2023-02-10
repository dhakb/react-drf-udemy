/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from "react"

import {useNextPage, usePreviousPage} from "../queries/book";


function Pagination({setData, nextPage, prevPage, setNextPage, setPrevPage, pageNumber: pageNum}) {
    const [pageNumber, setPageNumber] = React.useState(1)
    const {refetch: fetchNextPage} = useNextPage(nextPage)
    const {refetch: fetchPreviousPage} = usePreviousPage(prevPage)


    const nextPageHandler = () => {
        setPageNumber((prev) => prev + 1);
        fetchNextPage().then(() => console.log("success nextfetching"))
    };


    const prevPageHandler = () => {
        setPageNumber((prev) => prev - 1);
        fetchPreviousPage().then(() => console.log("success prevfetching"))
    };


    return (
        <div css={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            marginTop: "15px"
        }}
        >
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
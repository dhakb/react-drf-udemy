/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'


import {Button} from "./lib";
import {usePageNumber} from "../utils/hooks/hooks";
import PropTypes from "prop-types";


function Pagination({fetchNextPage, fetchPrevPage, nextPage, prevPage}) {
    const pageNumber = usePageNumber(prevPage, nextPage)


    // const nextPageHandler = () => {
    //     fetchNextPage().catch(console.log)
    // };
    //
    // const prevPageHandler = () => {
    //     fetchPrevPage().catch(console.log)
    // };


    return (
        <div css={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            marginTop: "15px",
            "#pageBtn": {
                ":disabled": {
                    border: "1px solid #999999",
                    backgroundColor: "#cccccc",
                    color: "#666666",
                }
            }
        }}
        >
            <Button onClick={fetchPrevPage} id="pageBtn" disabled={!prevPage}>
                Prev
            </Button>
            <p>{pageNumber}</p>
            <Button onClick={fetchNextPage} id="pageBtn" disabled={!nextPage}>
                Next
            </Button>
        </div>
    );
};


Pagination.propTypes = {
    fetchNextPage: PropTypes.func,
    fetchPrevPage: PropTypes.func,
    nextPage: PropTypes.string,
    prevPage: PropTypes.string,
}

export default Pagination;
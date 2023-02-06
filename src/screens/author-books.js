/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'


import * as React from 'react';

import {useApiClient} from "../utils/api-client";
import {Link, useParams} from "react-router-dom";
import Pagination from "../components/pagination";


function AuthorBooksScreen() {
    const [authorBooks, setAuthorBooks] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(1)
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const [limit, setLimit] = React.useState(5)
    const fetchAuthorBook = useApiClient()
    const {authorId} = useParams()



    React.useEffect(() => {

        fetchAuthorBook(`/author/${authorId}/books/?limit=${limit}`, {method: "GET"}).then(res => {
            const {results, next, previous} = res.data
            setAuthorBooks(results)
            setNextPage(next)
            setPrevPage(previous)
        }).catch(console.log)

    }, [authorId, limit])


    const limitHandler = (e) => {
        setLimit(e.target.value)
        console.log(nextPage, prevPage)
    }

    return (
        <div>
            <h1>Boooks by</h1>


            <select value={limit} onChange={limitHandler} >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>


            <ul>
                {authorBooks?.map(book => (
                    <li key={book.id}>
                        <Link to={`/book/${book.id}`}>
                            <h3>{book?.title}</h3>
                        </Link>
                        {
                            book?.tags.map((tag) => (
                                <span key={tag + book.id}>{tag}</span>
                            ))
                        }
                    </li>
                ))}
            </ul>
            <Pagination setData={setAuthorBooks} nextPage={nextPage} prevPage={prevPage} setNextPage={setNextPage}
                        setPrevPage={setPrevPage} limitPerPage={limit}/>
        </div>
    );
}

export {AuthorBooksScreen};
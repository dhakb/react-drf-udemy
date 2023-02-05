/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {Link} from "react-router-dom"
import {useApiClient} from "../utils/api-client";
import {useAuthContext} from "../context/auth-context";
import Pagination from "../components/pagination";

function BooksListScreen() {
    const [booksList, setBookList] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const {data: user} = useAuthContext()
    const fetchBooksList = useApiClient()


    React.useEffect(() => {
        fetchBooksList("book/", {method: "GET"}).then((res) => {
            const {next, previous, results} = res.data
            setBookList(results)
            setNextPage(next)
            setPrevPage(previous)
        })
    }, [user])


    return (
        <div>
            <ul>
                {
                    booksList.map((book) => (
                        <li key={book.id}>
                            <Link to={`/book/${book.id}`} >{book.title}</Link>
                        </li>
                    ))
                }
            </ul>

            <Pagination setData={setBookList} nextPage={nextPage} prevPage={prevPage} setPrevPage={setPrevPage} setNextPage={setNextPage}/>
        </div>
    );
}

export {BooksListScreen};
/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';

import {Link, useParams} from "react-router-dom";
import {useAuthorBooks, useAuthorsNextPage, useAuthorsPrevPage} from "../queries/author";
import Pagination from "../components/pagination";


function AuthorBooksScreen() {
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const [limit, setLimit] = React.useState("5")
    const {authorId} = useParams()

    //React-Query /custom hooks
    const {isLoading, data: books, refetch: refetchAuthorBooks} = useAuthorBooks(authorId, limit)
    const {refetch: fetchPrevPage} = useAuthorsPrevPage({prevPage, queryKey: ["authorBooks", {authorId}]})
    const {refetch: fetchNextPage} = useAuthorsNextPage({nextPage, queryKey: ["authorBooks", {authorId}]})
    // const {refetch: fetchPage} = useAuthorsPage({nextPage, queryKey: ["authorBooks", {authorId}]})


    React.useEffect(() => {
        setNextPage(books?.next)
        setPrevPage(books?.previous)
    }, [books])


    React.useEffect(() => {
        refetchAuthorBooks().catch(console.log)
    }, [limit])


    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Boooks by</h1>

            <select value={limit} onChange={(e) => setLimit(e.target.value)} >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>

            <ul>
                {books.results?.map(book => (
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
            <Pagination  nextPage={nextPage} prevPage={prevPage} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage}/>
        </div>
    );
}

export {AuthorBooksScreen};
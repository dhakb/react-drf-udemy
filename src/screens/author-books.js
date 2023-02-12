/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';

import {useParams} from "react-router-dom";
import {FullPageSpinner} from "../components/lib";
import {useAuthorBooks, useAuthorsNextPage, useAuthorsPrevPage} from "../queries/author";
import Pagination from "../components/pagination";
import AuthorBookItem from "../components/authorbook-item";


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
        return <FullPageSpinner/>
    }

    return (
        <div>
            <h1>Boooks by</h1>
            <label htmlFor="limit" css={{marginRight: "8px"}}>Show per page</label>
            <select value={limit} onChange={(e) => setLimit(e.target.value)} css={{
                width: "100px",
            }} id="limit">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>

            <ul css={{
                marginTop: "20px",
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateRows: 'repeat(auto-fill, minmax(0px, 1fr))',
                gridGap: '1em',
            }}>
                {books.results?.map(book => (
                    <li key={book.id}>
                        <AuthorBookItem book={book}/>
                    </li>
                ))}
            </ul>
            <Pagination  nextPage={nextPage} prevPage={prevPage} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage}/>
        </div>
    );
}

export {AuthorBooksScreen};
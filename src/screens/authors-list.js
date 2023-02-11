/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {Link} from "react-router-dom"

import {useAuthorsNextPage, useAuthorsPrevPage} from "../queries/author";
import {useAuthorsList} from "../queries/author";

import Pagination from "../components/pagination";

function AuthorsListScreen() {
    const [prevPage, setPrevPage] = React.useState(null)
    const [nextPage, setNextPage] = React.useState(null)

    //React-Query /custom hooks
    const {isLoading, data: authors} = useAuthorsList()
    const {refetch: fetchPrevPage} = useAuthorsPrevPage({prevPage, queryKey: "authors"})
    const {refetch: fetchNextPage} = useAuthorsNextPage({nextPage, queryKey: "authors"})


    React.useEffect(() => {
            setNextPage(authors?.next)
            setPrevPage(authors?.previous)
    }, [authors])


    if(isLoading) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <ul>
                {
                    authors.results.map((author) => (
                        <Link to={`/author/${author.id}`} key={author.id}>
                            <li key={author.id}>{author.first_name}, {author.last_name}</li>
                        </Link>
                    ))
                }
            </ul>
            <Pagination fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} nextPage={nextPage} prevPage={prevPage}/>
        </div>
    );
}

export {AuthorsListScreen};
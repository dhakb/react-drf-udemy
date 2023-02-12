/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';

import {useAuthorsList, useAuthorsNextPage, useAuthorsPrevPage} from "../queries/author";

import Pagination from "../components/pagination";
import AuthorItem from "../components/author-item";


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


    if (isLoading) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <ul  css={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
                gridGap: '1em',
            }}>
                {
                    authors.results.map((author) => (
                        <li key={author.id}>
                            <AuthorItem author={author}/>
                        </li>
                    ))
                }
            </ul>
            <Pagination fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} nextPage={nextPage}
                        prevPage={prevPage}/>
        </div>
    );
}

export {AuthorsListScreen};
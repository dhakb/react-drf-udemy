/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {useBooks, useBooksNextPage, useBooksPrevPage, useTags} from "../queries/book";

import Pagination from "../components/pagination";
import BookItem from "../components/book-item";
import Select from "react-select";
import {BookListUL} from "../components/lib";


function BooksListScreen() {
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const [selectedTags, setSelectedTags] = React.useState([])

    //React-Query /custom hooks
    const {isLoading, data: books, refetch: refetchBooksList} = useBooks(selectedTags)
    const {refetch: fetchNextPage} = useBooksNextPage(nextPage)
    const {refetch: fetchPreviousPage} = useBooksPrevPage(prevPage)
    const {data: tags} = useTags()

    React.useEffect(() => {
        setNextPage(books?.next)
        setPrevPage(books?.previous)
    }, [books])


    React.useEffect(() => {
        refetchBooksList().catch(console.log)
    }, [selectedTags])


    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div css={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>

                <Select placeholder="Filter by genre" onChange={setSelectedTags}
                        options={tags} value={selectedTags} isMulti/>

                <BookListUL>
                    {
                        books.results.map((book) => (
                            <li key={book.id} >
                                <BookItem book={book}/>
                            </li>
                        ))
                    }
                </BookListUL>
            </div>

            <Pagination fetchNextPage={fetchNextPage} fetchPrevPage={fetchPreviousPage} nextPage={nextPage}
                        prevPage={prevPage}/>
        </div>
    );
}

export {BooksListScreen};
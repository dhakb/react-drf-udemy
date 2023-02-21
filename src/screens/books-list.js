/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {useBooks, useTags} from "../queries/book";
import {BookListUL, FullPageSpinner, Spinner} from "../components/lib";
import {usePageNumber, useScrollFetch} from "../utils/hooks/hooks";
import {useApiClient} from "../utils/hooks/useApiClient";
import BookItem from "../components/book-item";
import Select from "react-select";


function BooksListScreen() {
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const [selectedTags, setSelectedTags] = React.useState([])
    const pageNum = usePageNumber(prevPage, nextPage)

    //React-Query /custom hooks
    const {isLoading, data: books, refetch: refetchBooksList} = useBooks(selectedTags, pageNum)
    const {data: tags} = useTags()


    //
    const [booksList, setBooksList] = React.useState(books?.results)
    const [isScrollFetching, setIsScrollFetching] = useScrollFetch(fetchNextPage)
    const fetchPageNext = useApiClient()


    function fetchNextPage() {
        nextPage && fetchPageNext(nextPage, {method: "GET", pagination: true}).then(res => {
            setBooksList((prev) => [...prev, ...res.data.results])
            setNextPage(res.data.next)
            setIsScrollFetching(false)
        })
        if (!nextPage) {
            setIsScrollFetching(false)
        }
    }


    React.useEffect(() => {
        setBooksList(books?.results)
    }, [books])

    //


    React.useEffect(() => {
        setNextPage(books?.next)
        setPrevPage(books?.previous)
    }, [books])


    React.useEffect(() => {
        refetchBooksList().catch(console.log)
    }, [selectedTags])


    if (isLoading) {
        return <FullPageSpinner styles={{position: ""}}/>
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
                        booksList?.map((book) => (
                            <li key={book.id}>
                                <BookItem book={book}/>
                            </li>
                        ))
                    }
                    {
                        isScrollFetching && <Spinner/>
                    }
                </BookListUL>
            </div>
        </div>
    );
}

export {BooksListScreen};
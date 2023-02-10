/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {Link} from "react-router-dom"
import {useBooks, useTags} from "../queries/book";

import Pagination from "../components/pagination";
import BookItem from "../components/book-item";
import Select from "react-select";



function BooksListScreen() {
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const [selectedTags, setSelectedTags] = React.useState([])


    const {isLoading, data: books} = useBooks()
    const {data: tags} = useTags()

    React.useEffect(() => {
        setNextPage(books?.next)
        setPrevPage(books?.previous)
    }, [books])


    const selectTagsHandler = (tag) => {
        setSelectedTags(tag)
    }

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div css={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>

                <Select placeholder="Filter by genre" onChange={selectTagsHandler}
                        options={tags} value={selectedTags} isMulti/>

                {
                    books.results.map((book) => (
                        <Link to={`/book/${book.id}`} css={{textDecoration: "none"}} key={book.id}>
                            <BookItem book={book}/>
                        </Link>
                    ))
                }
            </div>

            <Pagination nextPage={nextPage} prevPage={prevPage} setPrevPage={setPrevPage}
                        setNextPage={setNextPage}/>

            {/*<Pagination setData={setBookList} nextPage={nextPage} prevPage={prevPage} setPrevPage={setPrevPage}*/}
            {/*            setNextPage={setNextPage}/>*/}
        </div>
    );
}

export {BooksListScreen};
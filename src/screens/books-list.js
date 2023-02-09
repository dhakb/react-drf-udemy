/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {Link} from "react-router-dom"
import {useApiClient} from "../utils/api-client";
import {useAuthContext} from "../context/auth-context";
import Pagination from "../components/pagination";
import BookItem from "../components/book-item";
import Select from "react-select";

function BooksListScreen() {
    const [booksList, setBookList] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const [selectedTags, setSelectedTags] = React.useState([])
    const [tags, setTags] = React.useState([])
    const {data: user} = useAuthContext()
    const fetchBooksList = useApiClient()
    const fetchTags = useApiClient()


    React.useEffect(() => {
        let endpoint = selectedTags ? `book/?tags=${selectedTags.reduce((acc, curr) => [...acc, curr.value], []).join()}` : "book/"
        fetchBooksList(endpoint, {method: "GET"}).then((res) => {
            const {next, previous, results} = res.data
            setBookList(results)
            setNextPage(next)
            setPrevPage(previous)
        })
    }, [user, selectedTags])


    React.useEffect(() => {
        fetchTags("book/tag/", {method: "GET"})
            .then(res => {
                setTags(res.data.map(tag => ({label: tag.name, value: tag.id})))
            })
            .catch(console.log)
    }, [user])


    const selectTagsHandler = (tag) => {
        setSelectedTags(tag)
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
                    booksList.map((book) => (
                        <Link to={`/book/${book.id}`} css={{textDecoration: "none"}} key={book.id}>
                            <BookItem book={book}/>
                        </Link>
                    ))
                }
            </div>

            <Pagination setData={setBookList} nextPage={nextPage} prevPage={prevPage} setPrevPage={setPrevPage}
                        setNextPage={setNextPage}/>
        </div>
    );
}

export {BooksListScreen};
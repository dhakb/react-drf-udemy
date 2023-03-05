import * as React from 'react';
import {useParams} from "react-router-dom";
import {FullPageSpinner} from "../components/lib";
import {useAuthorBooks} from "../queries/author";
import Pagination from "../components/pagination";
import AuthorBookItem from "../components/authorbook-item";


function AuthorBooksScreen() {
    const {authorId} = useParams()
    const [limit, setLimit] = React.useState("10")
    const [requestPath, setRequestPath] = React.useState(`/author/${authorId}/books/?limit=${limit}`)
    const {data: books, isLoading} = useAuthorBooks({requestPath, authorId})
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)


    React.useEffect(() => {
        setRequestPath(`/author/${authorId}/books/?limit=${limit}`)
    }, [limit])

    React.useEffect(() => {
        setNextPage(books?.next)
        setPrevPage(books?.previous)
    }, [books])


    const fetchNextPage = () => {
        setRequestPath(books.next)
    }

    const fetchPrevPage = () => {
        setRequestPath(books.previous)
    }


    if(isLoading) {
        return <FullPageSpinner/>
    }

    return (
        <div>
            <h1>Books by</h1>
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
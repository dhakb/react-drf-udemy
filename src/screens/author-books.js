import * as React from 'react';

import {useApiClient} from "../utils/api-client";
import {Link, useParams} from "react-router-dom";
import Pagination from "../components/pagination";

function AuthorBooksScreen() {
    const [authorBooks, setAuthorBooks] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const [limit, setLimit] = React.useState(4)
    const fetchAuthorBook = useApiClient()
    const {authorId} = useParams()

    const [totalBookCount, setTotalBookCount] = React.useState(null)

    React.useEffect(() => {

        fetchAuthorBook(`/author/${authorId}/books/?limit=${limit}`, {method: "GET"}).then(res => {
            const {results, next, previous, count} = res.data
            setAuthorBooks(results)
            setNextPage(next)
            setPrevPage(previous)
            setTotalBookCount(count)
        }).catch(console.log)

    }, [authorId, limit])

    const calcPageNumber = (setPageNum) => {
        setPageNum(Math.floor(totalBookCount/limit))
    }

    function limitChangeHandler(e)  {
        setLimit(e.target.value)
        


        // setPageNumber(Math.floor(totalBookCount/limit))
    }

    return (
        <div>
            <h1>Boooks by</h1>

            <label>
                {limit}
                <input type="range" name="books qty" min="4" max="20" step="1"
                       value={limit}
                       onChange={limitChangeHandler}/>
                {totalBookCount}
            </label>
            <ul>
                {authorBooks?.map(book => (
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
            <Pagination setData={setAuthorBooks} nextPage={nextPage} prevPage={prevPage} setNextPage={setNextPage}
                        setPrevPage={setPrevPage} limitPerPage={limit} />
        </div>
    );
}

export {AuthorBooksScreen};
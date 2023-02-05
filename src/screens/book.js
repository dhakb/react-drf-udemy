/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {useParams, useNavigate} from "react-router";
import {useApiClient} from "../utils/api-client";


function BookScreen(props) {
    const [book, setBook] = React.useState("")
    const {bookId} = useParams()
    const fetchBook = useApiClient()
    const navigate = useNavigate()

    React.useEffect(() => {
        fetchBook(`book/${bookId}`, {method: "GET"}).then(res => {
            setBook(res.data)
        }).catch((e) => {
            console.log(e)
        })
    }, [bookId])


    return (
        <div>
            <h1>{book?.title}</h1>
            <p><b>Author:</b> {book.author?.full_name}</p>
            <p>
                <b>Genres:</b>
                {

                    book.tags?.map((tag) => (
                        <span key={tag}> {tag}</span>
                    ))
                }
            </p>
            <p><b>Description:</b>{book?.description}</p>
            <p><b>Language:</b> {book?.language}</p>
            <p><b>Publication date:</b> {book?.published_at}</p>
            {
                // book?.note && <Note note={book.note}/>
                book.note && <p>hey</p>
            }
            {
                book?.event_id && (
                    <button onClick={() => navigate(`../event/${book.event_id}`)}>
                        event
                    </button>
                )
            }
        </div>
    );
}

export {BookScreen};
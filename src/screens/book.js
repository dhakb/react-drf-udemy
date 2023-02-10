/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {useNavigate, useParams} from "react-router";


import {useApiClient} from "../utils/api-client";
import {FullPageSpinner} from "../components/lib";
import Note from "../components/note";

import {useBook} from "../queries/book";
import {useNoteCreate, useNoteUpdate, useNoteDelete} from "../queries/note";
import {useEventCreate} from "../queries/event";



function BookScreen() {
    const forceUpdate = React.useState({})[1].bind(null, {})
    const [toggleEventForm, setToggleEventForm] = React.useState(false)
    const {bookId} = useParams()
    // const createEvent = useApiClient()
    const navigate = useNavigate()
    const noteRef = React.useRef()

    //React-Query /custom hooks
    const {data: book, isLoading} = useBook(bookId)
    const createNote = useNoteCreate(bookId)
    const updateNote = useNoteUpdate(book)
    const deleteNote = useNoteDelete(book)
    const createEvent = useEventCreate(bookId)



    const createNoteHandler = async () => {
        if (noteRef.current.value.length === 0) {
            alert("not possible to create note without note")
            return;
        }

        if (createNote.isLoading) return <div>Loading....</div>
        createNote.mutate({note: noteRef.current.value})
    }


    const updateNoteHandler = (note) => {
        if(updateNote.isLoading) return <div>Loading...</div>
        updateNote.mutate({note})
    }


    const deleteNoteHandler = () => {
        console.log("loading:", deleteNote.isLoading, "/nSuccess:", deleteNote.isSuccess)
        deleteNote.mutate()
    }


    const onEventSubmit = (e) => {
        e.preventDefault()
        const {title, date, city, invitation, ageRegulation} = e.target.elements
        const data = {
            book_id: book.id,
            title: title.value,
            event_date: date.value,
            city: city.value,
            by_invitation:invitation.checked,
            age_regulation: ageRegulation.checked
        }

        createEvent.mutate({...data})
    }


    if (isLoading) {
        return <FullPageSpinner/>
    }


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

            <div css={{
                display: "flex",
                gap: "10px",
                button: {
                    height: "30px"
                }
            }}>
                <h4>Note:</h4>
                {
                    book?.note ? <Note note={book.note} forceUpdate={forceUpdate}
                                       deleteNote={deleteNoteHandler}
                                       updateNote={updateNoteHandler}/> :
                        <div>
                            <input type="text" ref={noteRef}/>
                            <button onClick={createNoteHandler}>create note</button>
                        </div>
                }
            </div>

            {
                book?.event_id ? (
                    <button onClick={() => navigate(`../event/${book.event_id}`)}>
                        open event
                    </button>
                ) : (
                    <div>
                        {
                            !toggleEventForm ?
                                <button onClick={() => setToggleEventForm(true)}>create event</button> : (
                                    <form onSubmit={onEventSubmit} css={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                        width: "200px"
                                    }}>
                                        <input type="text" placeholder="event title" id="title"/>
                                        <input type="date" placeholder="" id="date"/>
                                        <input type="city" placeholder="enter city" id="city"/>
                                        <label>
                                            by invitation
                                            <input type="checkbox" id="invitation"/>
                                        </label>
                                        <label>
                                            age regulation
                                            <input type="checkbox" id="ageRegulation"/>
                                        </label>
                                        <button>save</button>
                                        <button onClick={() => setToggleEventForm(false)}>cancel</button>
                                    </form>
                                )
                        }
                    </div>
                )
            }
        </div>
    );
}

export {BookScreen};


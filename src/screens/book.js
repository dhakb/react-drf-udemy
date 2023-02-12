/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {useNavigate, useParams} from "react-router";

import {Button, FullPageSpinner} from "../components/lib";
import Note from "../components/note";
import EventForm from "../components/event-form";
import {Modal, ModalContents, ModalOpenButton, ModalDismissButton} from "../components/modal";
import {StatusButton} from "../components/status-buttons";
import {FaCheckCircle} from "react-icons/fa";
import {BiMessageAdd} from "react-icons/bi"

import {useBook} from "../queries/book";
import {useNoteCreate, useNoteDelete, useNoteUpdate} from "../queries/note";
import {useEventCreate} from "../queries/event";
import * as colors from "../styles/colors";
import "@reach/dialog/styles.css";


function BookScreen() {
    const forceUpdate = React.useState({})[1].bind(null, {})
    const noteRef = React.useRef()
    const navigate = useNavigate()
    const {bookId} = useParams()

    //React-Query /custom hooks
    const {data: book, isLoading} = useBook(bookId)
    const createEvent = useEventCreate(bookId)
    const createNote = useNoteCreate(bookId)
    const updateNote = useNoteUpdate(book)
    const deleteNote = useNoteDelete(book)

    const createNoteHandler = async () => {
        if (noteRef.current.value.length === 0) {
            alert("not possible to create note without note")
            return;
        }

        if (createNote.isLoading) return <div>Loading....</div>
        createNote.mutate({note: noteRef.current.value})
    }


    const updateNoteHandler = (note) => {
        if (updateNote.isLoading) return <div>Loading...</div>
        updateNote.mutate({note})
    }


    const deleteNoteHandler = () => {
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
            by_invitation: invitation.checked,
            age_regulation: ageRegulation.checked
        }

        createEvent.mutate({...data})

    }


    if (isLoading) {
        return <FullPageSpinner/>
    }


    return (
        <div css={{
            position: "relative",
            border: `1px solid ${colors.gray20}`,
            color: colors.text,
            minHeight: 600,
            padding: '1.25em',
            borderRadius: '3px',
            h1: {
                fontSize: "40px"
            },
            h3: {
                fontStyle: "italic",
                fontSize: "22px"
            }
        }}>
            <h1>{book?.title}</h1>
            <h3>by {book.author?.full_name}</h3>
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
                    <Button onClick={() => navigate(`../event/${book.event_id}`)}>
                        open event
                    </Button>
                ) : (

                    <Modal>
                        <ModalOpenButton>
                            <Button variant="success">Add event</Button>
                        </ModalOpenButton>
                        <ModalContents title="Add Event" offCancel={true} aria-label="event form">
                            <EventForm onSubmit={onEventSubmit} isLoading={createEvent.isLoading} />
                        </ModalContents>
                    </Modal>
                )
            }
            <div
                css={{
                    position: 'absolute',
                    right: -20,
                    top: 20,
                    color: colors.gray80,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            >
                {
                    book.note ?
                        <StatusButton icon={<FaCheckCircle css={{width: "25px", height: "25px"}}/>} size={"45px"}/> :
                        <StatusButton icon={<BiMessageAdd css={{width: "20px", height: "20px", color: "gray"}}/>} size={"40px"} label="add note"/>
                }
            </div>
        </div>
    );
}

export {BookScreen};


/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import {useNavigate, useParams} from "react-router";

import {ModalContents, ModalOpenButton, ModalProvider} from "../components/modal";
import {Button, FullPageSpinner, Spinner, TextArea} from "../components/lib";
import {StatusButton} from "../components/status-buttons";
import EventForm from "../components/event-form";
import {FaCheckCircle} from "react-icons/fa";

import {useNoteCreate, useNoteDelete, useNoteUpdate} from "../queries/note";
import {useEventCreate} from "../queries/event";
import {debounce} from "../utils/utils"
import * as colors from "../styles/colors";
import {useBook} from "../queries/book";
import "@reach/dialog/styles.css";



function BookScreen() {
    const navigate = useNavigate()
    const {bookId} = useParams()

    //React-Query /custom hooks
    const {data: book, isLoading} = useBook(bookId)
    const createEvent = useEventCreate(bookId)
    const createNote = useNoteCreate({endpoint: `book/${bookId}`, queryKey: ["book", {bookId}]})
    const updateNote = useNoteUpdate({noteId: book?.note?.id, queryKey: ["book", {bookId}]})
    const deleteNote = useNoteDelete({noteId: book?.note?.id, queryKey: ["book", {bookId}]})


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


    const noteChangeHandler = (e) => {
        if (!book?.note?.id) {
            createNote.mutate({note: e.target.value})
        } else if (e.target.value.length < 1) {
            deleteNote.mutate()
        } else if(e.target.value && book?.note?.id) {
            updateNote.mutate({note: e.target.value})
        }
    }


    if (isLoading) return <FullPageSpinner/>


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
            <h3>by {book?.author?.full_name}</h3>
            <p>
                <b>Genres:</b>
                {

                    book?.tags?.map((tag) => (
                        <span key={tag}> {tag}</span>
                    ))
                }
            </p>
            <p><b>Description:</b>{book?.description}</p>
            <p><b>Language:</b> {book?.language}</p>
            <p><b>Publication date:</b> {book?.published_at}</p>

            <div css={{display: "flex", alignItems: "center", gap: "6px"}}>
                <h4>note</h4>
                {updateNote.isLoading && <Spinner css={{marginBottom: "7px"}}/>}
            </div>
            <TextArea css={{resize: "none"}} rows="10" cols="40" onChange={debounce(noteChangeHandler)} defaultValue={book?.note?.note_text}/>
            {
                book?.event_id ? (
                    <Button onClick={() => navigate(`../event/${book.event_id}`)}>
                        open event
                    </Button>
                ) : (
                    <ModalProvider>
                        <ModalOpenButton>
                            <Button variant="success">Add event</Button>
                        </ModalOpenButton>
                        <ModalContents title="Add Event" offCancel={true} aria-label="event form">
                            <EventForm onSubmit={onEventSubmit} isLoading={createEvent.isLoading}/>
                        </ModalContents>
                    </ModalProvider>
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
                    book?.note &&
                        <StatusButton icon={<FaCheckCircle css={{width: "25px", height: "25px"}}/>} size={"45px"}/>
                }
            </div>
        </div>
    );
}

export {BookScreen};


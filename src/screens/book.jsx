import React from "react";
import {useNavigate, useParams} from "react-router";
import {ModalContents, ModalOpenButton, ModalProvider} from "../components/modal";
import {useNoteCreate, useNoteDelete, useNoteUpdate} from "../queries/note";
import {Button, FullPageSpinner, Spinner, TextArea} from "../components/lib";
import {debounce, setNotification} from "../utils/utils"
import {StatusButton} from "../components/status-buttons";
import {useEventCreate} from "../queries/event";
import {FaCheckCircle} from "react-icons/fa";
import {useBook} from "../queries/book";
import * as colors from "../styles/colors";
import EventForm from "../components/event-form";
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


    const onEventSubmit = ({title, date, city, invitation, ageRegulation}) => {
        const data = {
            book_id: book.id,
            title: title,
            event_date: date,
            city: city,
            by_invitation: invitation,
            age_regulation: ageRegulation
        }

        createEvent.mutate({...data})
    }

    React.useEffect(() => {
        setNotification({data: createEvent?.error?.response?.data})
    }, [createEvent.isError])


    React.useEffect(() => {
        setNotification({data: createEvent.isSuccess && ["Event has been created!"], success: true})
    }, [createEvent.isSuccess])



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
            <br/>
            {
                book?.event_id ? (
                    <Button onClick={() => navigate(`../event/${book.event_id}`)} variant="success">
                        open event
                    </Button>
                ) : (
                    <ModalProvider>
                        <ModalOpenButton>
                            <Button variant="brown">create event</Button>
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


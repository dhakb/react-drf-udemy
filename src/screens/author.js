/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from "react"
import {useNavigate, useParams} from "react-router-dom";
import {useAuthor} from "../queries/author";
import {FullPageSpinner, Button} from "../components/lib";
import * as colors from "../styles/colors";
import {StatusButton} from "../components/status-buttons";
import {FaCheckCircle} from "react-icons/fa";
import {BiMessageAdd} from "react-icons/bi";
import Note from "../components/note";
import {useNoteCreate, useNoteDelete, useNoteUpdate} from "../queries/note";


function AuthorScreen() {
    const noteRef = React.useRef()
    const {authorId} = useParams()
    const navigate = useNavigate()
    const {isLoading, data: author} = useAuthor(authorId)
    const createNote = useNoteCreate({endpoint: `author/${authorId}`, queryKey: ["author", {authorId}]})
    const updateNote = useNoteUpdate({noteId: author?.note?.id, queryKey: ["author", {authorId}]})
    const deleteNote = useNoteDelete({noteId: author?.note?.id, queryKey: ["author", {authorId}]})

    const deleteNoteHandler = () => {
        deleteNote.mutate()
    }

    const updateNoteHandler = (note) => {
        if (updateNote.isLoading) return <div>Loading...</div>
        updateNote.mutate({note})
    }

    const createNoteHandler = () => {
        createNote.mutate({note: noteRef.current.value})
    }


    if (isLoading) {
        return <FullPageSpinner/>
    }

    return (
        <div css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            border: `1px solid ${colors.gray20}`,
            color: colors.text,
            minHeight: 400,
            padding: '1.25em',
            borderRadius: '3px',
            h1: {
                fontSize: "40px"
            },
            h3: {
                fontStyle: "italic",
                fontSize: "22px"
            },
            "div > div": {
                fontStyle: "italic"
            },
            "div: nth-of-type(2)": {
                fontSize: "15px",
                p: {
                    margin: 0,
                },
                Button: {
                    marginTop: "3px"
                }
            }
        }}>
            <div>
                <h1>{author.first_name}, {author.last_name}</h1>
                <div>Birth date: {new Date(author.date_of_birth).toDateString().slice(4)}</div>
            </div>

            <div css={{
                display: "flex",
                gap: "10px",
                button: {
                    height: "30px"
                }
            }}>
                <h4>Note:</h4>
                {
                    author?.note ? <Note note={author.note}
                                       deleteNote={deleteNoteHandler}
                                       updateNote={updateNoteHandler}/> :
                        <div>
                            <input type="text" ref={noteRef}/>
                            <button onClick={createNoteHandler}>create note</button>
                        </div>
                }
            </div>


            <div>
                <p>Total books: {author.total_books}</p>
                <Button onClick={() => navigate("./books")}>List author's books</Button>
            </div>
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
                    author.note ?
                        <StatusButton icon={<FaCheckCircle css={{width: "25px", height: "25px"}}/>} size={"45px"}/> :
                        <StatusButton icon={<BiMessageAdd css={{width: "20px", height: "20px", color: "gray"}}/>} size={"40px"} label="add note"/>
                }
            </div>
        </div>
    );
}


export {AuthorScreen};
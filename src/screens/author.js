/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import {Link, useParams} from "react-router-dom";

import {useNoteCreate, useNoteDelete, useNoteUpdate} from "../queries/note";
import {FullPageSpinner, Spinner, TextArea} from "../components/lib";
import {StatusButton} from "../components/status-buttons";
import {FaCheckCircle} from "react-icons/fa";
import {useAuthor} from "../queries/author";
import {RiArrowDropDownLine} from "react-icons/ri"
import {debounce} from "../utils/utils"
import * as colors from "../styles/colors";


function AuthorScreen() {
    const {authorId} = useParams()
    const {isLoading, data: author} = useAuthor(authorId)

    //React-Query /custom hooks
    const updateNote = useNoteUpdate({noteId: author?.note?.id, queryKey: ["author", {authorId}]})
    const deleteNote = useNoteDelete({noteId: author?.note?.id, queryKey: ["author", {authorId}]})
    const createNote = useNoteCreate({endpoint: `author/${authorId}`, queryKey: ["author", {authorId}]})


    const noteChangeHandler = (e) => {
        if (!author?.note?.id) {
            createNote.mutate({note: e.target.value})
        } else if (e.target.value.length < 1) {
            deleteNote.mutate()
        } else {
            updateNote.mutate({note: e.target.value})
        }
    }


    if (isLoading) return <FullPageSpinner/>

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
            "div: nth-of-type(1)": {
                fontStyle: "italic",
                marginBottom: "3px"
            },
        }}>

            <h1>{author.first_name}, {author.last_name}</h1>
            <div>Birth date: {new Date(author.date_of_birth).toDateString().slice(4)}</div>
            <div>Total books: {author.total_books}</div>

            <Link to={"./books"} style={{
                display: "flex",
                marginTop: "8px",
                padding: "0",
                width: "190px",
                color: "black",
            }}>show books
                <RiArrowDropDownLine css={{width: "25px", height: "25px"}}/>
            </Link>

            <div css={{display: "flex", alignItems: "center", gap: "6px", marginTop: "30px"}}>
                <h4>note</h4>
                {
                    updateNote.isLoading && <Spinner css={{marginBottom: "5px"}}/>
                }
            </div>
            <TextArea onChange={debounce(noteChangeHandler)} defaultValue={author?.note?.note_text} cols="40"
                      rows="10"/>
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
                    author.note &&
                    <StatusButton icon={<FaCheckCircle css={{width: "25px", height: "25px"}}/>} size={"45px"}/>
                }
            </div>
        </div>
    );
}


export {AuthorScreen};
/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'


import {Link, useParams} from "react-router-dom";
import {useAuthor} from "../queries/author";
import {FullPageSpinner, Spinner, TextArea} from "../components/lib";
import * as colors from "../styles/colors";
import {StatusButton} from "../components/status-buttons";
import {FaCheckCircle} from "react-icons/fa";
import {useNoteCreate, useNoteDelete, useNoteUpdate} from "../queries/note";

function AuthorScreen() {
    const {authorId} = useParams()
    const {isLoading, data: author} = useAuthor(authorId)
    const createNote = useNoteCreate({endpoint: `author/${authorId}`, queryKey: ["author", {authorId}]})
    const updateNote = useNoteUpdate({noteId: author?.note?.id, queryKey: ["author", {authorId}]})
    const deleteNote = useNoteDelete({noteId: author?.note?.id, queryKey: ["author", {authorId}]})


    const debounce = (callback, timeout = 1000) => {
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback.apply(this, args)
            }, timeout)
        }
    }


    const noteChangeHandler = (e) => {
        if (!author?.note?.id) {
            createNote.mutate({note: e.target.value})
        } else if (e.target.value.length < 1) {
            deleteNote.mutate()
        } else {
            updateNote.mutate({note: e.target.value})
        }
    }

    const debouncedNoteHandler = debounce(noteChangeHandler)


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
            "div: nth-of-type(1)": {
                fontStyle: "italic",
                marginBottom: "3px"
            },
        }}>

            <h1>{author.first_name}, {author.last_name}</h1>
            <div>Birth date: {new Date(author.date_of_birth).toDateString().slice(4)}</div>
            <div>Total books: {author.total_books}</div>
            <Link to={"./books"} style={{margin: "0", padding: "0" , width: "90px"}}>show books</Link>


            <div css={{display: "flex", alignItems: "center", gap: "6px", marginTop: "30px"}}>
                <h4>note</h4>
                {
                    updateNote.isLoading && <Spinner css={{marginBottom: "5px"}}/>
                }
            </div>
            <TextArea onChange={debouncedNoteHandler} defaultValue={author?.note?.note_text} cols="40" rows="10" />
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
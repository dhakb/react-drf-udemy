/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {CircleButton, Input, Spinner} from "./lib";
import {FaEdit, FaRegSave, FaRegTrashAlt} from "react-icons/fa";
import {GiCancel} from "react-icons/gi"


function Note({note, deleteNote, updateNote, isUpdating, isDeleting}) {
    const [isEditMode, setIsEditMode] = React.useState(false)
    const noteRef = React.useRef()

    const updateNoteHandler = () => {
        updateNote(noteRef.current.value)
        noteRef.current.value = ""
    }

    React.useEffect(() => {
        if (!isUpdating) {
            setIsEditMode(false)
        }
    }, [isUpdating])

    return (
        <div css={{
            display: "flex",
            gap: "10px",
            button: {
                width: "70px",
                height: "30px"
            }
        }}>
            <p>{note.note_text}</p>
            <CircleButton onClick={deleteNote} css={{
                backgroundColor: "#e1d2d2",
                width: "10px",
                height: "10px"
            }}>{isDeleting ? <Spinner/> : <FaRegTrashAlt/>}</CircleButton>
            {!isEditMode && <CircleButton onClick={() => setIsEditMode(true)} css={{
                backgroundColor: "#adb9cc",
                width: "10px",
                height: "10px"
            }}><FaEdit/></CircleButton>}

            {
                isEditMode && <div><Input type="text" ref={noteRef} defaultValue={note.note_text}/>
                    <div css={{display: "flex", gap: "4px", justifyContent: "flex-end", marginTop: "5px"}}>
                        <CircleButton onClick={updateNoteHandler} css={{backgroundColor: "#8ea4bc"}}>{isUpdating ?
                            <Spinner/> : <FaRegSave/>}</CircleButton>
                        <CircleButton onClick={() => setIsEditMode(false)}
                                      css={{backgroundColor: "#d0dbec"}}><GiCancel/></CircleButton>
                    </div>
                </div>
            }

        </div>
    );
}

export default Note;
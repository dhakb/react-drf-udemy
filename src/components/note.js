/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {CircleButton, Input} from "./lib";
import {FaEdit, FaRegSave, FaRegTrashAlt} from "react-icons/fa";
import {GiCancel} from "react-icons/gi"


function Note({note, deleteNote, updateNote}) {
    const [isEditMode, setIsEditMode] = React.useState(false)
    const noteRef = React.useRef()


    const updateNoteHandler = () => {
        updateNote(noteRef.current.value)
        noteRef.current.value = ""
        setIsEditMode(false)
    }

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
                backgroundColor: "#c83f44",
                width: "10px",
                height: "10px"
            }}><FaRegTrashAlt/></CircleButton>
            {!isEditMode && <CircleButton onClick={() => setIsEditMode(true)} css={{
                backgroundColor: "#427eca",
                width: "10px",
                height: "10px"
            }}><FaEdit/></CircleButton>}

            {
                isEditMode && <div><Input type="text" ref={noteRef} defaultValue={note.note_text}/>
                    <div css={{display: "flex", gap: "4px", justifyContent: "flex-end", marginTop: "5px"}}>
                        <CircleButton onClick={updateNoteHandler} css={{backgroundColor: "#a3b3a3"}}><FaRegSave/>save</CircleButton>
                        <CircleButton onClick={() => setIsEditMode(false)}
                                      css={{backgroundColor: "#9ba4bc"}}><GiCancel/>cancel</CircleButton>
                    </div>
                </div>
            }

        </div>
    );
}

export default Note;
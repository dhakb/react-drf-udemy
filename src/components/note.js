/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';


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

            <button onClick={deleteNote}>del</button>
            {!isEditMode && <button onClick={() => setIsEditMode(true)}>edit</button>}

            {
                isEditMode && <div><input type="text" ref={noteRef} defaultValue = {note.note_text}/>
                    <button onClick={updateNoteHandler}>update</button>
                    <button onClick={() => setIsEditMode(false)}> cancel</button>
                </div>
            }

        </div>
    );
}

export default Note;
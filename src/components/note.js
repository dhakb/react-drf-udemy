import React from 'react';

function Note({note}) {
    return (
        <div>
            <p>{note.text}</p>
        </div>
    );
}

export default Note;
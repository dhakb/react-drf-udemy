/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as  React from 'react';

function BookItem({book}) {
    const {title, author: {full_name}, tags, is_noted} = book

    return (
        <div css={{
            border: "1px solid black",
            padding: "5px",
        }}>
            <div css={{
                display: "flex",
                gap: "20px"
            }}>
                <h3>{title}</h3>
                {
                    is_noted && <span>&#10003;</span>
                }
            </div>

            <p>{full_name}</p>
            {
                tags.map((tag) => (
                    <span key={book.id + tag}>{tag}</span>
                ))
            }

        </div>
    );
}

export default BookItem;
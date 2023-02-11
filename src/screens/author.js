import * as React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useAuthor} from "../queries/author";



function AuthorScreen() {
    const {authorId} = useParams()
    const navigate = useNavigate()
    const {isLoading, data: author} = useAuthor(authorId)


    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{author.first_name}, {author.last_name}</h1>
            <p><b>Date of birth:</b> {author.date_of_birth}</p>
            <p><b>Books count written by:</b> {author.total_books}</p>
            <p><b>Note:</b> {author.note}</p>

            <button onClick={() => navigate("./books")}>Books by author</button>

        </div>
    );
}

export {AuthorScreen};
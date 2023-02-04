import * as React from 'react';
import {useApiClient} from "../utils/api-client";
import {useParams, useNavigate} from "react-router-dom";



function AuthorScreen() {
    const [author, setAuthor] = React.useState("")
    const fetchAuthor = useApiClient()
    const {authorId} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        fetchAuthor(`author/${authorId}`, {method: "GET"}).then(res => {
            setAuthor(res.data)
        }).catch(console.log)
    }, [authorId])

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
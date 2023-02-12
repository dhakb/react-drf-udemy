/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import {useNavigate, useParams} from "react-router-dom";
import {useAuthor} from "../queries/author";
import {FullPageSpinner, Button} from "../components/lib";
import * as colors from "../styles/colors";


function AuthorScreen() {
    const {authorId} = useParams()
    const navigate = useNavigate()
    const {isLoading, data: author} = useAuthor(authorId)


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

            <div>
                <p>Total books: {author.total_books}</p>
                <Button onClick={() => navigate("./books")}>List author's books</Button>
            </div>
        </div>
    );
}


export {AuthorScreen};
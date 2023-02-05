/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {Link} from "react-router-dom"

import {useAuthContext} from "../context/auth-context";
import {useApiClient} from "../utils/api-client";
import Pagination from "../components/pagination";

function AuthorsListScreen() {
    const {data: user} = useAuthContext()
    const [nextPage, setNextPage] = React.useState(null)
    const [prevPage, setPrevPage] = React.useState(null)
    const [authorsList, setAuthorsList] = React.useState([])
    const fetchAuthorsList = useApiClient()


    React.useEffect(() => {
        fetchAuthorsList("author/", {method: "GET"}).then(res => {
            const {next, previous, results} = res.data
            setAuthorsList(results)
            setNextPage(next)
            setPrevPage(previous)
        }).catch((e) => {
            console.log(e)
        })
    }, [user])



    return (
        <div>
            <ul>
                {
                    authorsList.map((author) => (
                        <Link to={`/author/${author.id}`} key={author.id}>
                            <li key={author.id}>{author.first_name}, {author.last_name}</li>
                        </Link>
                    ))
                }
            </ul>

            <Pagination setData={setAuthorsList} setPrevPage={setPrevPage} setNextPage={setNextPage} nextPage={nextPage} prevPage={prevPage}/>
        </div>
    );
}

export {AuthorsListScreen};
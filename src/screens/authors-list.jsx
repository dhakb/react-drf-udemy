import * as React from 'react';
import {useAuthorsList} from "../queries/author";
import {FullPageSpinner} from "../components/lib";

import Pagination from "../components/pagination";
import AuthorItem from "../components/author-item";



function AuthorsListScreen() {
    const [requestPath, setRequestPath] = React.useState("author/")
    const [prevPage, setPrevPage] = React.useState(null)
    const [nextPage, setNextPage] = React.useState(null)
    const  {data: authors, isLoading} = useAuthorsList({requestPath})

    React.useEffect(() => {
        setNextPage(authors?.next)
        setPrevPage(authors?.previous)
    }, [authors])


    const fetchNextPage = () => {
        setRequestPath(authors.next)
    }

    const fetchPrevPage = () => {
        setRequestPath(authors.previous)
    }


    if(isLoading) {
       return  <FullPageSpinner/>
    }

    return (
        <div>
            <ul  css={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
                gridGap: '1em',
                minHeight: "50vh",
            }}>
                {
                    authors?.results?.map((author) => (
                        <li key={author.id}>
                            <AuthorItem author={author}/>
                        </li>
                    ))
                }
            </ul>
            {
                authors.next !== authors.previous &&  <Pagination fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} nextPage={nextPage}
                                                                  prevPage={prevPage}/>
            }
        </div>
    );
}

export {AuthorsListScreen};
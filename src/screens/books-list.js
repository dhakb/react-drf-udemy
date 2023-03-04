/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';
import {useBooksInfinite, useTags} from "../queries/book";
import {BookListUL, Spinner} from "../components/lib";
import {useScrollFetch} from "../utils/hooks/hooks";
import BookItem from "../components/book-item";
import Select from "react-select";



function BooksListScreen() {
    const [selectedTags, setSelectedTags] = React.useState([])

    //React-Query /custom hooks
    const {data: tags} = useTags()
    const {isFetchingNextPage, data, fetchNextPage, hasNextPage} = useBooksInfinite({selectedTags})

    //Scroll-Fetch /custom hook
    const [setIsScrollFetching] = useScrollFetch({fetchNextPage, hasNextPage})


    React.useEffect(() => {
        if (!isFetchingNextPage) {
            setIsScrollFetching(false)
        }
    }, [isFetchingNextPage])


    return (
        <div>
            <div css={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>

                <Select styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: state.isFocused && '1px solid #7d6963',
                        boxShadow: 'none',
                        cursor: 'pointer',
                        ':hover': {
                            border: '1px solid #7d6963'
                        }
                    }),
                    multiValueRemove: (baseStyles, state) => ({
                        ...baseStyles,
                        "&:hover": {
                            backgroundColor: "#806c66",
                            color: "white"
                        },
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused && "rgba(125,105,99,0.18)",
                        "&:hover": {
                            backgroundColor: "rgba(125,105,99,0.18)",
                            cursor: "pointer"
                        },
                    }),

                }} placeholder="Filter by genre" onChange={setSelectedTags}
                        options={tags} value={selectedTags} isMulti/>

                <BookListUL>
                    {
                        data?.pages?.map((page, index) => (
                            <React.Fragment key={index}>
                                {
                                    page.results.map(book => (
                                        <li key={book.id}>
                                            <BookItem book={book}/>
                                        </li>
                                    ))
                                }
                            </React.Fragment>
                        ))
                    }
                </BookListUL>
                {
                    isFetchingNextPage && <Spinner css={{height: "50px", width: "50px", margin: "auto"}}/>
                }
            </div>
        </div>
    );
}

export {BooksListScreen};
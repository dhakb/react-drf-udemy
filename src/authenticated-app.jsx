import * as React from 'react';
import {useAuthContext} from "./context/auth-context";
import {Route, Routes, useMatch, Link} from "react-router-dom";

import * as colors from "./styles/colors"
import * as bp from "./styles/break-points"

import {Button} from "./components/lib";
import {BookScreen} from "./screens/book";
import {NotFoundScreen} from "./screens/not-found";
import {BooksListScreen} from "./screens/books-list";
import {AuthorsListScreen} from "./screens/authors-list";
import {AuthorBooksScreen} from "./screens/author-books";
import {EventScreen} from "./screens/event";
import {AuthorScreen} from "./screens/author"



function AuthenticatedApp() {
    const {logout} = useAuthContext()

    return (
        <React.Fragment>
            <div css={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                top: '10px',
                right: '10px',
            }}>
                <Button variant="secondary" onClick={logout} css={{marginRight: "20px"}}>Logout</Button>
            </div>

            <div
                css={{
                    margin: '0 auto',
                    padding: '4em 2em',
                    maxWidth: '840px',
                    width: '100%',
                    display: 'grid',
                    gridGap: '1em',
                    gridTemplateColumns: '1fr 3fr',
                    [bp.small]: {
                        gridTemplateColumns: '1fr',
                        gridTemplateRows: 'auto',
                        width: '100%',
                    },
                }}
            >
                <div css={{position: 'relative'}}>
                    <Nav/>
                </div>
                <main css={{width: '100%'}}>
                    <AppRoutes/>
                </main>
            </div>
        </React.Fragment>
    );
}

function NavLink(props) {
    const match = useMatch(props.to)
    return (
        <Link
            css={[
                {
                    display: 'block',
                    padding: '8px 15px 8px 10px',
                    margin: '5px 0',
                    width: '100%',
                    height: '100%',
                    color: colors.text,
                    borderRadius: '2px',
                    borderLeft: '5px solid transparent',
                    ':hover,:focus': {
                        color: colors.indigo,
                        textDecoration: 'none',
                        background: colors.gray10,
                    },
                },
                match
                    ? {
                        borderLeft: `5px solid ${colors.brown}`,
                        background: colors.gray10,
                        ':hover,:focus': {
                            background: colors.gray10,
                        },
                    }
                    : null,
            ]}
            {...props}
        />
    )
}

function Nav(params) {
    return (
        <nav
            css={{
                position: 'sticky',
                top: '4px',
                padding: '1em 1.5em',
                border: `1px solid ${colors.gray10}`,
                borderRadius: '3px',
                [bp.small]: {
                    position: 'static',
                    top: 'auto',
                },
            }}
        >
            <ul
                css={{
                    listStyle: 'none',
                    padding: '0',
                    li: {
                        "#navLink": {listStyle: 'none', textDecoration: 'none'},
                    }
                }}
            >
                <li>
                    <NavLink to="/books" id="navLink">Books</NavLink>
                </li>
                <li>
                    <NavLink to="/authors" id="navLink">Authors</NavLink>
                </li>
            </ul>
        </nav>
    )
}


function AppRoutes() {
    return (
        <Routes>
            <Route path="/books" element={<BooksListScreen />} />
            <Route path="/authors" element={<AuthorsListScreen />} />
            <Route path="/book/:bookId" element={<BookScreen />} />
            <Route path="/author/:authorId" element={<AuthorScreen/>}/>
            <Route path="/author/:authorId/books" element={<AuthorBooksScreen/>}/>
            <Route path="/event/:eventId" element={<EventScreen/>}/>
            <Route path="*" element={<NotFoundScreen />} />
        </Routes>
    )
}




export default AuthenticatedApp;
import {Link} from "react-router-dom";
import * as colors from "../styles/colors"
import {StatusButton} from "./status-buttons";
import {FaCheckCircle} from "react-icons/fa";


function AuthorItem({author}) {
    return (
        <div
            css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: "10px",
                position: 'relative',
            }}
        >
            <Link to={`/author/${author.id}`} key={author.id} css={{
                flexGrow: 2,
                border: `1px solid ${colors.gray20}`,
                color: colors.text,
                padding: '1.25em',
                borderRadius: '3px',
                textDecoration: 'none',
                ':hover,:focus': {
                    boxShadow: '10px 10px 15px -5px rgba(0,0,0,.08)',
                    color: 'inherit',
                },
                h1: {
                    fontSize: "34px",
                }
            }}>
                <div css={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: "20px",

                    "div > div": {
                        fontStyle: "italic"
                    },
                    "div:nth-of-type(2)": {
                        fontSize: "12px"
                    }
                }}>
                    <div>
                        <h1>{author.first_name}, {author.last_name}</h1>
                        <div>Birth date: {new Date(author.date_of_birth).toDateString().slice(4)}</div>
                    </div>
                    <div id="totalBooks">Total books: {author.total_books}</div>
                </div>
            </Link>
            <div
                css={{
                    position: 'absolute',
                    right: -10,
                    color: colors.gray80,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            >
                {/*{*/}
                {/*    author.is_noted && <StatusButton icon={<FaCheckCircle />} size={"30px"}/>*/}
                {/*}*/}
            </div>
        </div>
    )
}


export default AuthorItem
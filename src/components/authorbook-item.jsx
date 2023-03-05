import {Link} from "react-router-dom";
import * as colors from "../styles/colors";


function AuthorBookItem({book}) {


    return (
        <div css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: "10px",
            position: 'relative',
        }}>
            <Link to={`/book/${book.id}`} css={{
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
                },
                span: {
                    fontSize: "14px",
                    marginRight: "6px",
                }
            }}>
                <h3>{book?.title}</h3>
                {
                    book?.tags.map((tag) => (
                        <span key={tag + book.id}>{tag}</span>
                    ))
                }
            </Link>
        </div>
    )
}


export default AuthorBookItem
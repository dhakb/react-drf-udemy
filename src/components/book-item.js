/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as colors from "../styles/colors";
import {StatusButton} from "./status-buttons";
import {Link} from "react-router-dom";
import {FaCheckCircle} from "react-icons/fa";



function BookItem({book}) {
    const {title, author: {full_name}, tags, is_noted} = book

    return (
        <div css={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: 'flex-end',
            padding: "5px",
        }}>
            <Link to={`/book/${book.id}`} css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 300,
                flexGrow: 1,
                border: `1px solid ${colors.gray20}`,
                color: colors.text,
                padding: '1.25em',
                borderRadius: '3px',
                textDecoration: 'none',
                ':hover,:focus': {
                    boxShadow: '10px 10px 15px -5px rgba(0,0,0,.08)',
                    color: 'inherit',
                },
            }}>
                <div css={{
                    color: "black",
                }}>
                    <h3 css={{fontSize: "18px", marginBottom: "15px"}}>{title}</h3>
                    <h6  css={{fontSize: "14px", fontWeight: 400}}><i>by {full_name}</i></h6>
                </div>

                <div css={{
                    display: "flex",
                    gap: "5px",
                    flexDirection: "column"
                }}>
                    {
                        tags.map(tag => (
                            <span css={{fontSize: "14px"}} key={tag+book.id}>{tag}</span>
                        ))
                    }
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
                {
                    is_noted && <StatusButton icon={<FaCheckCircle />} size={"30px"}/>
                }
            </div>
        </div>
    );
}

export default BookItem;
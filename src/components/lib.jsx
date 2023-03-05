import {keyframes} from '@emotion/react'

import {Link as RouterLink} from 'react-router-dom'
import styled from '@emotion/styled'
import {FaSpinner} from "react-icons/fa";
import * as colors from "../styles/colors"
import {Dialog as ReachDialog} from '@reach/dialog'
import * as bp from "../styles/break-points"


const spin = keyframes({
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'},
})


const FormGroup = styled.div({
    display: "flex",
    flexDirection: "column",
})


const inputStyles = {
    border: '1px solid #f1f1f4',
    background: '#f1f2f7',
    padding: '8px 12px',
}
const Input = styled.input({borderRadius: '3px'}, inputStyles)
const TextArea = styled.textarea()


const buttonVariants = {
    primary: {
        background: colors.indigo,
        color: colors.base,
    },
    secondary: {
        background: colors.gray20,
        color: colors.text,
    },
    success: {
        background: colors.green,
        color: colors.base
    },
    brown: {
        background: colors.brown,
        color: colors.base
    }
}
const Button = styled.button(
    {
        padding: '10px 15px',
        border: '0',
        lineHeight: '1',
        borderRadius: '3px',
    },
    ({variant = 'primary'}) => buttonVariants[variant],
)

const CircleButton = styled.button({
    borderRadius: '30px',
    padding: '0',
    width: '30px',
    height: '30px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.base,
    color: colors.text,
    border: `1px solid ${colors.gray10}`,
    cursor: 'pointer',
})


const Spinner = styled(FaSpinner)({
    animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
    'aria-label': 'loading',
}


const Dialog = styled(ReachDialog)({
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
    width: "450px",
    backgroundColor: "white",
    maxWidth: '450px',
    borderRadius: '3px',
    paddingBottom: '3.5em',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    [bp.small]: {
        width: '100%',
        margin: '10vh auto',
    },
})

function FullPageSpinner({styles}) {
    return (
        <div
            css={{
                ...(styles && {...styles}),
                fontSize: '4em',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Spinner/>
        </div>
    )
}

function FullPageErrorFallback({error}) {
    return (
        <div
            role="alert"
            css={{
                color: colors.danger,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <p>Something went wrong! Try refreshing the app.</p>
            <pre>{error.message}</pre>
        </div>
    )
}

const errorMessageVariants = {
    stacked: {display: 'block'},
    inline: {display: 'inline-block'},
}

function ErrorMessage({error, variant = 'stacked', ...props}) {
    return (
        <div
            role="alert"
            css={[{color: colors.danger}, errorMessageVariants[variant]]}
            {...props}
        >
            <span>There was an error: </span>
            <pre
                css={[
                    {whiteSpace: 'break-spaces', margin: '0', marginBottom: -5},
                    errorMessageVariants[variant],
                ]}
            >
        {error.response.data.detail}
      </pre>
        </div>
    )
}

const Link = styled(RouterLink)({
    color: colors.indigo,
    ':hover': {
        color: colors.indigoDarken10,
        textDecoration: 'underline',
    },
})

const BookListUL = styled.ul({
    listStyle: 'none',
    padding: '0',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '1em',
})

export {
    FormGroup,
    Input,
    Button,
    Spinner,
    Dialog,
    CircleButton,
    FullPageSpinner,
    FullPageErrorFallback,
    ErrorMessage,
    Link,
    BookListUL,
    TextArea
}
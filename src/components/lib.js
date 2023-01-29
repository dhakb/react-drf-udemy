/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import styled from '@emotion/styled/macro'
import {keyframes} from "@emotion/core";
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


const buttonVariants = {
    primary: {
        background: colors.indigo,
        color: colors.base,
    },
    secondary: {
        background: colors.gray,
        color: colors.text,
    },
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
    width: '40px',
    height: '40px',
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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
    width: "450px",
    backgroundColor: "white",
    // maxWidth: '450px',
    borderRadius: '3px',
    paddingBottom: '3.5em',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    // margin: '20vh auto',
    [bp.small]: {
        width: '100%',
        margin: '10vh auto',
    },
})

export {FormGroup, Input, Button, Spinner, Dialog, CircleButton}
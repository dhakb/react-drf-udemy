/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from "react"
import {Button, FormGroup, Input, Spinner, ErrorMessage} from "./components/lib";
import {Modal, ModalContents, ModalOpenButton} from "./components/modal";
import {useAsync} from "./utils/hooks";
import {useAuthContext} from "./context/auth-context";
import Logo from "./components/logo"

const LoginForm = ({onSubmit, submitButton}) => {
    const {isError, isLoading, error, run} = useAsync()
    const handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = e.target.elements
        console.log(onSubmit)
        run(onSubmit({username: username.value, password: password.value}))

    }


    return (
        <form onSubmit={handleSubmit}
              css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  '> div': {
                      margin: '10px auto',
                      width: '100%',
                      maxWidth: '300px',
                  },
              }}
        >
            <FormGroup>
                <label htmlFor="username">Username</label>
                <Input id="username"/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="password">Password</label>
                <Input id="password"/>
            </FormGroup>

            <div>
                {
                    React.cloneElement(submitButton, {type: "submit"}, ...(Array.isArray(submitButton.props.children) ? submitButton.props.children : [submitButton.props.children]), isLoading &&
                        <Spinner css={{marginLeft: 5}}/>)
                }
            </div>
            {isError && <ErrorMessage error={error}/>}
        </form>
    )
}

const RegisterForm = ({onSubmit, submitButton}) => {
    const {isLoading, isError, error, isSuccess, run} = useAsync()

    const handleSubmit = (e) => {
        e.preventDefault()

        const {firstname, lastname, email, username, password, passwordConfirm} = e.target.elements

        run(onSubmit({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            username: username.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        }))
    }

    return (
        <form onSubmit={handleSubmit}
              css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  '> div': {
                      margin: '10px auto',
                      width: '100%',
                      maxWidth: '300px',
                      '> label': {
                          textTransform: "capitalize"
                      }
                  },
              }}
        >
            <FormGroup>
                <label htmlFor="firstname">firstname</label>
                <Input id="firstname"/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="lastname">lastname</label>
                <Input id="lastname"/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="username">username</label>
                <Input id="username"/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="email">email</label>
                <Input id="email"/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="password">Password</label>
                <Input id="password"/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Input id="passwordConfirm"/>
            </FormGroup>

            <div>
                {
                    React.cloneElement(submitButton, {type: "submit"}, ...(Array.isArray(submitButton.props.children) ? submitButton.props.children : [submitButton.props.children]), isLoading &&
                        <Spinner css={{marginLeft: 5}}/>)
                }
            </div>
            {isError && <ErrorMessage error={error}/>}
        </form>
    )
}


function UnauthenticatedApp() {
    const {login, register} = useAuthContext()
    return (
        <div
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <Logo width="80" height="80"/>
            <h1>BookShelf</h1>
            <div css={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridGap: '0.75rem',
            }}>
                <Modal>
                    <ModalOpenButton>
                        <Button variant="primary">Login</Button>
                    </ModalOpenButton>
                    <ModalContents aria-label="login form" title="Login">
                        <LoginForm onSubmit={login} submitButton={<Button variant="primary">Login</Button>}/>
                    </ModalContents>
                </Modal>

                <Modal>
                    <ModalOpenButton>
                        <Button variant="secondary">Register</Button>
                    </ModalOpenButton>
                    <ModalContents aria-label="Registration form" title="Register">
                        <RegisterForm onSubmit={register} submitButton={<Button variant="primary">Register</Button>}/>
                    </ModalContents>
                </Modal>
            </div>
        </div>
    )
}

export default UnauthenticatedApp
/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from "react"
import {Button, FormGroup, Input, Spinner} from "./components/lib";
import {ModalContents, ModalOpenButton, ModalProvider} from "./components/modal";
import {setNotification} from "./utils/setNotification";
import {useAuthContext} from "./context/auth-context";
import {useForm} from "react-hook-form";
import {useAsync} from "./utils/useAsync";
import Logo from "./components/logo"
import "@reach/dialog/styles.css";


const LoginForm = ({onSubmit, submitButton}) => {
    const {isError, isLoading, error, run} = useAsync()
    const {register, handleSubmit, formState: {errors}} = useForm()

    React.useEffect(() => {
        isError && setNotification({data: error.response.data})
    }, [isError])

    const submitForm = ({username, password}) => {
        run(onSubmit({username, password}))
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}
              css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  '> div': {
                      margin: '10px auto',
                      width: '100%',
                      maxWidth: '300px',
                  },
                  "#input-error-message": {
                      color: "#8e0202",
                  }
              }}
        >
            <FormGroup>
                <label htmlFor="username">Username</label>
                <Input name="username" type="text" {...register("username", {required: true})}/>
                {
                    errors.username && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>
            <FormGroup>
                <label htmlFor="password">Password</label>
                <Input name="password" type="password" {...register("password", {required: true})}/>
                {
                    errors.password && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>

            <div>
                {
                    React.cloneElement(submitButton, {type: "submit"},
                        ...(Array.isArray(submitButton.props.children) ? submitButton.props.children : [submitButton.props.children]),
                        isLoading && <Spinner css={{marginLeft: 10, height: "12px"}}/>)
                }
            </div>
        </form>
    )
}

const RegisterForm = ({onSubmit, submitButton}) => {
    const {isLoading, isError, error, run} = useAsync()
    console.log("__server ERROR", error)
    const {register, handleSubmit, formState: {errors}} = useForm()


    React.useEffect(() => {
        isError && setNotification({data: error.response.data})
    }, [isError])


    const submitForm = ({firstname, lastname, email, username, password, passwordConfirm}) => {
        run(onSubmit({
            firstname,
            lastname,
            email,
            username,
            password,
            passwordConfirm
        }))
    }


    return (
        <form onSubmit={handleSubmit(submitForm)}
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
                  "#input-error-message": {
                      color: "#8e0202",
                  }
              }}
        >
            <FormGroup>
                <label htmlFor="firstname">firstname</label>
                <Input name="firstname" {...register("firstname", {required: true})}/>
                {
                    errors.firstname && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>
            <FormGroup>
                <label htmlFor="lastname">lastname</label>
                <Input name="lastname" {...register("lastname", {required: true})}/>
                {
                    errors.lastname && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>
            <FormGroup>
                <label htmlFor="username">username</label>
                <Input name="username" {...register("username", {required: true})}/>
                {
                    errors.username && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>
            <FormGroup>
                <label htmlFor="email">email</label>
                <Input name="email" {...register("email", {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })}/>
                {
                    errors.email && <span
                        id="input-error-message">{errors.email.type === "required" ? "This field may not be blank!" : "Enter a valid Email address!"}</span>
                }
            </FormGroup>
            <FormGroup>
                <label htmlFor="password">Password</label>
                <Input name="password" type="password" {...register("password", {required: true, minLength: 8})}/>
                {
                    errors.password && <span
                        id="input-error-message">{errors.password.type === "required" ? "This field may not be blank!" : "Ensure this field has at least 8 characters!"}</span>
                }
            </FormGroup>
            <FormGroup>
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Input name="passwordConfirm" type="password" {...register("passwordConfirm", {required: true})}/>
                {
                    errors.passwordConfirm && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>

            <div>
                {
                    React.cloneElement(submitButton, {type: "submit"}, ...(Array.isArray(submitButton.props.children) ? submitButton.props.children : [submitButton.props.children]), isLoading &&
                        <Spinner css={{marginLeft: 5}}/>)
                }
            </div>
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
                <ModalProvider>
                    <ModalOpenButton>
                        <Button variant="primary">Login</Button>
                    </ModalOpenButton>
                    <ModalContents aria-label="login form" title="Login">
                        <LoginForm onSubmit={login} submitButton={<Button variant="primary">Login</Button>}/>
                    </ModalContents>
                </ModalProvider>

                <ModalProvider>
                    <ModalOpenButton>
                        <Button variant="secondary">Register</Button>
                    </ModalOpenButton>
                    <ModalContents aria-label="Registration form" title="Register">
                        <RegisterForm onSubmit={register} submitButton={<Button variant="primary">Register</Button>}/>
                    </ModalContents>
                </ModalProvider>
            </div>
        </div>
    )
}

export default UnauthenticatedApp
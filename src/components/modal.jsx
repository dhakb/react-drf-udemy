import * as React from "react"
import VisuallyHidden from '@reach/visually-hidden'
import {CircleButton, Dialog} from "./lib";

const callAll =
    (...fns) =>
        (...args) =>
            fns.forEach(fn => fn && fn(...args))

const ModalContext = React.createContext([false, (bool) => {}])

function ModalProvider(props) {
    const [isOpen, setIsOpen] = React.useState(false)
    return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props}/>
}

function ModalDismissButton({children: child}) {
    const [, setIsOpen] = React.useContext(ModalContext)

    return React.cloneElement(child, {
        onClick: callAll(() => setIsOpen(false), child.props.onClick)
    })
}

function ModalOpenButton({children: child}) {
    const [, setIsOpen] = React.useContext(ModalContext)

    return React.cloneElement(child, {
        onClick: callAll(() => setIsOpen(true), child.props.onClick)
    })
}

function ModalContentBase(props) {
    const [isOpen, setIsOpen] = React.useContext(ModalContext)

    return <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
}


function ModalContents({title, children, offCancel, ...props}) {
    return (
            <ModalContentBase {...props}>
                <div css={{display: 'flex', justifyContent: 'flex-end'}}>
                    {
                        !offCancel && (
                            <ModalDismissButton>
                                <CircleButton>
                                    <VisuallyHidden>Close</VisuallyHidden>
                                    <span aria-hidden>×</span>
                                </CircleButton>
                            </ModalDismissButton>
                        )
                    }
                </div>
                <h3 css={{textAlign: 'center', fontSize: '2em', marginTop: "20px"}}>{title}</h3>
                {children}
            </ModalContentBase>
    )
}


export {ModalProvider, ModalDismissButton, ModalOpenButton, ModalContents, ModalContext}
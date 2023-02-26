/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import React from "react"
import {useNavigate, useParams} from "react-router";
import {useEventDelete, useEventFetch, useEventUpdate} from "../queries/event";
import {CircleButton, FullPageSpinner} from "../components/lib";
import {FaEdit, FaRegTrashAlt} from "react-icons/fa";
import {ModalContents, ModalOpenButton, ModalProvider} from "../components/modal";
import {setNotification} from "../utils/utils";
// import {ModalContext} from "../components/modal";
import EventForm from "../components/event-form";
import Confirmation from "../components/confirmation";
import "@reach/dialog/styles.css";


function EventScreen() {
    // const [isOpen, setIsOpen] = React.useContext(ModalContext)
    const navigate = useNavigate()
    const {eventId} = useParams()

    //React-Query /custom hooks
    const {isLoading: isEventLoading, data: event} = useEventFetch(eventId)
    const updateEvent = useEventUpdate(eventId)
    const deleteEvent = useEventDelete(eventId, event?.book?.id)


    const eventDeleteHandler = () => {
        deleteEvent.mutate()
        navigate(-1)
    }


    const eventUpdateHandler = ({title, date, city, invitation, ageRegulation}) => {
        const data = {
            title: title,
            event_date: date,
            city: city,
            by_invitation: invitation,
            age_regulation: ageRegulation
        }
        updateEvent.mutate({...data})
    }

    React.useEffect(() => {
        setNotification({data: updateEvent?.error?.response?.data})
    }, [updateEvent.isError])

    React.useEffect(() => {
        setNotification({data: updateEvent.isSuccess && ["Event has been updated!"], success: true})
    }, [updateEvent.isSuccess])


    // React.useEffect(() => {
    //     setIsOpen(false)
    // }, [updateEvent.isSuccess])


    if (updateEvent.isLoading) return <FullPageSpinner/>
    if (isEventLoading) return <FullPageSpinner/>

    return (
        <div>
            <hr/>
            <h1>{event?.title}</h1>
            <hr/>
            <p><b>Related to book: </b> {event?.book?.title}</p>
            <p><b>Event date:</b> {new Date(event?.event_date).toDateString().slice(4)}</p>
            <p><b>Location:</b> {event?.city}</p>
            <p>
                By invitation: {`${event.terms?.by_invitation}` ? "Yes" : "No"}
            </p>
            <p>
                Age regulation: {`${event.terms?.age_regulation}` ? "Yes" : "No"}
            </p>

            <div>
                {
                    event?.allow_update && (
                        <div css={{
                            display: "flex",
                            gap: "10px"
                        }}>
                            <ModalProvider>
                                <ModalOpenButton>
                                    <CircleButton css={{
                                        display: "flex",
                                        gap: "5px",
                                        backgroundColor: "#e1d2d2",
                                        width: "100px",
                                        height: "30px"
                                    }}><FaRegTrashAlt/>Delete</CircleButton>
                                </ModalOpenButton>
                                <ModalContents title="Are you sure?" offCancel={true} aria-label="event form">
                                    <Confirmation deleteHandler={eventDeleteHandler}/>
                                </ModalContents>
                            </ModalProvider>

                            <ModalProvider>
                                <ModalOpenButton>
                                    <CircleButton css={{
                                        display: "flex",
                                        gap: "5px",
                                        backgroundColor: "#adb9cc",
                                        width: "100px",
                                    }}><FaEdit/>Edit</CircleButton>
                                </ModalOpenButton>
                                <ModalContents title="Edit Event" offCancel={true} aria-label="event form">
                                    <EventForm onSubmit={eventUpdateHandler} isLoading={updateEvent.isLoading}
                                               event={event}/>
                                </ModalContents>
                            </ModalProvider>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export {EventScreen};
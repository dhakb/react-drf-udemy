/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'


import {useNavigate, useParams} from "react-router";
import {useEventDelete, useEventFetch, useEventUpdate} from "../queries/event";
import {CircleButton, FullPageSpinner} from "../components/lib";
import EventForm from "../components/event-form";
import Confirmation from "../components/confirmation";
import {FaEdit, FaRegTrashAlt} from "react-icons/fa";
import {BsShieldCheck, BsShieldSlash} from "react-icons/bs"
import {Modal, ModalContents, ModalOpenButton} from "../components/modal";
import "@reach/dialog/styles.css";


function EventScreen() {
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


    const eventUpdateHandler = (e) => {
        e.preventDefault()
        const {title, date, city, invitation, ageRegulation} = e.target.elements
        const data = {
            title: title.value,
            event_date: date.value,
            city: city.value,
            by_invitation: invitation.checked,
            age_regulation: ageRegulation.checked
        }

        updateEvent.mutate({...data})
    }

    if (isEventLoading) return <FullPageSpinner/>

    return (
        <div>
            <hr/>
            <h1>{event?.title}</h1>
            <hr/>
            <p><b>book</b> {event?.book?.title}</p>
            <p><b>Date:</b> {event?.event_date}</p>
            <p><b>Location:</b> {event?.city}</p>
            <p>
                By invitation {event.terms?.by_invitation ?
                <BsShieldCheck css={{color: "green", width: "25px", height: "25px"}}/> :
                <BsShieldSlash css={{color: "red", width: "25px", height: "25px"}}/>}
            </p>
            <p>
                Age regulation {event.terms?.age_regulation ?
                <BsShieldCheck css={{color: "green", width: "25px", height: "25px"}}/> :
                <BsShieldSlash css={{color: "red", width: "25px", height: "25px"}}/>}
            </p>

            <div>
                {
                    event?.allow_update && (
                        <div css={{
                            display: "flex",
                            gap: "10px"
                        }}>
                            <Modal>
                                <ModalOpenButton>
                                    <CircleButton css={{
                                        display: "flex",
                                        gap: "5px",
                                        backgroundColor: "#ce4646",
                                        width: "120px",
                                        height: "30px"
                                    }}><FaRegTrashAlt/>Delete</CircleButton>
                                </ModalOpenButton>
                                <ModalContents title="Are you sure?" offCancel={true} aria-label="event form">
                                        <Confirmation deleteHandler={eventDeleteHandler}/>
                                </ModalContents>
                            </Modal>
                        </div>
                    )
                }

                <Modal>
                    <ModalOpenButton>
                        <CircleButton css={{
                            display: "flex",
                            gap: "5px",
                            backgroundColor: "#427eca",
                            width: "120px",
                        }}><FaEdit/>Edit</CircleButton>
                    </ModalOpenButton>
                    <ModalContents title="Edit Event" offCancel={true} aria-label="event form">
                        <EventForm onSubmit={eventUpdateHandler} isLoading={updateEvent.isLoading} event={event}/>
                    </ModalContents>
                </Modal>
            </div>
        </div>
    );
}

export {EventScreen};
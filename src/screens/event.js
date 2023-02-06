/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from 'react';

import {useNavigate, useParams} from "react-router";
import {useApiClient} from "../utils/api-client";


function EventScreen() {
    const [event, setEvent] = React.useState({})
    const [isEditMode, setIsEditMode] = React.useState(false)
    const fetchEvent = useApiClient()
    const deleteEvent = useApiClient()
    const updateEvent = useApiClient()
    const navigate = useNavigate()
    const {eventId} = useParams()

    React.useEffect(() => {
        fetchEvent(`event/${eventId}`, {method: "GET"}).then(res => {
            setEvent(res.data)
        }).catch(console.log)
    }, [eventId])



    const eventDeleteHandler = () => {
        deleteEvent(`event/${event.id}/`, {method: "DELETE"})
            .then(res => {
                navigate(`/book/${event.book_id}`)
            })
            .catch(console.log)
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

        updateEvent(`event/${event.id}/`, {method: "PATCH", body: data})
            .then(res => {
                setIsEditMode(false)
            })
            .catch(console.log)
    }



    return (
        <div>
            <hr/>
            <h1>{event?.title}</h1>
            <hr/>
            <p><b>book</b> {event?.book?.title}</p>
            <p><b>Date:</b> {event?.event_date}</p>
            <p><b>Location:</b> {event?.city}</p>
            <p>
                {event.terms?.by_invitation ? "By invitation" : "No invitation needed"}
            </p>
            <p>
                {event.terms?.age_regulation ? "Age regulated" : "No age regulation"}
            </p>

            <div>
                {
                    event?.allow_update && (
                        <div css={{
                            display: "flex",
                            gap: "10px"
                        }}>
                            <button onClick={() => setIsEditMode(true)}>edit</button>
                            <button onClick={eventDeleteHandler}>del</button>
                        </div>
                    )
                }

                {
                  isEditMode && (
                        <form onSubmit={eventUpdateHandler} css={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                            width: "200px"
                        }}>
                            <input type="text" placeholder="event title" id="title" defaultValue={event.title}/>
                            <input type="date" placeholder="" id="date" defaultValue={event.event_date}/>
                            <input type="city" placeholder="enter city" id="city" defaultValue={event.city}/>
                            <label>
                                by invitation
                                <input type="checkbox" id="invitation" defaultChecked={event.terms.age_regulation}/>
                            </label>
                            <label>
                                age regulation
                                <input type="checkbox" id="ageRegulation" defaultChecked={event.terms.age_regulation}/>
                            </label>
                            <button>save</button>
                            <button onClick={() => setIsEditMode(false)}>cancel</button>
                        </form>
                    )
                }
            </div>
        </div>
    );
}

export {EventScreen};
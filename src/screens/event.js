import * as React from 'react';

import {useParams} from "react-router";
import {useApiClient} from "../utils/api-client";


function EventScreen() {
    const [event, setEvent] = React.useState("")
    const fetchEvent = useApiClient()
    const {eventId} = useParams()

    React.useEffect(() => {
        fetchEvent(`event/${eventId}`, {method: "GET"}).then(res => {
            setEvent(res.data)
        }).catch(console.log)
    }, [eventId])


    return (
        <div>
            <hr/>
            <h1>{`<<Event>>`}</h1>
            <hr/>
            <p><b>book_id:</b> {event?.book_id}</p>
            <p><b>Date:</b> {event?.event_date}</p>
            <p><b>Location:</b> {event?.city}</p>
            <p>
                {event.terms?.by_invitation ? "By invitation" : "No invitation needed"}
            </p>
            <p>
                {event.terms?.age_regulation ? "Age regulated" : "No age regulation"}
            </p>
        </div>
    );
}

export {EventScreen};
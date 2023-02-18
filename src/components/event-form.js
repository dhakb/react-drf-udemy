/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import {Button, FormGroup, Input, Spinner} from "./lib";
import {ModalDismissButton} from "./modal";


function EventForm({onSubmit, isLoading, event = {}}) {
    return (
        <form onSubmit={onSubmit} css={{
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
        }}>
            <FormGroup>
                <Input type="text" placeholder="Event title" id="title" defaultValue={event.title}/>
            </FormGroup>
            <FormGroup>
                <Input type="date" id="date" defaultValue={event.event_date}/>
            </FormGroup>
            <FormGroup>
                <Input type="text" placeholder="Host city" id="city" defaultValue={event.city}/>
            </FormGroup>
            <FormGroup css={{display: "flex", flexDirection: "row", gap: "5px"}}>
                <Input type="checkbox" id="invitation" defaultChecked={event.terms?.by_invitation}/>
                <label htmlFor="invitation">by invitation</label>
            </FormGroup>
            <FormGroup css={{display: "flex", flexDirection: "row", gap: "5px"}}>
                <Input type="checkbox" id="ageRegulation" defaultChecked={event.terms?.age_regulation}/>
                <label htmlFor="ageRegulation">age regulation</label>
            </FormGroup>
            <div css={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <Button type="submit">{!isLoading ? "save" : <Spinner css={{height: "12px"}}/>}</Button>
                <ModalDismissButton>
                    <Button variant="secondary">cancel</Button>
                </ModalDismissButton>
            </div>
        </form>
    )
}


export default EventForm

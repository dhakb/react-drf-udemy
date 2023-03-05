import {Button, FormGroup, Input, Spinner} from "./lib";
import {ModalDismissButton} from "./modal";
import {useForm} from "react-hook-form";


function EventForm({onSubmit, isLoading, event = {}}) {
    const {handleSubmit, register, formState: {errors}} = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)} css={{
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
        }}>
            <FormGroup>
                <Input type="text" name="title" placeholder="Event title" id="title" defaultValue={event.title} {...register("title", {required: true})}/>
                {
                    errors.title && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>
            <FormGroup>
                <Input type="date" name="date" id="date" defaultValue={event.event_date} {...register("date", {required: true})}/>
                {
                    errors.date && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>
            <FormGroup>
                <Input type="text" name="city" placeholder="Host city" id="city" defaultValue={event.city} {...register("city", {required: true})}/>
                {
                    errors.city && <span id="input-error-message">This field may not be blank!</span>
                }
            </FormGroup>
            <FormGroup css={{display: "flex", flexDirection: "row", gap: "5px"}}>
                <Input type="checkbox" name="invitation" id="invitation" defaultChecked={event.terms?.by_invitation} {...register("invitation")}/>
                <label htmlFor="invitation">by invitation</label>
            </FormGroup>
            <FormGroup css={{display: "flex", flexDirection: "row", gap: "5px"}}>
                <Input type="checkbox" name="ageRegulation" id="ageRegulation" defaultChecked={event.terms?.age_regulation} {...register("ageRegulation")}/>
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

import {useApiClient} from "../utils/hooks/useApiClient";
import {useMutation, useQuery, useQueryClient} from "react-query";

function useEventCreate(bookId) {
    const queryClient = useQueryClient()
    const createEvent = useApiClient()
    return useMutation((data) => createEvent(`event/`, {method: "POST", body: data}), {
        onSuccess: (res) => queryClient.setQueriesData(["book", {bookId}], (oldData) => ({...oldData, event_id: res.data.id})),
    })
}

function useEventFetch(eventId) {
    const fetchEvent = useApiClient()
    return useQuery({
        queryKey: ["event", {eventId}],
        queryFn: () => fetchEvent(`event/${eventId}/`, {method: "GET"}).then(res => res.data)
    })
}

function useEventUpdate(eventId) {
    const queryClient = useQueryClient()
    const updateEvent = useApiClient()
    return useMutation((data) => updateEvent(`event/${eventId}/`, {method: "PATCH", body: data}), {
        onSuccess: (res) => queryClient.setQueriesData(["event", {eventId}], () => ({...res.data}))
    })
}

function useEventDelete(eventId, bookId) {
    const queryClient = useQueryClient()
    const deleteEvent = useApiClient()
    return useMutation(() => deleteEvent(`event/${eventId}/`, {method: "DELETE"}), {
        onSuccess: () => queryClient.setQueriesData(['book', {bookId}], (oldData) => ({...oldData, event_id: null}))
    })
}


export {useEventCreate, useEventFetch, useEventUpdate, useEventDelete}
import {useApiClient} from "../utils/hooks/useApiClient";
import {useMutation, useQuery, useQueryClient} from "react-query";

function useEventCreate(bookId) {
    const queryClient = useQueryClient()
    const createEvent = useApiClient()
    return useMutation((data) => createEvent(`event/`, {method: "POST", body: data}), {
        onSuccess: () => queryClient.invalidateQueries(["book", {bookId}]),
    })
}

function useEventFetch(eventId) {
    const fetchEvent = useApiClient()
    return useQuery({
        queryKey: ["event", {eventId}],
        queryFn: () => {
            console.log("async trigger")
            return fetchEvent(`event/${eventId}`, {method: "GET"}).then(res => res.data)
        }
    })
}

function useEventUpdate(eventId) {
    const queryClient = useQueryClient()
    const updateEvent = useApiClient()
    return useMutation((data) => updateEvent(`event/${eventId}/`, {method: "PATCH", body: data}), {
        onSuccess: () => queryClient.invalidateQueries(["event", {eventId}])
    })
}

function useEventDelete(eventId, bookId) {
    const queryClient = useQueryClient()
    const deleteEvent = useApiClient()
    return useMutation(() => deleteEvent(`event/${eventId}/`, {method: "DELETE"}), {
        onSuccess: () => queryClient.invalidateQueries(['book', {bookId}])
    })
}


export {useEventCreate, useEventFetch, useEventUpdate, useEventDelete}
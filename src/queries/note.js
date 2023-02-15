import {useMutation, useQueryClient} from "react-query";
import {useApiClient} from "../utils/useApiClient";


function useNoteCreate({endpoint, queryKey}) {
    const queryClient = useQueryClient()
    const postNote = useApiClient()
    return useMutation((data) => postNote(`note/${endpoint}/`, {method: "POST", body: data}), {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        // onSuccess: (res) => queryClient.setQueryData(["book", {bookId}], (oldData => ({...oldData, note: {...res.data, note_text: res.data.note}})))
    })
}

function useNoteUpdate({noteId, queryKey}) {
    const queryClient = useQueryClient()
    const editNote = useApiClient()
    return useMutation((data) => editNote(`note/${noteId}/`, {method: "PUT", body: data}), {
        onSuccess: () => queryClient.invalidateQueries(queryKey)
    })
}

function useNoteDelete({noteId, queryKey}) {
    const queryClient = useQueryClient()
    const deleteNote = useApiClient()
    return useMutation(() => deleteNote(`note/${noteId}`, {method: "DELETE"}), {
        onSuccess: () => queryClient.invalidateQueries(queryKey)
    })
}


export {useNoteCreate, useNoteUpdate, useNoteDelete}
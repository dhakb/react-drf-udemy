import {useMutation, useQueryClient} from "react-query";
import {useApiClient} from "../utils/hooks/useApiClient";


function useNoteCreate({endpoint, queryKey}) {
    const queryClient = useQueryClient()
    const postNote = useApiClient()
    return useMutation((data) => postNote(`note/${endpoint}/`, {method: "POST", body: data}), {
        onSuccess: (res) => queryClient.setQueriesData(queryKey, (oldData) => ({...oldData, note: {id: res.data.id, note_text: res.data.note}}))
    })
}

function useNoteUpdate({noteId, queryKey}) {
    const queryClient = useQueryClient()
    const editNote = useApiClient()
    return useMutation((data) => editNote(`note/${noteId}/`, {method: "PUT", body: data})
    , {
        onSuccess: (res) => queryClient.setQueriesData(queryKey, (oldData) => ({...oldData, note: {...oldData.note, note_text: res.data.note}}))
    })
}

function useNoteDelete({noteId, queryKey}) {
    const queryClient = useQueryClient()
    const deleteNote = useApiClient()
    return useMutation(() => deleteNote(`note/${noteId}/`, {method: "DELETE"}), {
        onSuccess: () => queryClient.setQueriesData(queryKey, (oldData) => ({...oldData, note: null}))
    })
}


export {useNoteCreate, useNoteUpdate, useNoteDelete}
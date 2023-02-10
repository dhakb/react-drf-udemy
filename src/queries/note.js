import {useMutation, useQueryClient} from "react-query";
import {useApiClient} from "../utils/api-client";


function useNoteCreate(bookId) {
    const queryClient = useQueryClient()
    const postNote = useApiClient()
    return useMutation((data) => postNote(`note/book/${bookId}/`, {method: "POST", body: data}), {
        onSuccess: () => queryClient.invalidateQueries(["book", {bookId}]),
        // onSuccess: (res) => queryClient.setQueryData(["book", {bookId}], (oldData => ({...oldData, note: {...res.data, note_text: res.data.note}})))
    })
}

function useNoteUpdate(book) {
    const queryClient = useQueryClient()
    const editNote = useApiClient()
    return useMutation((data) => editNote(`note/${book.note.id}/`, {method: "PUT", body: data}), {
        onSuccess: () => queryClient.invalidateQueries(["book", {bookId: book.id}])
    })
}

function useNoteDelete(book) {
    const queryClient = useQueryClient()
    const deleteNote = useApiClient()
    return useMutation(() => deleteNote(`note/${book.note.id}`, {method: "DELETE"}), {
        onSuccess: () => queryClient.invalidateQueries(["book", {bookId: book.id}])
    })
}


export {useNoteCreate, useNoteUpdate, useNoteDelete}
import {useQuery} from "react-query"
import {useApiClient} from "../utils/api-client";


function useBook(bookId) {
    const fetchBook = useApiClient()
    return useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => fetchBook(`book/${bookId}`, {method: "GET"}).then(res => res.data)
    })
}


function useBooks(selectedTags) {
    let endpoint = selectedTags ? `book/?tags=${selectedTags.reduce((acc, curr) => [...acc, curr.value], []).join()}` : "book/"
    const fetchBooks = useApiClient()
    return useQuery({
        queryKey: "books",
        queryFn: () => fetchBooks(endpoint, {method: "GET"}).then(res => res.data)
    })
}


function useTags() {
    const fetchTags = useApiClient()

    return useQuery({
        queryKey: "tags",
        queryFn: () => fetchTags('book/tag', {method: "GET"}).then(res => {
            return res.data.map(tag => ({label: tag.name, value: tag.id}))
        })
    })
}


function useNextPage(page) {
    const fetchPage = useApiClient()

    return useQuery({
        queryKey: "books",
        queryFn: () => fetchPage(page, {method: "GET", pagination: true}).then(res => res.data)
    })
}


function usePreviousPage(page) {
    const fetchPage = useApiClient()

    return useQuery({
        queryKey: "books",
        queryFn: () => fetchPage(page, {method: "GET", pagination: true}).then(res => res.data)
    })
}

export {useBook, useBooks, useTags, useNextPage, usePreviousPage}
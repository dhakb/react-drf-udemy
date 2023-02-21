import {useQuery} from "react-query"
import {useApiClient} from "../utils/hooks/useApiClient";


function useBook(bookId) {
    const fetchBook = useApiClient()
    return useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => fetchBook(`book/${bookId}/`, {method: "GET"}).then(res => res.data)
    })
}


function useBooks(selectedTags, pageNum) {
    let endpoint = selectedTags.length ? `book/?tags=${selectedTags.reduce((acc, curr) => [...acc, curr.value], []).join()}/` : "book/"
    const fetchBooks = useApiClient()
    return useQuery({
        // queryKey: ["books", {pageNum}],
        queryKey: "books",
        queryFn: () => fetchBooks(endpoint, {method: "GET"}).then(res => res.data),
        // keepPreviousData: true
    },)
}


function useTags() {
    const fetchTags = useApiClient()
    return useQuery({
        queryKey: "tags",
        queryFn: () => fetchTags('book/tag/', {method: "GET"}).then(res => {
            return res.data.map(tag => ({label: tag.name, value: tag.id}))
        })
    })
}


function useBooksNextPage(page, pageNum) {
    const fetchPage = useApiClient()
    // console.log("useBooksNext", pageNum)
    return useQuery({
        // queryKey: ["books", {pageNum}],
        queryKey: "books",
        queryFn: () => fetchPage(page, {method: "GET", pagination: true}).then(res => res.data),
        // keepPreviousData: true
    })
}


function useBooksPrevPage(page, pageNum) {
    const fetchPage = useApiClient()
    // console.log("useBooksPrev", pageNum)
    return useQuery({
        // queryKey: ["books", {pageNum}],
        queryKey: "books",
        queryFn: () => fetchPage(page, {method: "GET", pagination: true}).then(res => res.data),
        // keepPreviousData: true
    })
}

// function useBooksTest({selectedTags, page}) {
//     const fetchPage = useApiClient()
//     let endpoint = selectedTags.length ? `book/?tags=${selectedTags.reduce((acc, curr) => [...acc, curr.value], []).join()}` : "book/"
//     if(page) {
//         endpoint = page
//     }
//     return useQuery({
//         queryKey: "books",
//         queryFn: () => fetchPage(endpoint, {method: "GET", pagination: true}).then(res => res.data)
//     })
// }

export {useBook, useBooks, useTags, useBooksNextPage, useBooksPrevPage}
import {useInfiniteQuery, useQuery} from "react-query"
import {useApiClient} from "../utils/hooks/useApiClient";


export function useBook(bookId) {
    const fetchBook = useApiClient()
    return useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => fetchBook(`book/${bookId}/`, {method: "GET"}).then(res => res.data)
    })
}


export function useBooksInfinite({selectedTags, nextPage}) {
    const fetchBooks = useApiClient()
    let endpoint = selectedTags.length ? `book/?tags=${selectedTags.reduce((acc, curr) => [...acc, curr.value], []).join()}` : "book/"
    return useInfiniteQuery({
        queryKey: ["authorBooks", {selectedTags, nextPage}],
        queryFn: ({pageParam}) => fetchBooks(!pageParam ? endpoint : pageParam, {method: "GET", pagination: Boolean(pageParam)}).then(res => res.data),
        getNextPageParam: (res) => res.next
    })
}


export function useTags() {
    const fetchTags = useApiClient()
    return useQuery({
        queryKey: "tags",
        queryFn: () => fetchTags('book/tag/', {method: "GET"}).then(res => {
            return res.data.map(tag => ({label: tag.name, value: tag.id}))
        })
    })
}
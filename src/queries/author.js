import {useQuery} from "react-query";
import {useApiClient} from "../utils/useApiClient";



function useAuthorsList()  {
    const fetchAuthors = useApiClient()
    return useQuery({
        queryKey: "authors",
        queryFn: () => fetchAuthors('author', {method: "GET"}).then(res => res.data)
    })
}

function useAuthor(authorId) {
    const fetchAuthor = useApiClient()
    return useQuery({
        queryKey: ["author", {authorId}],
        queryFn: () => fetchAuthor(`author/${authorId}/`, {method: "GET"}).then(res => res.data)
    })
}

function useAuthorBooks(authorId, limit = 5) {
    const fetchAuthorBooks = useApiClient()
    return useQuery({
        queryKey: ["authorBooks", {authorId}],
        queryFn: () => fetchAuthorBooks(`/author/${authorId}/books/?limit=${limit}`, {method: "GET"}).then(res => res.data)
    })
}

function useAuthorsNextPage({nextPage, queryKey}) {
    const fetchNextPage = useApiClient()
    return useQuery({
        queryKey: queryKey,
        queryFn: () => fetchNextPage(nextPage, {method: "GET", pagination: true}).then((res) => res.data)
    })
}

function useAuthorsPrevPage({prevPage, queryKey}) {
    const fetchNextPage = useApiClient()
    return useQuery({
        queryKey: queryKey,
        queryFn: () => fetchNextPage(prevPage, {method: "GET", pagination: true}).then((res) => res.data)
    })
}

// function useAuthorsPage({page, queryKey}) {
//     const fetchPage = useApiClient()
//     return useQuery({
//         queryKey: queryKey,
//         queryFn: () => fetchPage(page, {method: "GET", pagination: true}).then((res) => res.data)
//     })
// }


export {useAuthorsList,useAuthor, useAuthorsNextPage, useAuthorsPrevPage, useAuthorBooks}
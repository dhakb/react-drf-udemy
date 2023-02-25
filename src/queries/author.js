import {useQuery} from "react-query";
import {useApiClient} from "../utils/hooks/useApiClient";


export function useAuthorsList({requestPath})  {
    const fetchAuthors = useApiClient()
    const pagination = /http/g.test(requestPath)
    return useQuery({
        queryKey: ["authors", {requestPath}],
        queryFn: () => fetchAuthors(`${requestPath}`, {method: "GET", pagination}).then(res => res.data),
        keepPreviousData: true,
    })
}

export function useAuthor(authorId) {
    const fetchAuthor = useApiClient()
    return useQuery({
        queryKey: ["author", {authorId}],
        queryFn: () => fetchAuthor(`author/${authorId}/`, {method: "GET"}).then(res => res.data)
    })
}

export function useAuthorBooks({requestPath, authorId}) {
    const fetchAuthorBooks = useApiClient()
    const pagination = /http/g.test(requestPath)
    return useQuery({
        queryKey: ["authorBooks", {authorId, requestPath}],
        queryFn: () => fetchAuthorBooks(`${requestPath}`, {method: "GET", pagination}).then(res => res.data),
        keepPreviousData: true
    })
}

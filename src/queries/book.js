import {useQuery} from "react-query"
import {useApiClient} from "../utils/api-client";


function useBook(bookId) {
    const fetchBook = useApiClient()
    return useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => fetchBook(`book/${bookId}`, {method: "GET"}).then(res => res.data)
    })
}

export {useBook}
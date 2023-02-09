import {useQuery} from "react-query"
import {useApiClient} from "../utils/api-client";




function useBook(bookId) {
    const fetchBook = useApiClient()
    const {data, isLoading} = useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => fetchBook(`book/${bookId}`, {method: "GET"}).then(res => res.data)
    })
    return {data, isLoading}
}


export {useBook}
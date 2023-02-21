export function usePageNumber(prevPage, nextPage) {
    if (prevPage === null && nextPage === null) {
        return 1
    } else if (prevPage === null && nextPage) {
        return 1
    } else if(prevPage && nextPage) {
        const pageRef = nextPage.match(/page=([^&]+)/g)
        const pageNum = pageRef[0].slice(pageRef[0].indexOf("=") + 1)
        return parseInt(pageNum) - 1
    } else if(prevPage && nextPage === null) {
        const pageRef = prevPage.match(/page=([^&]+)/g)
        if(pageRef) {
            const pageNum = pageRef[0].slice(pageRef[0].indexOf("=") + 1)
            return parseInt(pageNum) + 1
        } else {
            return 2
        }
    }
    return 1
}
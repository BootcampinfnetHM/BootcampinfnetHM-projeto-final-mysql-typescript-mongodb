class GeneriController {
    generatePagination(limit: any, page: any) {
        const limitVar = limit ? parseInt(limit) : 8,
              pageVar = page? parseInt(page) -1 : 0

            return [limitVar, pageVar]
    }
}
 

export default GeneriController
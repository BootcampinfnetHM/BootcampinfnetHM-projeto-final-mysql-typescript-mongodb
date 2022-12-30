import { Document } from "../models/document.entity"; 
import { Op } from "sequelize";


import GeneriController from "./GenericController";



class DocController extends GeneriController{
    constructor() {
        super()
    }

    async getDocumentById(id: string) {

        let document = await Document.findById(id)

        console.log(document)

        return {
            document,
            status: 200
        }
    }


    async getDocument(query: any)  {

        let { id, page, limit } = query

        let res = this.generatePagination(limit, page)
        limit = res[0]
        page = res[1]


        let document = await Document.find({ id }).skip(page * limit).limit(limit)

        const total = await Document.find({ id });
        const count = Math.ceil(total.length / limit);

        return {
            document,
            count,
            status: 200
        }
    }
}

export default DocController
import { Document } from "../models/document.entity"; 
import { Op } from "sequelize";

import GeneriController from "./GenericController";



class DocController extends GeneriController{
    constructor() {
        super()
    }


    async getDocument(query: any)  {

        let { id, page, limit } = query

        let res = this.generatePagination(limit, page)
        limit = res[0]
        page = res[1]


        console.log(limit +'///////')

        let document = await Document.find({ id }).skip(page * limit).limit(limit)
        {console.log(document)}

        return {
            data: document,
            status: 200
        }
    }
}

export default DocController
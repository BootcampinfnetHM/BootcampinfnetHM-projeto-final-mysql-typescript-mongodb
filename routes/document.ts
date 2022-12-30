import express from "express";
const document = express.Router()

import DocController from "../controllers/DocController";

const docCtrl = new DocController()

document.get('/', async(req, res) => {
    const result = await docCtrl.getDocument(req.query)

    res.statusCode = result.status
    res.json(result.data)
})
// [
//     { id: 1, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 2, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 3, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 4, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 5, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 6, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 7, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 8, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 9, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 11, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
// ]
document.post('/', async(req, res) => {
    res.json([
    ])
})

document.patch('/:id', async(req, res) => {
    res.json({

    })
})

document.get('/:id', async(req, res) => {
    res.json({

    })
})

export default document
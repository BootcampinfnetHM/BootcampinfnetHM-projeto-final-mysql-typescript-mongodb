import { Grid, IconButton,Stack, Pagination } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material";
import React from "react"
import { useLocation } from "react-router-dom"
import { Lista }  from "../components"
import useSWR from 'swr'


const editDocument = (docName) => {
    return alert(`Editando ${docName}`)
}


const deleteDocument = (id) => {
    return alert()
}

const fetcher = (...args)  => fetch(...args).then(res => res.json())


const Documents = ({ setCurrentRoute }) => {

    const { data: rows, error, isLoading } = useSWR('http://localhost:3002/document?id=1', fetcher, {refreshInterval: 5000})

    const columns = [
        { headerName: 'ID', key: '_id', id: true },
        { headerName: 'Título', key: 'title', id: true },
        { headerName: 'Conteúdo', key: 'content', id: false },
        { headerName: 'Data', key: 'createdAt', id: false  },
        { headerName: 'Data', key: 'updatedAt', id: false  },
        { headerName: 'Ações', key: 'null', id: false, action: (params) => {
            return <>
                <IconButton onClick={() => editDocument(params.title)} >
                    <Edit></Edit>
                </IconButton>
                <IconButton onClick={() => deleteDocument(params.title)} >
                    <Delete></Delete>
                </IconButton>
            
            </>
        }  },
        
    ];
    

    const location = useLocation()
    setCurrentRoute(location.pathname)

    const ListaProps = {
        style:{
            marginTop: '50px'
        },
        columns: columns,
        rows: rows,
        isLoading: isLoading
    }

    return <Grid container > 

    <Grid item xs={0} md={2}></Grid>
    <Grid item xs={12} md={8}>
        {
            error ? 'Um erro aconteceu' : <Lista {...ListaProps}></Lista>
        }
    </Grid>
    <Grid item xs={0} md={2}></Grid>
    <Grid item xs={0} md={2}>
        <Stack>
            <Pagination count={10} color="primary" ></Pagination>
        </Stack>
    </Grid>



    </Grid>
    
}       

export default Documents
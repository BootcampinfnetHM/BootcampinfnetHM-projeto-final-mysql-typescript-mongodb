import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



    
    const Lista = ({style, columns, rows, isLoading}) =>  {
      return (
        <TableContainer component={Paper} style={style} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                {
                columns.map(column => <TableCell>{column.headerName}</TableCell> )
                }

              </TableRow>
            </TableHead>
            <TableBody>
              {

                isLoading ? 'Carregando' : 
                // TODO: add component de loading
                

                rows.length > 0 ? 
                (
                  rows.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {
                        columns.map(column => {
                                if (column.action) {
                                  return column.action(row)
                                }
                                else {
                                  if(column.id){
                                    return <TableCell style={{
                                                        fontWeight: 'bold'
                                                    }} component="th" scope="row">{row[column.key]}</TableCell>
                                  }
                                  else{
                                      return <TableCell>{row[column.key]}</TableCell>
                                  }
                                }
                                
                            
                        })
                    }
                </TableRow>
                  ))
                )
                : 
                ('a')
              }
            </TableBody>
          </Table>
        </TableContainer>
      );
    
    }

    Lista.defaultProps = {
      style: {},
      columns: [],
      rows: [],
      isLoading: false
    }


export default Lista
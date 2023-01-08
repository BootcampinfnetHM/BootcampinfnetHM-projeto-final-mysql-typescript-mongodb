import React, { useEffect, useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
import { useState } from "react";
import useSWR from 'swr'
import { Editor } from '@tinymce/tinymce-react';
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { getUserId, userIsLoggedIn } from "../services/auth";

const Document = ({ setCurrentRoute }) => {
  const editorRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } = useSWR(`http://localhost:3002/document/${params.id === undefined ? 0 : params.id}`, fetcher, { refreshInterval: 5000 })
  const user = getUserId()
  

  const  [ titleVar , setTitle] = useState("")
  const  [ content , setContent] = useState("")


const loadDoc = async ()=> {
  if(params.id !== undefined) {
    console.log(data)
    console.log('oi')
    setTitle(data.doc.title)
    setContent(data.doc.content)
  }
}

const updateDoc = async () => {
  if(params.id !== undefined){
      await fetch(`http://localhost:3002/document/${params.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
              nome: titleVar,
              content: editorRef.current.getContent()
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
  }else{
      const response = await fetch(`http://localhost:3002/document`, {
          method: 'POST',
          body: JSON.stringify({
              nome: titleVar,
              content: editorRef.current.getContent(),
              id: user.id
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
      const data = await response.json();
      navigate(`/document/${data._id}`);
  }
  
}


  useEffect(() => {
    if(params.id !== undefined) {
      loadDoc()
    }
  }, [data])

  useEffect(() => {
    userIsLoggedIn(navigate, null)
  }, [])


  return (
    <Box style ={{
      padding: '10px'
    }}>
      <TextField
          fullWidth={true}
          value={titleVar}
          onChange={(e) => setTitle(e.target.value)}
          variant='standard'
          label='Título'
          style={{
            marginBottom: '5px'
          }}
          >
      </TextField>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <Button onClick={updateDoc} variant="contained">Salvar alterações</Button>
    </Box>
  );
}

export default Document
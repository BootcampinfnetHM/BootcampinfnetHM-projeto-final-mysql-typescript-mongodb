import React, { useEffect, useRef } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
import { useState } from "react";
import useSWR from 'swr'
import { Editor } from '@tinymce/tinymce-react';
import { Input } from "../components";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/material";

const Document = ({ setCurrentRoute }) => {
  const editorRef = useRef(null);

  const location = useLocation();
  const params = useParams();

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const {quill, quillRef} = useQuill()
  const [document, setDocument] = useState(1)

  const { data, error, isLoading } = useSWR(`http://localhost:3002/document/${params.id}`, fetcher, { refreshInterval: 5000 })

  const  [ titleVar , setTitle] = useState("")
  const  [ content , setContent] = useState("")

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

const loadDoc = async ()=> {
  console.log(data.document)
  setTitle(data.document.title)
  setContent(data.document.content)
}

const updateDoc = () => {
  fetch(`http://localhost:3002/document/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      content: editorRef.current.getContent(), 
      title: titleVar,
    }),
    headers: {
      'Content-type' : 'application/json; charset=UTF-8'
    }
  })
}

// const counter = () => {

//   let countIncrement = 0
//   setInterval(() => {
//     countIncrement++
//     if(countIncrement === 3) {
//         updateDoc()
//         countIncrement = 0
//       }

//   }, 1000);

// }

  // useEffect(() => {
  //   counter()
  // }, [])

  useEffect(() => {
    loadDoc()
  }, [data])


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
import React, { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
import { useState } from "react";
import useSWR from 'swr'

const Document = ({ setCurrentRoute }) => {
  const location = useLocation();
  const params = useParams();

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const {quill, quillRef} = useQuill()
  const [document, setDocument] = useState(1)

  const { data, error, isLoading } = useSWR(`http://localhost:3002/document/${params.id}`, fetcher, { refreshInterval: 5000 })

const loadDoc = async ()=> {
  if(quill) {
    if(data) {
      quill.clipboard.dangerouslyPasteHTML(data.document.content)
    }
    else {
      quill.clipboard.dangerouslyPasteHTML('')

    }
  }
}

const updateDoc = () => {
 if(quill) {
  fetch(`http://localhost:3002/document/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      // title: '',
      content: quill.root.innerHTML, 
    }),
    headers: {
      'Content-type' : 'application/json; charset=UTF-8'
    }
  })
 }
  
}

const counter = () => {

  let countIncrement = 0
  setInterval(() => {
    countIncrement++
    if(countIncrement === 3) {
        updateDoc()
        countIncrement = 0
      }

  }, 1000);

}

  useEffect(() => {
    counter()
  }, [])

  useEffect(() => {
    loadDoc()
  }, [quill])


    return (
        <div style={{ width: 500, height: 300, marginTop: '10px' }}>
            <div ref={quillRef}>

            </div>  
        </div>
      );
}

export default Document
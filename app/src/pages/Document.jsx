import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
import { useState } from "react";

const Document = ({ setCurrentRoute }) => {
    const location = useLocation()
    setCurrentRoute(location.pathname)
    
    const [document, setDocument] = useState()
    const { quill, quillRef} = useQuill()


    const loadingDocument = async () => {
      setDocument(`<h1>Lalala</h1>`)
    }
    
    useEffect(() => {

      loadingDocument()

      if(quill) {
        quill.clipboard.dangerouslyPasteHTML(document)
      }
    }, [quill])

    return (
        <div style={{ width: 500, height: 300, marginTop: '10px' }}>
          <div ref={quillRef} />
        </div>
      );
}

export default Document
import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
import { useState } from "react";
import useSWR from 'swr'
import { useParams } from "react-router-dom";

const Document = ({ setCurrentRoute }) => {
  const location = useLocation();
  const params = useParams();

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const [counter, setCounter] = useState(0)

  const { data, error, isLoading } = useSWR(`http://localhost:3002/document/${params.id}`, fetcher, { refreshInterval: 5000 })
  console.log(data.document)
    return (
        <div style={{ width: 500, height: 300, marginTop: '10px' }}>
          <h1>hello</h1>
        </div>
      );
}

export default Document
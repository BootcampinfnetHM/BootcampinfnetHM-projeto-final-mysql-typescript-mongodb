import React, { useEffect, useRef } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
import { useState } from "react";
import useSWR from 'swr'
import { Editor } from '@tinymce/tinymce-react';
import { Input } from "../../components";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/material";

const Home = ({ setCurrentRoute }) => {
  const editorRef = useRef(null);

  const location = useLocation();
  const params = useParams();

  const fetcher = (...args) => fetch(...args).then(res => res.json())



  return <>
  
  </>
}

export default Home
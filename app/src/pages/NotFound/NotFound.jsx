import React, { useEffect, useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import 'quill/dist/quill.snow.css'
import { useState } from "react";
import { Box } from "@mui/material";

import './NotFound.css'

const NotFound = ({ setCurrentRoute }) => {

    const location = useLocation()
    setCurrentRoute(location.pathname)


    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/not-found`)
    }, [])


  return (
    <Box 
    className="NotFoundBG"  
    style ={{
      height: '100vh',
      
    }}>

    </Box>
  );
}

export default NotFound
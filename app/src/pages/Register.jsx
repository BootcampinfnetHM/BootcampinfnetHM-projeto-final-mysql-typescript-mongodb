import React from "react"
import { useLocation } from "react-router-dom"


const Register = ({ setCurrentRoute }) => {
    const location = useLocation()
    setCurrentRoute(location.pathname)


    return 'register'
}

export default Register
import React from "react"
import { useLocation } from "react-router-dom"


const Login = ({ setCurrentRoute }) => {
    const location = useLocation()
    setCurrentRoute(location.pathname)


    return 'login'
}

export default Login
import { Stack, Grid, TextField, Box, Button } from "@mui/material"
import { fontSize, height } from "@mui/system"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './LoginRegisterBG.css'
import { login } from "../services/auth"

const Login = ({ setCurrentRoute }) => {
    const navigate = useNavigate()
    const location = useLocation()
    setCurrentRoute(location.pathname)

    const [ email , setEmail ] = useState("") 
    const [ password , setPassword ] = useState("") 

    return <Grid container spacing={0}>
        <Grid   item xs={0} sm={6} md={6} xl={6} >
            <Box >
                <div className='bg-login-img'> </div>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} xl={6} >
            <Stack alignItems={'center'} spacing={2} >

                <img width={'50%'} alt="logo Online Docs" src="https://helpx.adobe.com/content/dam/help/pt/creative-cloud/help/access_files.png.img.png"></img>
                <h1 style={{fontSize: '40px'}}>ONLINE DOCS</h1>
                <p style={{fontSize: '15px'}}>Login</p>
                <Stack justifyContent={'center'} style={{width: '50%'}} spacing={2}>
                    <TextField
                    style={{background: 'white'}}
                        fullWidth={true}
                        label='Email'
                        type={'email'}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </TextField>
                    <TextField
                    style={{background: 'white'}}
                    
                        fullWidth={true}
                        label='Password'
                        type={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    >
                    </TextField>
                    <Button 
                    variant="contained" 
                    onClick={() => {
                        login(email, password)
                    }}
                    >
                        Entrar
                    </Button>
                    <Button 
                    variant="contained" 
                    onClick={() => {
                        navigate('/register')
                    }}
                    >
                        Registrar
                    </Button>
                    
                </Stack>
            </Stack>
        </Grid>

    </Grid>
}

export default Login
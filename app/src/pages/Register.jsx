import { Stack, Grid, TextField, Box, Button } from "@mui/material"
import { fontSize, height } from "@mui/system"
import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import './LoginRegisterBG.css'
import { register, userIsLoggedIn } from "../services/auth"

import { useNavigate } from "react-router-dom"

const Register = ({ setCurrentRoute }) => {
    
    const navigate = useNavigate()
    const location = useLocation()
    setCurrentRoute(location.pathname)

    useEffect(() => {
        userIsLoggedIn(navigate, location.pathname)
      }, [])

    const [ email , setEmail ] = useState("") 
    const [ password , setPassword ] = useState("") 
    const [ name , setName ] = useState("") 
    const [ username , setUsername ] = useState("") 

    return <Grid container spacing={0}>
        <Grid   item xs={0} sm={6} md={6} xl={6} >
            <Box >
                <div className='bg-register-img'> </div>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} xl={6} >
            <Stack alignItems={'center'} spacing={2} >

                <img width={'25%'} alt="logo Online Docs" src="https://helpx.adobe.com/content/dam/help/pt/creative-cloud/help/access_files.png.img.png"></img>
                <h1 style={{fontSize: '40px'}}>ONLINE DOCS</h1>
                <p style={{fontSize: '15px'}}>Login</p>
                <Stack justifyContent={'center'} style={{width: '50%'}} spacing={2}>
                    <TextField
                        value={email}
                        style={{background: 'white'}}
                        fullWidth={true}
                        label='Email'
                        type={'email'}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </TextField>
                    <TextField
                        value={username}
                        style={{background: 'white'}}
                        fullWidth={true}
                        label='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </TextField>
                    <TextField
                        value={name}
                        style={{background: 'white'}}
                        fullWidth={true}
                        label='Nome'
                        onChange={(e) => setName(e.target.value)}
                    >
                    </TextField>
                    <TextField
                    style={{background: 'white'}}
                        value={password}
                        fullWidth={true}
                        label='Password'
                        type={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    >
                    </TextField>
                    <Button 
                    variant="contained" 
                    onClick={async  () => {
                        const response = await register(email, username, name, password)
                        if(response.status === 200) {
                            alert('Você recebrá um email de confirmação em alguns instantes')
                            // TODO: Re-envio de email
                        }
                        // else if ( response.status === 400) {
                        //     alert('O Username ou Email já foram cadastrados')
                        // }
                        else if ( response.status === 404) {
                            alert('Um erro aconteceu')
                        }
                    }}
                    > Registrar </Button>
                    <Button 
                    variant="contained" 
                    onClick={() => {
                        navigate('/login')
                    }}
                    >
                            Entrar
                    </Button>
                </Stack>
            </Stack>
        </Grid>

    </Grid>
}

export default Register
import { Stack, Grid, TextField, Box, Button } from "@mui/material"
import { fontSize, height } from "@mui/system"
import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './LoginRegisterBG.css'
import { login, userIsLoggedIn } from "../services/auth"

const Login = ({ setCurrentRoute }) => {
    const navigate = useNavigate()
    const location = useLocation()
    setCurrentRoute(location.pathname)

    useEffect(() => {
        userIsLoggedIn(navigate, location.pathname)
      }, [])

    const [ userEmail , setUserEmail ] = useState("") 
    const [ password , setPassword ] = useState("") 

    return <Grid container spacing={0}>
        <Grid   item xs={0} sm={6} md={6} xl={6} >
            <Box >
                <div className='bg-login-img'> </div>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} xl={6} >
            <Stack alignItems={'center'} spacing={2} >

                <img width={'25%'} alt="logo Online Docs" src="https://helpx.adobe.com/content/dam/help/pt/creative-cloud/help/access_files.png.img.png"></img>
                <h1 style={{fontSize: '40px'}}>ONLINE DOCS</h1>
                <p style={{fontSize: '15px'}}>Login</p>
                <Stack justifyContent={'center'} style={{width: '50%'}} spacing={2}>
                    <TextField
                    style={{background: 'white'}}
                        value={userEmail}
                        fullWidth={true}
                        label='Email'
                        type={'email'}
                        onChange={(e) => setUserEmail(e.target.value)}
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
                    onClick={async () => {
                        const response = await login(userEmail, password)
                        console.log(response.status)
                        if(response.status === 200) {
                            window.localStorage.setItem('user', JSON.stringify(response.data))
                            navigate('/')
                        }
                        else {
                            alert('Usuário ou senha inválidos')
                        }

                        
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
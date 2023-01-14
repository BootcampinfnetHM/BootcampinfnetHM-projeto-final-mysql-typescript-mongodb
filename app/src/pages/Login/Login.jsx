import { Stack, Grid, TextField, Box, Button, Modal, Typography } from "@mui/material"
import { fontSize, height } from "@mui/system"
import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './LoginBG.css'
import { login, userIsLoggedIn, forgotPassword } from "../../services/auth"

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Login = ({ setCurrentRoute }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);  
     
    const navigate = useNavigate()
    const location = useLocation()
    setCurrentRoute(location.pathname)

    useEffect(() => {
        userIsLoggedIn(navigate, location.pathname)
      }, [])

    const [ userEmail , setUserEmail ] = useState("") 
    const [ password , setPassword ] = useState("") 

    return <Grid container spacing={0} style={{background: 'white',}} >
        <Grid   item xs={0} sm={6} md={6} xl={6} >
            <Box >
                <div className='bg-login-img'> </div>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} xl={6} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} >
            <Stack alignItems={'center'} spacing={2} >

                <img width={'25%'} alt="logo Online Docs" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/TK_archive_icon.svg/1024px-TK_archive_icon.svg.png"></img>
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

                    <Button 
                    variant="contained" 
                    onClick={async () => {
                        handleOpen()
                        await forgotPassword(userEmail)
                        // TODO: Re-envio de email
                    }}
                    >
                        Esqueceu a senha?
                    </Button>
                    
                </Stack>
            </Stack>
        </Grid>
        <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box style={{width: '800px'}} sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Você recebrá um email com a sua nova senha em alguns instantes.
                        </Typography>

                      </Box>
        </Modal>
    </Grid>
}

export default Login
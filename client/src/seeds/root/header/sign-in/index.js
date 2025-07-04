import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Dialog, DialogContent, Tooltip, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';

import loginLogo from '../../../../assets/icons/38 Login.png'

import { AdminContext } from '../../../../context/AdminContext';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor:"#0c343d"
  }, paper: {
    marginTop: theme.spacing(21),
    marginBottom: theme.spacing(21),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"white",
    padding:theme.spacing(3),
    maxHeight:"40vh",
    minHeight:510,
    borderRadius:5
  }, paperSmallHeight: {
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"white",
    padding:theme.spacing(5),
    maxHeight:"40vh",
    minHeight:490
  }, avatar: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  }, form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }, submit: {
    marginTop: theme.spacing(1),
    fontFamily: "'Outfit', sans-serif",
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    height: 48,
    padding: '0 30px',  
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
      padding:'30 px',
    }
  }, submitGuest: {
    marginTop: theme.spacing(2),
    fontFamily: "'Outfit', sans-serif",
    border: 15,
    borderColor: '#ccd0d5',
    lineHeight: '0 42px',
    borderRadius: 15,
    backgroundColor: '#fff',
    color: '#4b4f56',
    fontSize: '1rem',
    height: 48,
    padding: '0 30px',  
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
      padding:'30 px'
    }
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily:"'Outfit', sans-serif"
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily: "'Outfit', sans-serif",
    textAlign: "center"
  }, block: {
    height: '38px',
    width: '391px',
    display: 'grid',
    gridTemplateColumns: '1fr 20px 1fr',
    gridTemplateRows: '1fr',
    backgroundColor: 'rgb(255, 255, 255)'
  }, text: {
    margin: 'auto 0',
    fontSize: '22px',
    color: 'rgb(175, 175, 175)'
  }, body: {
    backgroundColor: '#000'
  }
}));

export default function SignIn() {
  
  const classes = useStyles();
  const history = useHistory();

  const [isHeightSmall, setIsHeightSmall] = useState(false)
  const { setLoginDetails, setSessionData, setSessionFile } = useContext(AdminContext)

  window.addEventListener("resize", function () {
    if (window.innerHeight <= 722){
      setIsHeightSmall(true)
    }
  });
  
  useEffect(()=>{
    if (window.innerHeight <= 722){
      setIsHeightSmall(true)
    }
  }, [window.innerHeight, window.innerWidth])
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginDialogOpen, setLoginDialog] = useState(false)
  const [loginDialogContent, setLoginDialogContent] = useState('')
  const handleCloseLoginDialog = () => {setLoginDialog(false); }

  const LoginDialog = () => {
    return (
      <Dialog open={loginDialogOpen} onClose={handleCloseLoginDialog}>
        <DialogContent align='center' >
          {loginDialogContent}
        </DialogContent>
      </Dialog>
    )
  }

  const onLogin = (e) => {
    e.preventDefault()
    const fetchData = async() => {
      const res = await axios.post("https://seeds.geospectrum.com.ph/usermaster/signin", {
      // const res = await axios.post("http://localhost:5000/usermaster/signin", {
        "email": email, 
        "password": password
      }).then(function(res) {
        if ('success' in res.data) {
          if (res.data.success === true) { 
            setLoginDetails(res.data.message)
            const fetch1 = async() =>{
              const sessionData = await axios.get("https://seeds.geospectrum.com.ph/session/get?userId="
                // const sessionData = await axios.get("http://localhost:5000/session/get?userId="
                + res.data.message._id); 
              const fuke = await axios.get("https://seeds.geospectrum.com.ph/session/file/"
                              // const fuke = await axios.get("http://localhost:5000/session/file/"
                + res.data.message._id)
              if (sessionData !== null) {
                setSessionData(sessionData.data)
                setSessionFile(fuke.data)
              } else {
                const create = async() => {
                  const createSession = await axios.post("https://seeds.geospectrum.com.ph/session/create", {
                  // const createSession = await axios.post("http://localhost:5000/session/create", {
                  userId: res.data.message._id,
                    populate: {
                      mapName: '',
                      file: '',
                      social: false,
                      economic: false,
                      environmental: false,
                      demographic: false,
                      type: '',
                      keywords: [],
                      description: '',
                      language: '',
                      license: '',
                      doi: '',
                      attribution: '',
                      regions: '',
                      dqs: '',
                      restrictions: '',
                      constraints: '',
                      details: ''
                    },
                    catalogue: {    
                      Social: true,
                      Economic: true,
                      Environmental: true,
                      Demographic: true,
                      Vector: true,
                      Raster: true,
                      Table: true,
                      keywords: [],},
                    map: {
                      layers: ''
                    },
                    profile: '',
                    analytics: ''
                  }).then(()=>{
                    // console.log("success")
                  })
                }
                create()
                setSessionData({
                  userId: res.data.message._id,
                  populate: '',
                  catalogue: '',
                  map: '',
                  profile: '',
                  analytics: ''
            
                })
              }
            } 
            fetch1();
            localStorage.setItem('user', JSON.stringify(res.data.message))
            alert("Login Success", res.data)
            history.push('/seeds/mapportal')
          } 
        }
      }).catch((error) => {
        if (error.response.data.errors.length===1){
          error.response.data.errors.forEach((error)=> {
          for (var key in error) {
            alert(key.charAt(0).toUpperCase() + key.slice(1)+" is " +error[key]+".")
          }})
        } else if (error.response.data.errors.length===2){
          alert("Email is " +error.response.data.errors[0]['email']+".")
        } else {
          alert("Email and password are "+error.response.data.errors[0]['email']+".")  
        }     
      })
    }
    fetchData();
  }

  const onGuest = (e) => {
    e.preventDefault()
    setLoginDetails({name: "Guest", user_type:'guest'})
    history.push('/seeds/mapportal')
    localStorage.setItem('user', JSON.stringify({name: "Guest", user_type:'guest'}))
  }

  const onForgotPassword = (e) => {
    history.push('/forgotPassword')
  }

  return (
    <>
      <Grid container className={classes.container} >
        <Grid container justifyContent="center" alignItems="center"> 
          <Grid item xs={11} sm={8} md={6} lg={4} xl={3}
            className={clsx(classes.paper, {
              [classes.paperSmallHeight]: isHeightSmall,
            })}>
            <Tooltip title="Back to Home">
              <img src={loginLogo} style={{height:55, padding:10, borderRadius:50, cursor:"pointer"}} 
                className={classes.avatar} onClick={()=>{history.push('/')}} />
            </Tooltip>
            <form className={classes.form} noValidate>
              <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" name="email" 
                autoComplete="email" autoFocus value={email} onChange={e=> setEmail(e.target.value)}/>
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" 
                type="password" autoComplete="current-password" value={password}
                onChange={e=> setPassword(e.target.value)}/>
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} 
                onClick={onLogin}>
                Login
              </Button>

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitGuest} 
                onClick={onGuest}>
                Guest
              </Button>
              <a onClick={onForgotPassword} href="#" variant="body2" 
                style={{color: '#0d3c47'}}>
                Forgot password?
              </a>
            </form>
          </Grid>
        </Grid>
      </Grid>
      <LoginDialog/>
    </>
  );
}
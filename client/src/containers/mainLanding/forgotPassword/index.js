import React, { useEffect, useState } from 'react';
import { Grid, Dialog, DialogContent, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import axios from 'axios';

import LoadingPage from '../../loadingPage'

import { SEEDSContext } from '../../../context/SEEDSContext';

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
    padding:theme.spacing(5),
    maxHeight:"40vh",
    minHeight:450,
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
    minHeight:450
  }, avatar: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  }, form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }, submit: {
    marginTop: theme.spacing(1),
    fontFamily: 'LeagueSpartan',
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    height: 48,
    padding: '0 30px',  
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
      padding:'30 px'
    }
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily:'LeagueSpartan'
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily:'LeagueSpartan',
    textAlign: "center"
  }
}));

export default function SignIn() {
 
  const classes = useStyles();
  const history = useHistory();

  const [isHeightSmall, setIsHeightSmall] = useState(false)
  const [email, setEmail] = useState('')
  const [loginDialogOpen, setLoginDialog] = useState(false)
  const [loginDialogContent, setLoginDialogContent] = useState('')

  const { setDisUp } = useContext(SEEDSContext);

  const handleCloseLoginDialog = () => {setLoginDialog(false); }
  
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

  const LoginDialog = () => {
    return (
      <Dialog open={loginDialogOpen} onClose={handleCloseLoginDialog}>
        <DialogContent align='center'>
          {loginDialogContent}
        </DialogContent>
      </Dialog>
    )
  }

  const onLogin = (e) => {
    history.push('/login')
  }

  const onSendLink = (e) => {
    e.preventDefault()

    const postEmail = async() => {
      setDisUp(true)
      const res = await axios.post("http://ec2-52-90-134-187.compute-1.amazonaws.com/resetPasswordMaster/", {"email": email})
        .then(function(res) {
          setDisUp(false)
          alert("Password reset link sent to your email account!")
        }).catch((error) => {
          setDisUp(false)
          alert("Email not found")
          console.log(error)
      })
    }
    postEmail();
  }
  
  return (
    <>
      <Grid container className={classes.container} >
        <Grid container justifyContent="center" alignItems="center" > 
          <LoadingPage/>
          <Grid item xs={11} sm={8} md={6} lg={3} xl={3}
            className={clsx(classes.paper, {
              [classes.paperSmallHeight]: isHeightSmall,
            })}>
            <Typography component="h1" variant="h5" >
              Trouble Logging In?
            </Typography>
            <br/>
            <Typography>
              Enter your email and we'll send you a link to get back into your account.
            </Typography>
            <br/>
            <form className={classes.form} noValidate>
              <TextField variant="outlined" margin="normal" required fullWidth
                id="email" label="Email Address" name="email" autoComplete="email"
                autoFocus value={email} onChange={e=> setEmail(e.target.value)}/>
              <Button type="submit" fullWidth variant="contained" color="primary"
                className={classes.submit} onClick={onSendLink}>
                Send Link
              </Button>
              <br/><br/><br/><br/>
              <Button type="submit" fullWidth variant="contained" color="#e6ebec" onClick={onLogin}>
                Back To Login
              </Button>
              <br/><br/><br/><br/>              
            </form>
          </Grid>
        </Grid>
      </Grid>
      <LoginDialog/>
    </>
  );
}
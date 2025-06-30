import React, { useEffect, useState } from 'react';
import { Grid, Dialog, DialogContent, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import axios from 'axios';

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
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily:"'Outfit', sans-serif"
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily: "'Outfit', sans-serif",
    textAlign: "center"
  } 
}));

export default function ResetPassword(props) {
 
  const classes = useStyles();

  const [isHeightSmall, setIsHeightSmall] = useState(false)
  const [resetPassword, setResetPassword] = useState('')
  const [confirmResetPassword, setConfirmResetPassword] = useState('')
  const [loginDialogOpen, setLoginDialog] = useState(false)
  const [loginDialogContent, setLoginDialogContent] = useState('')

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
        <DialogContent align='center' >
          {loginDialogContent}
        </DialogContent>
      </Dialog>
    )
  }

  const onResetPassword = () => { 
    const postResetPassword = async() => {
      const res = await axios.post(`https://seeds.geospectrum.com.ph/resetPasswordMaster/`+
      // const res = await axios.post(`http://localhost:5000/resetPasswordMaster/`+
      props.match.params.id+"/"+props.match.params.token+"", {
          password: resetPassword,  
          password_confirmation: confirmResetPassword,
        }
      ).then(function(res) {
        if('success' in res.data) {
            alert('Password Reset successfully!')
        }
      }).catch((error) => {
        // console.log(error)
      })
    }
    postResetPassword();
    alert("Password Reset!")
  }
  
  return (
    <>
      <Grid container className={classes.container} >
        <Grid container justifyContent="center" alignItems="center"> 
          <Grid item xs={11} sm={8} md={6} lg={3} xl={3}
            className={clsx(classes.paper, {
              [classes.paperSmallHeight]: isHeightSmall,
            })}>
            <br/>
            <Typography component="h1" variant="h5" >
              Input your new password.
            </Typography>
            <br/>
            <form className={classes.form} noValidate>
              <TextField variant="outlined" margin="normal" required fullWidth label="Password" 
                name="password" autoComplete="password" autoFocus value={resetPassword}
                onChange={e=> setResetPassword(e.target.value)}/>
              <TextField variant="outlined" margin="normal" required fullWidth label="Password Confirmation"
                name="password confirmation" autoComplete="password confirmation" autoFocus value={confirmResetPassword}
                onChange={e=> setConfirmResetPassword(e.target.value)}/>
              <br/><br/><br/>
              <Button type="submit" fullWidth variant="contained" color="primary" 
                className={classes.submit} onClick={onResetPassword}>
                Reset Password
              </Button>            
            </form>
          </Grid>
        </Grid>
      </Grid>
      <LoginDialog/>
    </>
  );
}
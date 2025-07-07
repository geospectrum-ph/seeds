import * as React from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { makeStyles, Grid, Dialog, DialogContent, Button, TextField } from "@material-ui/core";

import { Formik } from "formik";
import * as yup from "yup";

import { AdminContext } from "../../../context/AdminContext";

const useStyles = makeStyles(function() {
  return ({
    pageSignIn: {
      width: "100%",
      height: "100%",

      display: "flex",
      flexFlow: "column nowrap",
      placeContent: "center center",
      placeItems: "center center",

      "& > *": {
        width: "auto",
        height: "auto",

        display: "flex",
        flex: "0 1 auto",
        flexFlow: "column nowrap",
        placeContent: "center center",
        placeItems: "center center",

        boxSizing: "border-box",
        padding: "48px",
        gap: "48px",

        background: "var(--color-white)",

        "& > *": {
          boxSizing: "border-box",
          gap: "48px",
        },

        "& > * > *": {
          display: "flex",
          flexFlow: "column nowrap",

          boxSizing: "border-box",
          gap: "12px",
        },

        "& > :nth-of-type(1)": {
          display: "flex",
          flexFlow: "row nowrap",
          placeContent: "center center",
          placeItems: "center center",

          font: "800 64px/1.25 'Outfit', sans-serif",
          color: "var(--color-black)",

          "& > *": {
            display: "flex",
            flexFlow: "row nowrap",
            placeContent: "center center",
            placeItems: "center center",

            cursor: "default",

            "& > :nth-of-type(2)": {
              "& > :nth-of-type(1)": {
                color: "var(--color-green-dark)",
              },
            },
          },
        },

        "& > :nth-of-type(2)": {
          "& .MuiTextField-root": {
            "& > *": {
              font: "400 18px/1.25 'Outfit', sans-serif",
            },
            
            "& .MuiTextFieldBase-input": {
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
          },

          "& .MuiButton-root": {
            background: "var(--color-red-dark)",

            font: "800 18px/1.25 'Outfit', sans-serif",
            color: "var(--color-white)",
          },
        },
      },
    },
  });
});

export default function SignIn() {
  const styles = useStyles();
  const history = useHistory();

    const { setLoginDetails, setSessionData, setSessionFile } = React.useContext(AdminContext);

  const form_schema = yup.object().shape({
    email_address: yup.string().email("Invalid email address.").required("Email address required"),
    password: yup.string().required("Password required."),
  });

  const initial_values = {
    email_address: "",
    password: "",
  };

  function handleLogin (values, { setSubmitting }) {
    async function fetchData () {
      await axios
        .post("https://seeds.geospectrum.com.ph/usermaster/signin", {
        // .post("http://localhost:5000/usermaster/signin", {
          "email": values.email_address, 
          "password": values.password
        })
        .then(function (response) {
          if ("success" in response.data && response.data.success) {
            setLoginDetails(response.data.message);

            localStorage.setItem("user", JSON.stringify(response.data.message));

            alert("Login Success", response.data);

            history.push("/seeds/mapportal");
          }
        })
        .catch(function (error) {
          if ("response" in error && "data" in error.response && "errors" in error.response.data) {
            if (error.response.data.errors.length === 1) {
              error.response.data.errors.forEach(function (error) {
                for (var key in error) {
                  alert(`${ key.charAt(0).toUpperCase() }${ key.slice(1) } is ${ error[key] }.`);
                }
              });
            }
            else if (error.response.data.errors.length === 2) {
              alert(`Email is ${ error.response.data.errors[0]["email"] }.`);
            }
            else {
              alert(`Email and password are ${ error.response.data.errors[0]["email"] }.`); 
            }
          }

          setSubmitting(false);
        });
    }

    fetchData();
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
    history.push('/home/seeds/mapportal')
    localStorage.setItem('user', JSON.stringify({name: "Guest", user_type:'guest'}))
  }

  const onForgotPassword = (e) => {
    history.push('/forgotPassword')
  }

  return (
    <Grid id = "page-sign-in" className = { styles.pageSignIn } container>
      <Grid item container>
        <Grid item>
          <span>
            <span>{ `Sign in to ` }</span>
            <span><span>{ "SEED" }</span><span>{ "s" }</span></span>
          </span>
        </Grid>
        <Formik
          initialValues = { initial_values } validationSchema = { form_schema }
          onSubmit = { function (values, { setSubmitting }) {
            handleLogin(values, { setSubmitting });
          }}
        >
          {
            function ({ handleChange, handleBlur, handleSubmit, isSubmitting, values, touched, errors }) {
              return (
                <Grid item container>
                  <Grid item container>
                    <TextField
                      type = "email" id = "email_address" name = "email_address" label = "Email Address"
                      value = { values.email_address } onChange = { handleChange } onBlur = { handleBlur }
                      error = { touched.email_address && Boolean(errors.email_address) } helperText = { touched.email_address && errors.email_address }
                      variant = "outlined" size = "small" required/>
                    <TextField
                      type = "password" id = "password" name = "password" label = "Password"
                      value = { values.password } onChange = { handleChange } onBlur = { handleBlur }
                      error = { touched.password && Boolean(errors.password) } helperText = { touched.password && errors.password }
                      variant = "outlined" size = "small" required/>
                  </Grid>
                  <Grid item container>
                    <Button disabled = { isSubmitting } onClick = { handleSubmit } title = "Submit">{ "Sign In" }</Button>
                    <Button title = "Submit">{ "Guest" }</Button>
                  </Grid>
                </Grid>
              );
            }
          }
        </Formik>
      </Grid>
          {/* <form className={classes.form} noValidate>
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
          </form> */}
    </Grid>
  );
}
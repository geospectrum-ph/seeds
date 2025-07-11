import * as React from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { makeStyles, Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";

import { Formik } from "formik";
import * as yup from "yup";

import { AdminContext } from "../../../context/AdminContext";
import { SEEDSContext } from "../../../context/SEEDSContext";

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
          gap: "24px",
        },

        "& > * > *": {
          display: "flex",
          flexFlow: "column nowrap",

          boxSizing: "border-box",
          gap: "12px",
        },

        "& > :nth-child(1)": {
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

            "& > :nth-child(2)": {
              "& > :nth-child(1)": {
                color: "var(--color-green-dark)",
              },
            },
          },
        },

        "& > :nth-child(2)": {
          "& > :nth-child(1)": {
            "& .MuiTextField-root": {
              "& > *": {
                font: "400 16px/1.25 'Outfit', sans-serif",
              },
              
              "& .MuiTextFieldBase-input": {
                overflow: "hidden",
                textOverflow: "ellipsis"
              },
            },
          },
          
          "& > :nth-child(2)": {
            "& .MuiButton-root": {
              background: "var(--color-red-dark)",

              font: "600 16px/1.25 'Outfit', sans-serif",
              color: "var(--color-white)",
            },

            "& .special-button": {
              display: "flex",
              flexFlow: "row nowrap",
              placeContent: "center center",
              placeItems: "center center",
              
              boxSizing: "border-box",
              padding: "12px",

              "& > a": {
                cursor: "pointer",

                font: "400 16px/1.25 'Outfit', sans-serif",
                textAlign: "center",
              },
            },
          },
        },
      },
    },
    dialog: {
      background: "hsla(0, 0%, 100%, 0.85)",

      "& .MuiDialogTitle-root": {
        boxSizing: "border-box",
        padding: "12px 48px",

        background: "var(--color-black)",
        
        textAlign: "center",

        "& .alert-modal-title": {
          font: "800 32px/1.25 'Outfit', sans-serif",
          color: "var(--color-white)",
        },
      },

      "& .MuiDialogContent-root": {
        boxSizing: "border-box",
        padding: "48px",

        textAlign: "center",
      
        "& .alert-modal-message": {
          font: "400 16px/1.25 'Outfit', sans-serif",
          color: "var(--color-black)",
        },
      },
    },
  });
});

export default function SignIn() {
  const styles = useStyles();
  const history = useHistory();

  const { setLoginDetails, setSessionData, setSessionFile } = React.useContext(AdminContext);
  const { setAppBarValue } = React.useContext(SEEDSContext);

  const [control, setControl] = React.useState(false);

  const [alert, setAlert] = React.useState({
    title: "",
    message: "",
    path: "",
  });

  function handleOpen () {
    setControl(true);
  };

  function handleClose () {
    setControl(false);

    if (alert.path && alert.path.length > 0) {
      setAppBarValue(alert.path);

      history.push(alert.path);
    }
  };

  const form_schema = yup.object().shape({
    email_address: yup.string().email("Invalid email address.").required("Email address required"),
    password: yup.string().required("Password required."),
  });

  const initial_values = {
    email_address: "",
    password: "",
  };

  function handleSignIn (values, { setSubmitting }) {
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

            setAlert({
              title: "SIGN IN SUCCESSFUL",
              message: "You have successfully signed in.",
              path: "/home/map-portal",
            });
            
            handleOpen();
          }
        })
        .catch(function (error) {
          if ("response" in error && "data" in error.response && "errors" in error.response.data) {
            if (error.response.data.errors.length === 1) {
              error.response.data.errors.forEach(function (error) {
                for (var key in error) {
                  setAlert({
                    title: "SIGN IN ERROR",
                    message: `${ key.charAt(0).toUpperCase() }${ key.slice(1) } is ${ error[key] }.`,
                    path: "",
                  });

                  handleOpen();
                }
              });
            }
            else if (error.response.data.errors.length === 2) {
              setAlert({
                title: "SIGN IN ERROR",
                message: `Email is ${ error.response.data.errors[0]["email"] }.`,
                path: "",
              });

              handleOpen();
            }
            else {
              setAlert({
                title: "SIGN IN ERROR",
                message: `Email and password are ${ error.response.data.errors[0]["email"] }.`,
                path: "",
              });

              handleOpen();
            }
          }

          setSubmitting(false);
        });
    }

    fetchData();
  }

  // const onLogin = (e) => {
  //   e.preventDefault()
  //   const fetchData = async() => {
  //     const res = await axios.post("https://seeds.geospectrum.com.ph/usermaster/signin", {
  //     // const res = await axios.post("http://localhost:5000/usermaster/signin", {
  //       "email": email, 
  //       "password": password
  //     }).then(function(res) {
  //       if ('success' in res.data) {
  //         if (res.data.success === true) { 
  //           setLoginDetails(res.data.message)
  //           const fetch1 = async() =>{
  //             const sessionData = await axios.get("https://seeds.geospectrum.com.ph/session/get?userId="
  //               // const sessionData = await axios.get("http://localhost:5000/session/get?userId="
  //               + res.data.message._id); 
  //             const fuke = await axios.get("https://seeds.geospectrum.com.ph/session/file/"
  //                             // const fuke = await axios.get("http://localhost:5000/session/file/"
  //               + res.data.message._id)
  //             if (sessionData !== null) {
  //               setSessionData(sessionData.data)
  //               setSessionFile(fuke.data)
  //             } else {
  //               const create = async() => {
  //                 const createSession = await axios.post("https://seeds.geospectrum.com.ph/session/create", {
  //                 // const createSession = await axios.post("http://localhost:5000/session/create", {
  //                 userId: res.data.message._id,
  //                   populate: {
  //                     mapName: '',
  //                     file: '',
  //                     social: false,
  //                     economic: false,
  //                     environmental: false,
  //                     demographic: false,
  //                     type: '',
  //                     keywords: [],
  //                     description: '',
  //                     language: '',
  //                     license: '',
  //                     doi: '',
  //                     attribution: '',
  //                     regions: '',
  //                     dqs: '',
  //                     restrictions: '',
  //                     constraints: '',
  //                     details: ''
  //                   },
  //                   catalogue: {    
  //                     Social: true,
  //                     Economic: true,
  //                     Environmental: true,
  //                     Demographic: true,
  //                     Vector: true,
  //                     Raster: true,
  //                     Table: true,
  //                     keywords: [],},
  //                   map: {
  //                     layers: ''
  //                   },
  //                   profile: '',
  //                   analytics: ''
  //                 }).then(()=>{
  //                   // console.log("success")
  //                 })
  //               }
  //               create()
  //               setSessionData({
  //                 userId: res.data.message._id,
  //                 populate: '',
  //                 catalogue: '',
  //                 map: '',
  //                 profile: '',
  //                 analytics: ''
            
  //               })
  //             }
  //           } 
  //           fetch1();
  //           localStorage.setItem('user', JSON.stringify(res.data.message))
  //           alert("Login Success", res.data)
  //           history.push('/seeds/mapportal')
  //         } 
  //       }
  //     }).catch((error) => {
  //       if (error.response.data.errors.length===1){
  //         error.response.data.errors.forEach((error)=> {
  //         for (var key in error) {
  //           alert(key.charAt(0).toUpperCase() + key.slice(1)+" is " +error[key]+".")
  //         }})
  //       } else if (error.response.data.errors.length===2){
  //         alert("Email is " +error.response.data.errors[0]['email']+".")
  //       } else {
  //         alert("Email and password are "+error.response.data.errors[0]['email']+".")  
  //       }     
  //     })
  //   }
  //   fetchData();
  // }

  function handleGuestSubmit () {
    const guest_object = { name: "Guest", user_type: "guest" };
    
    setAlert({
      title: "SIGN IN SUCCESSFUL",
      message: "Signed in as a guest.",
      path: "/home/map-portal",
    });

    handleOpen();

    setLoginDetails(guest_object);

    localStorage.setItem("user", JSON.stringify(guest_object));
  }

  function handlePasswordReset () {
    setAppBarValue("/password-reset");

    history.push("/password-reset");
  }

  React.useEffect(function () {  
    setAppBarValue("/sign-in");
  }, []);

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
            handleSignIn(values, { setSubmitting });
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
                    <Button disabled = { isSubmitting } onClick = { handleGuestSubmit } title = "Submit">{ "Guest" }</Button>
                    <span className = "special-button"><a disabled = { isSubmitting } onClick = { handlePasswordReset }>{ "Forgot password?" }</a></span>
                  </Grid>
                  <Dialog className = { styles.dialog } open = { control } onClick = { handleClose } onClose = { handleClose }>
                    <DialogTitle disableTypography>
                      <span className = "alert-modal-title">{ alert.title }</span>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <span className = "alert-modal-message">{ alert.message }</span>
                      </DialogContentText>
                    </DialogContent>
                  </Dialog>
                </Grid>
              );
            }
          }
        </Formik>
      </Grid>
    </Grid>
  );
}

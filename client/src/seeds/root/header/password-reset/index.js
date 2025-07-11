import * as React from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { makeStyles, Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";

import { Formik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles(function() {
  return ({
    pagePasswordReset: {
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

        "& > :nth-child(1)": {
          display: "flex",
          flexFlow: "row nowrap",
          placeContent: "center center",
          placeItems: "center center",

          "& > *": {
            display: "flex",
            flexFlow: "column nowrap",
            placeContent: "center center",
            placeItems: "center center",

            cursor: "default",

            "& > :nth-child(1)": {
              font: "800 64px/1.25 'Outfit', sans-serif",
              color: "var(--color-black)",
            },

            "& > :nth-child(2)": {
              font: "400 16px/1.25 'Outfit', sans-serif",
              color: "var(--color-black)",
            },
          },
        },

        "& > :nth-child(2)": {
          display: "flex",
          flexFlow: "column nowrap",

          boxSizing: "border-box",
          gap: "24px",

          "& .MuiTextField-root": {
            "& > *": {
              font: "400 16px/1.25 'Outfit', sans-serif",
            },
            
            "& .MuiTextFieldBase-input": {
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
          },

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

export default function PasswordReset () {
  const styles = useStyles();
  const history = useHistory();
  
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
  });

  const initial_values = {
    email_address: "",
  };
  
  function handlePasswordReset (values, { setSubmitting }) {
    async function postEmail () {
      await axios
        .post("https://seeds.geospectrum.com.ph/resetPasswordMaster/", {
        // .post("http://localhost:5000/resetPasswordMaster/", {
          "email": values.email_address
        })
        .then(function () {
          setAlert({
            title: "PASSWORD RESET SUCCESSFUL",
            message: "Password reset link sent to your email account!",
            path: "/sign-in",
          });

          handleOpen();
        })
        .catch(function () {          
          setAlert({
            title: "SIGN IN ERROR",
            message: "Email not found.",
            path: "",
          });

          handleOpen();

          setSubmitting(false);
        });
    }

    postEmail();
  }

  function handleSignIn () {
    history.push("/sign-in");
  }

  return (
    <Grid id = "page-password-reset" className = { styles.pagePasswordReset } container>
      <Grid item container>
        <Grid item>
          <span>
            <span>{ "Trouble logging in?" }</span>
            <span>{ "Enter your email and we'll send you a link to get back into your account." }</span>
          </span>
        </Grid>
        <Formik
          initialValues = { initial_values } validationSchema = { form_schema }
          onSubmit = { function (values, { setSubmitting }) {
            handlePasswordReset(values, { setSubmitting });
          }}
        >
          {
            function ({ handleChange, handleBlur, handleSubmit, isSubmitting, values, touched, errors }) {
              return (
                <Grid item container>
                  <Grid item>
                    <TextField
                      type = "email" id = "email_address" name = "email_address" label = "Email Address"
                      value = { values.email_address } onChange = { handleChange } onBlur = { handleBlur }
                      error = { touched.email_address && Boolean(errors.email_address) } helperText = { touched.email_address && errors.email_address }
                      variant = "outlined" size = "small" required/>
                  </Grid>
                  <Grid item>
                    <Button disabled = { isSubmitting } onClick = { handleSubmit } title = "Submit">{ "Send a link" }</Button>
                    <span className = "special-button"><a disabled = { isSubmitting } onClick = { handleSignIn }>{ "Sign in instead" }</a></span>
                  </Grid>
                  <Dialog className = { styles.dialog } open = { control } onClick = { handleClose } onClose = { handleClose }>
                    <DialogTitle>
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

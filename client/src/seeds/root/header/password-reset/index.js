import { useHistory } from "react-router-dom";

import axios from "axios";

import { makeStyles, Grid, Button, TextField } from "@material-ui/core";

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

        "& > :nth-of-type(1)": {
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

            "& > :nth-of-type(1)": {
              font: "800 64px/1.25 'Outfit', sans-serif",
              color: "var(--color-black)",
            },

            "& > :nth-of-type(2)": {
              font: "400 18px/1.25 'Outfit', sans-serif",
              color: "var(--color-black)",
            },
          },
        },

        "& > :nth-of-type(2)": {
          display: "flex",
          flexFlow: "column nowrap",

          boxSizing: "border-box",
          gap: "24px",

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

          "& .special-button": {
            display: "flex",
            flexFlow: "row nowrap",
            placeContent: "center center",
            placeItems: "center center",
            
            boxSizing: "border-box",
            padding: "12px",

            "& > a": {
              cursor: "pointer",

              font: "400 18px/1.25 'Outfit', sans-serif",
              textAlign: "center",
            },
          },
        },
      },
    },
  });
});

export default function PasswordReset () {
  const styles = useStyles();
  const history = useHistory();

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
          alert("Password reset link sent to your email account!");

          history.push("/sign-in");
        })
        .catch(function () {
          alert("Email not found.");

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
                </Grid>
              );
            }
          }
        </Formik>
      </Grid>
    </Grid>
  );
}

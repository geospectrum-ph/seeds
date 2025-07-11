import * as React from "react";

import { makeStyles, Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";

import { Formik } from "formik";
import * as yup from "yup";

import * as leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import { SEEDSContext } from "../../../context/SEEDSContext";

const useStyles = makeStyles(function () {
  return ({
    pageContactUs: {
      width: "100%",
      height: "200%",
      
      display: "flex",
      flexFlow: "column nowrap",

      background: "var(--color-white)",

      "& > :nth-child(1)": {
        width: "100%",
        height: "100%",

        "& > *": {
          width: "100%",
          height: "100%",   
          
          display: "flex",
          flexFlow: "row nowrap",

          boxSizing: "border-box",
          padding: "48px",
          gap: "48px",

          "& > :nth-child(1)": {
            flex: "0 1 auto",

            "& > *": {
              width: "100%",
              height: "100%",
              
              display: "flex",
              flexFlow: "column nowrap",

              "& > :nth-child(1)": {
                font: "800 64px/1.25 'Outfit', sans-serif",
                color: "var(--color-black)",
              },
              
              "& > :nth-child(2)": {
                font: "400 32px/1.25 'Outfit', sans-serif",
                color: "var(--color-black)",
              },
            },
          },

          "& > :nth-child(2)": {
            display: "flex",
            flex: "1 1 auto",
            flexFlow: "column nowrap",
            
            boxSizing: "border-box",
            gap: "12px",

            "& .MuiTextField-root": {
              "& > *": {
                font: "400 16px/1.25 'Outfit', sans-serif",
              },
              
              "& .MuiTextFieldBase-input": {
                overflow: "hidden",
                textOverflow: "ellipsis"
              },
            },

            "& > :nth-child(1), & > :nth-child(2), & > :nth-child(3)": {
              display: "flex",
              flex: "0 1 auto",
              flexFlow: "row nowrap",

              boxSizing: "border-box",
              gap: "12px",

              "& > *": {
                flex: "1 1 auto",
              },
            },

            "& > :nth-child(4)": {
              display: "flex",
              flex: "1 1 auto",
              flexFlow: "column nowrap",

              boxSizing: "border-box",
              gap: "12px",

              "& > :nth-child(1), & > :nth-child(3)": {
                flex: "0 1 auto",
              },

              "& > :nth-child(2)": {
                flex: "1 1 auto",
              },

              "& .MuiButton-root": {
                background: "var(--color-red-dark)",

                font: "600 16px/1.25 'Outfit', sans-serif",
                color: "var(--color-white)",
              },
            },
          },
        },
      },
      
      "& > :nth-child(2)": {
        width: "100%",
        height: "100%",

        display: "flex",
        flexFlow: "column nowrap",

        "& > :nth-child(1)": {
          flex: "1 1 auto",

          "& #map-contact-us": {
            width: "100%",
            height: "100%",

            filter: "grayscale(100%) brightness(100%)",

            "& .leaflet-popup-content": {
              font: "400 16px/1.25 'Outfit', sans-serif",
            },
          },
        },

        "& > :nth-child(2)": {
          display: "flex",
          flex: "0 1 auto",
          flexFlow: "column nowrap",

          boxSizing: "border-box",
          padding: "48px",
          gap: "12px",

          "& > * > :nth-child(1)": {
            display: "flex",
            flex: "0 1 auto",
            flexFlow: "column nowrap",

            font: "400 16px/1.25 'Outfit', sans-serif",

            "& > :nth-child(1)": {
              font: "800 16px/1.25 'Outfit', sans-serif",
            },

            "& a": {
              font: "400 16px/1.25 'Outfit', sans-serif",
              color: "var(--color-black)",

              "&:hover": {
                color: "var(--color-green-dark)",
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

function ContactUsForm ({ styles }) {
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
  };

  const form_schema = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    email_address: yup.string().email("Invalid email address.").required("Email address required"),
    contact_number: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid contact number."),
    affiliation: yup.string(),
    industry: yup.string(),
    subject: yup.string().required("Subject required."),
    message: yup.string().required("Message required."),
  });

  const initial_values = {
    first_name: "",
    last_name: "",
    email_address: "",
    contact_number: "",
    affiliation: "",
    industry: "",
    subject: "",
    message: "",
  };

  function sendMessage (values) {
    // console.log(values);
    
    setAlert({
      title: "SUBMISSION SUCCESSFUL",
      message: "Thank you for the feedback!",
      path: "",
    });
    
    handleOpen();
  }

  return (
    <Grid item container>
      <Grid item>
        <span>
          <span>{ "Got a Question?" }</span>
          <span>{ "Send us a Message!" }</span>
        </span>
      </Grid>
      <Formik initialValues = { initial_values } validationSchema = { form_schema } onSubmit = { function (values) { sendMessage(values); } }>
        {
          function ({ handleChange, handleBlur, handleSubmit, values, touched, errors }) {
            return (
              <Grid>
                <Grid item container>
                  <TextField
                    id = "first_name" name = "first_name" label = "First Name"
                    value = { values.first_name } onChange = { handleChange } onBlur = { handleBlur }
                    error = { touched.first_name && Boolean(errors.first_name) } helperText = { touched.first_name && errors.first_name }
                    variant = "outlined" size = "small"/>
                  <TextField
                    id = "last_name" name = "last_name" label = "Last Name"
                    value = { values.last_name } onChange = { handleChange } onBlur = { handleBlur }
                    error = { touched.last_name && Boolean(errors.last_name) } helperText = { touched.last_name && errors.last_name }
                    variant = "outlined" size = "small"/>
                </Grid>
                <Grid item container>
                  <TextField
                    type = "email" id = "email_address" name = "email_address" label = "Email Address"
                    value = { values.email_address } onChange = { handleChange } onBlur = { handleBlur }
                    error = { touched.email_address && Boolean(errors.email_address) } helperText = { touched.email_address && errors.email_address }
                    variant = "outlined" size = "small" required/>
                  <TextField
                    type = "tel"  id = "contact_number" name = "contact_number" label = "Contact Number"
                    value = { values.contact_number } onChange = { handleChange } onBlur = { handleBlur }
                    error = { touched.contact_number && Boolean(errors.contact_number) } helperText = { touched.contact_number && errors.contact_number }
                    variant = "outlined" size = "small"/>
                </Grid>
                <Grid item container>
                  <TextField
                    id = "affiliation" name = "affiliation" label = "Affiliation"
                    value = { values.affiliation } onChange = { handleChange } onBlur = { handleBlur }
                    error = { touched.affiliation && Boolean(errors.affiliation) } helperText = { touched.affiliation && errors.affiliation }
                    variant = "outlined" size = "small"/>
                  <TextField
                    id = "industry" name = "industry" label = "Industry"
                    value = { values.industry } onChange = { handleChange } onBlur = { handleBlur }
                    error = { touched.industry && Boolean(errors.industry) } helperText = { touched.industry && errors.industry }
                    variant = "outlined" size = "small"/>
                </Grid>
                <Grid item container>
                  <TextField
                    id = "subject" name = "subject" label = "Subject"
                    value = { values.subject } onChange = { handleChange } onBlur = { handleBlur }
                    error = { touched.subject && Boolean(errors.subject) } helperText = { touched.subject && errors.subject }
                    variant = "outlined" size = "small" required/>
                  <TextField
                    id = "message" name = "message" label = "Message"
                    value = { values.message } onChange = { handleChange } onBlur = { handleBlur }
                    error = { touched.message && Boolean(errors.message) } helperText = { touched.message && errors.message }
                    multiline minRows = { 6 } variant = "outlined" size = "small" required/>
                  <Button onClick = { handleSubmit } title = "Submit">{ "Send your message!" }</Button>
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
  );
}

function ContactUsMap () {
  const mapContactUs = React.useRef(null);

  React.useEffect(() => {
    mapContactUs.current = leaflet.map("map-contact-us", {
      center: [14.582, 121.059],
      zoom: 14,      
      zoomControl: false,
    });

    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: `&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
      })
      .addTo(mapContactUs.current);

    leaflet
      .marker([14.582, 121.059], {
        opacity: 0.00,
      })
      .addTo(mapContactUs.current)
      .bindPopup(`<b><a href = "https://www.geospectrum.com.ph/" target = "_blank">GEOSPECTRUM</a></b><br />is here!`)
      .openPopup();
  }, []);

  return (
    <div id = "map-contact-us"/>
  );
}

export default function ContactUs() {
  const styles = useStyles();
  
  const { setAppBarValue } = React.useContext(SEEDSContext);
  
  React.useEffect(function () {  
    setAppBarValue("/contact-us");
  }, []);

  return (
    <Grid id = "page-contact-us" className = { styles.pageContactUs } container>
      <Grid item container>
        <ContactUsForm styles = { styles }/>
      </Grid>
      <Grid item container>
        <Grid item container>
          <ContactUsMap/>
        </Grid>
        <Grid item>
          <Grid item>
            <span>
              <span>{ "Address" }</span>
              <span>{ "Geospectrum Analytics Services, Inc." }</span>
              <span>{ "Unit 804, Linden Suites Tower 1, 37 San Miguel Avenue, Ortigas Center, Pasig City, Philippines" }</span>
            </span>
          </Grid>
          <Grid item>
            <span>
              <span>{ "Website" }</span>
              <span><a href = "mailto:info@geospectrum.com.ph">{ "info@geospectrum.com.ph" }</a></span>
            </span>
          </Grid>
          <Grid item>
            <span>
              <span>{ "Phone" }</span>
              <span>
                <ul>
                  <li>{ "+63917-7915536" }</li>
                  <li>{ "+63920-9113418" }</li>
                  <li>{ "+(632)-637-8026" }</li>
                </ul>
              </span>
            </span>
          </Grid>
          <Grid item>
            <span>
              <span>{ "Website" }</span>
              <span><a href = "https://www.geospectrum.com.ph/">{ "GEOSPECTRUM" }</a></span>
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
import React from 'react';
import { Typography, Paper, Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTypography-h4': {
      fontFamily: "'Outfit', sans-serif"
    }, '& .MuiTypography-h6': {
      fontFamily: "'Outfit', sans-serif"
    }
  }, heroContent: {
    backgroundColor: theme.palette.background.paper,
  }  
}));

export default function TermsOfUse() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.heroContent} >
          <Container maxWidth="lg">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Privacy Policy
            </Typography>
            <Typography variant="subtitle2" align="center" color="textPrimary" gutterBottom>
              Last updated: March 23, 2023
            </Typography>
            <br/>
            <Paper style={{ paddingLeft: 20, paddingRight: 20}} elevation={3}>
              <br/>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph>
              This Privacy Policy describes how Geospectrum Analytics Services Inc. and its associates 
              (“GASI”, “we”, “us”, “our”) collect, use, and disclose information from and about you when 
              you use or access our application Social Economic Environmental and Demographic Systems 
              for LGU (“SEEDs for LGU”, “application”, “service”).
              <br/>
              <br/>
              By using or accessing the application in any manner, you acknowledge that you have read and 
              accept the practices and policies outlined in this Privacy Policy.
              <br/>
              <br/>
              Remember that your use of GASI’s service is always subject to the Terms of Use, which 
              incorporate this Privacy Policy. Any terms we use in this Privacy Policy without defining 
              them have the definitions given to them in the Terms of Use
              </Typography>
              <br/>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              WHAT DOES THIS PRIVACY POLICY COVER?
              </Typography>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph >
              <div style={{marginLeft: 40, marginRight: 40}}>
              This Privacy Policy covers our treatment of information that we collect when you use or access 
              the Services. This information may include "Personal Information", meaning information reasonably 
              capable of being associated with you (and in some jurisdictions, your household). This Privacy 
              Policy does not cover the practices of companies we don’t own or control or people that we don’t 
              manage.
              </div>
              </Typography>
              <br/>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              WHAT INFORMATION DOES GASI COLLECT FOR SEEDS FOR LGU?
              </Typography>
              <div style={{marginLeft: 40, marginRight: 40}}>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph>
              <b>Personal Data</b>
              <br/>
              Before using our application, we may ask you to provide us with certain personally identifiable 
              information that can be used to contact or identify you. Personally identifiable information 
              may include, but is not limited to:
              <br/>
              {/* <li></li> */}
              &emsp;&emsp;•	Email address <br/>
              &emsp;&emsp;•	First name and last name <br/>
              &emsp;&emsp;•	Usage Data <br/>
              <br/>
              <b>Usage Data</b><br/>
              Usage Data is collected automatically when using the application.
              <br/><br/>
              Usage Data may include information such as your device's Internet Protocol address 
              (e.g., IP address), browser type, browser version, the time and date of your visit on our page, 
              the time spent on those pages, unique device identifiers and other diagnostic data.
              <br/><br/>
              When you access the application by or through a mobile device, we may collect certain information 
              automatically, including, but not limited to, the type of mobile device you use, your mobile 
              device unique ID, the IP address of your mobile device, your mobile operating system, the type of 
              mobile internet browser you use, unique device identifiers and other diagnostic data.
              <br/><br/>
              We may also collect information that your browser sends whenever you visit our application or 
              when you access the application by or through a mobile device.
              <br/><br/>
              </Typography>
              </div>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              HOW DOES GASI USE MY INFORMATION ON SEEDS FOR LGU?
              </Typography>
              <div style={{marginLeft: 40, marginRight: 40}}>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph>
              GASI may use your Personal Data for the following purposes:
              <br/>
              <div style={{marginLeft: 40, marginRight: 40}}>
              •	<b>To provide and maintain our application:</b> including to monitor the usage of our 
              application.<br/>
              •	<b>To manage your account:</b> to manage your registration as a user of the application. 
              The Personal Data you provide can give you access to different functionalities of the application 
              that are available to you as a registered user.<br/>
              •	<b>To contact you:</b> to contact you by email, or other equivalent forms of electronic 
              communication, such as a mobile application's push notifications regarding updates or informative 
              communications related to the functionalities, products or contracted services, including the 
              security updates, when necessary or reasonable for their implementation.<br/>
              •	<b>To provide:</b> with news, special offers and general information about other goods, 
              services and events which we offer that are like those that you have already purchased or enquired 
              about unless you have opted not to receive such information.<br/>
              •	<b>To manage your requests:</b> to attend and manage your requests to us.<br/>
              •	<b>To prevent fraud:</b> for your safety and security while using the Application<br/>
              •	<b>To ensure compliance:</b> with our Terms of Use and the terms of any contracts with you<br/>
              •	<b>For other purposes:</b> we may use your information for other purposes, such as data 
              analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and 
              to evaluate and improve our application, products, services, marketing and your experience.
              <br/><br/>
              </div>
              We may combine information that we collect from you through the Application with information that 
              we obtain from third parties and information derived from any other products or services we provide.
              <br/><br/>
              <b>Aggregate/de-identified/anonymized information</b>
              <br/><br/>
              <div style={{marginLeft: 40, marginRight: 40}}>
              We may aggregate, de-identify, or anonymize your information such that it is no longer reasonably 
              capable of being associated with you and use such aggregated or anonymized information for any purpose.
              </div>
              </Typography>
              </div>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              WILL GASI DISCLOSE MY INFORMATION?
              </Typography>
              <div style={{marginLeft: 40, marginRight: 40}}>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph>
              We may share Your personal information in the following situations:
              <br/>
              <div style={{marginLeft: 40, marginRight: 40}}>
              •	<b>With Service Providers:</b> We may share your personal information with our Service Providers 
              to monitor and analyze the use of our application, to contact you.<br/>
              •	<b>With Affiliates:</b> We may share Your information with our affiliates, in which case we will 
              require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any 
              other subsidiaries, joint venture partners or other companies that we control or that are under common 
              control with us.<br/>
              •	<b>With business partners:</b> We may share your information with our business partners to offer 
              you certain products, services or promotions.<br/>
              •	<b>With other users:</b> when you share personal information or otherwise interact in public 
              areas with other users, such information may be viewed by all users and may be publicly distributed 
              outside.<br/>
              •	<b>With your consent:</b> We may disclose your personal information for any other purpose with 
              your consent.<br/><br/>
              </div>
              </Typography>
              </div>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              WILL GASI DISCLOSE MY INFORMATION?
              </Typography>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph >
              <div style={{marginLeft: 40, marginRight: 40}}>
              The security of your Personal Data is important to ys but remember that no method of transmission 
              over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially 
              acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              <br/><br/>
              </div>
              </Typography>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              WHAT ARE MY RIGHTS AND CHOICES?
              </Typography>
              <div style={{marginLeft: 40, marginRight: 40}}>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph>
              <b>Transfer of Your Personal Data</b>
              <div style={{marginLeft: 40, marginRight: 40}}>
              Your information, including Personal Data, is processed at the Company's operating offices and in any 
              other places where the parties involved in the processing are located. It means that this information 
              may be transferred to — and maintained on — computers located outside of Your state, province, country 
              or other governmental jurisdiction where the data protection laws may differ than those from Your 
              jurisdiction.<br/><br/>
              Your consent to this Privacy Policy followed by your submission of such information represents your 
              agreement to that transfer.<br/><br/>
              The company will take all steps reasonably necessary to ensure that your data is treated securely and 
              in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an 
              organization or a country unless there are adequate controls in place including the security of your 
              data and other personal information.<br/><br/>
              <b>Transfer of Your Personal Data</b>
              <div style={{marginLeft: 40, marginRight: 40}}>
              If the company is involved in a merger, acquisition or asset sale, your Personal Data may be 
              transferred. We will provide notice before your Personal Data is transferred and becomes subject to 
              a different Privacy Policy.<br/><br/>
              </div>
              <b>Law enforcement</b>
              <div style={{marginLeft: 40, marginRight: 40}}>
              Under certain circumstances, the company may be required to disclose your Personal Data if required 
              to do so by law or in response to valid requests by public authorities (e.g., a court or a government 
              agency).<br/><br/>
              </div>
              <b>Other legal requirements</b>
              <div style={{marginLeft: 40, marginRight: 40}}>
              The company may disclose your Personal Data in the good faith belief that such action is necessary to:
              <br/>
              <div style={{marginLeft: 40, marginRight: 40}}>
              •	Comply with a legal obligation.<br/>
              •	Protect and defend the rights or property of the company.<br/>
              •	Prevent or investigate possible wrongdoing in connection with the application.<br/>
              •	Protect the personal safety of users of the application or the public.<br/>
              •	Protect against legal liability.
              </div>
              <br/>
              </div>
              </div>
              <b>Delete Your Personal Data</b>
              <div style={{marginLeft: 40, marginRight: 40}}>
              You have the right to delete or request that We assist in deleting the Personal Data that We have 
              collected about You.
              Our Service may give You the ability to delete certain information about You from within the Service.
              You may update, amend, or delete Your information at any time by signing into Your Account, if you 
              have one, and visiting the account settings section that allows you to manage Your personal information. 
              You may also contact Us to request access to, correct, or delete any personal information that You have 
              provided to Us.
              Please note, however, that We may need to retain certain information when we have a legal obligation 
              or lawful basis to do so.

              </div>
              </Typography>
              </div>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              DATA RETENTION
              </Typography>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph >
              <div style={{marginLeft: 40, marginRight: 40}}>
              The Company will retain your Personal Data only for as long as is necessary for the purposes set out 
              in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply 
              with our legal obligations (for example, if we are required to retain your data to comply with 
              applicable laws), resolve disputes, and enforce our legal agreements and policies. <br/><br/>
              The company will also retain Usage Data for internal analysis purposes. Usage Data is generally 
              retained for a shorter period, except when this data is used to strengthen the security or to improve 
              the functionality of our application, or we are legally obligated to retain this data for longer time 
              periods.

              </div>
              </Typography>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              MINORS
              </Typography>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph >
              <div style={{marginLeft: 40, marginRight: 40}}>
              Our application does not address anyone under the age of 13. We do not knowingly collect personally 
              identifiable information from anyone under the age of 13. If you are a parent or guardian and you 
              are aware that your child has provided us with Personal Data, please contact us. If we become aware 
              that we have collected Personal Data from anyone under the age of 13 without verification of parental 
              consent, we take steps to remove that information from our servers.<br/><br/>
              If we need to rely on consent as a legal basis for processing your information and your country 
              requires consent from a parent, we may require your parent's consent before we collect and use that 
              information.
              </div>
              </Typography>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              CHANGES TO THIS PRIVACY POLICY
              </Typography>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph >
              <div style={{marginLeft: 40, marginRight: 40}}>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page.<br/><br/>
              We will let you know via email and/or a prominent notice on our application, prior to the change 
              becoming effective and update the "Last updated" date at the top of this Privacy Policy.<br/><br/>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy 
              Policy are effective when they are posted on this page.
              </div>
              </Typography>
              <Typography variant="h6" align="justify" color="textSecondary" paragraph>
              HOW TO CONTACT US
              </Typography>
              <Typography variant="body1" align="justify" color="textSecondary" paragraph >
              <div style={{marginLeft: 40, marginRight: 40}}>
              If you have any questions about this Privacy Policy, you can contact us:<br/>
              <div style={{marginLeft: 40, marginRight: 40}}>
              •	Via email: it.support@geospectrum.com.ph<br/>
              •	By visiting this page on our website: https://www.geospectrum.com.ph/gms/contact-us/
              </div>
              </div>
              </Typography>
              <br/><br/>
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
}
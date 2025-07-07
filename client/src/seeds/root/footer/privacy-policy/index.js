import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(function () {
  return ({
    pagePrivacyPolicy: {
      width: "100%",
      height: "100%",

      display: "flex",
      flexFlow: "row nowrap",

      boxSizing: "border-box",
      margin: "0",
      padding: "48px",
      gap: "48px",

      background: "var(--color-white)",

      "& > :nth-of-type(1)": {
        font: "800 72px/1 'Outfit', sans-serif",
        color: "var(--color-black)",

        "& > *": {
          width: "270px",
          
          whiteSpace: "nowrap",
          overflow: "hidden",

          display: "flex",
          flexFlow: "column nowrap",
        },
      },
      
      "& > :nth-of-type(2)": {
        overflow: "hidden auto",

        font: "400 18px/1.25 'Outfit', sans-serif",
        color: "var(--color-black)",

        "& > *": {
          width: "auto",
          height: "0",

          "& a": {
            font: "800 18px/1.25 'Outfit', sans-serif",
            color: "var(--color-black)",

            "&:hover": {
              color: "var(--color-green-dark)",
            },
          },

          "& .text-subtitle": {
            font: "800 18px/1.25 'Outfit', sans-serif",
            textTransform: "uppercase",
            color: "var(--color-black)",
          },
        },
      },
    },
  });
});

export default function PrivacyPolicy() {
  const styles = useStyles();

  return (
    <Grid id = "page-privacy-policy" className = { styles.pagePrivacyPolicy } container>
      <Grid item>
        <div>
          <span>{ "Privacy" }</span>
          <span>{ "Policy" }</span>
        </div>
      </Grid>
      <Grid item>
        <div>
          <span className = "text-subtitle">{ `Version 1.0 | Effective Date: 04 July 2025` }</span>
          <br/>
          <br/>
          <span>{ `This Privacy Policy outlines how Geospectrum Analytics Services, Inc. (“GASI”, “we”, “us”, or “our”) collects, uses, discloses, and protects the personal and usage information of individuals (“users”, “you”, or “your”) who access or use the SEEDs web-based GIS application (the “application” or “SEEDs”).` }</span>  
          <br/>
          <br/>
          <span>{ `Your use of the application constitutes your consent to the practices described herein. This policy forms an integral part of the SEEDs `}<a href = "/terms-of-use">{ "Terms of Use" }</a></span>         
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Personal Data` }</span>
          <br/>
          <br/>
          <span>{ `“Personal Data” refers to any information that identifies or can be used to identify an individual, either directly or indirectly. GASI may collect the following categories of personal data:`}</span>
          <ul>
            <li><b>{ `Identity Data:` }</b>&ensp;{ `Full name, email address, organization or agency affiliation;` }</li>
            <li><b>{ `Account Credentials:` }</b>&ensp;{ `Username, password, profile settings;` }</li>
            <li><b>{ `Usage Data:` }</b>&ensp;{ `IP address, browser type and version, device information, access times, visited pages, session duration, and diagnostic logs;` }</li>
            <li><b>{ `Communication Data:` }</b>&ensp;{ `Messages, requests, or feedback submitted via forms, email, or chat tools;` }</li>
            <li><b>{ `Geolocation Data:` }</b>&ensp;{ `Approximate location derived from IP address or user-enabled browser settings (if applicable).` }</li>
          </ul>
          <span>{ `This data may be collected directly from the user or automatically through interactions with the application.`}</span> 
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Purpose of Data Collection` }</span>       
          <br/>
          <br/>
          <span>{ `We collect and process personal data for the following purposes:` }</span>
          <ul>
            <li>{ `To enable secure access to the application;` }</li>
            <li>{ `To manage user accounts and roles;` }</li>
            <li>{ `To personalize the user experience and improve navigation;` }</li>
            <li>{ `To monitor system performance, detect anomalies, and troubleshoot issues;` }</li>
            <li>{ `To analyze usage patterns and improve application functionality;` }</li>
            <li>{ `To provide system updates, announcements, or service-related notifications;` }</li>
            <li>{ `To fulfill our legal and contractual obligations;` }</li>
            <li>{ `To safeguard the integrity, confidentiality, and availability of our systems and users.` }</li>
          </ul>
          <span>{ `Where required by law, GASI will seek your consent prior to collecting or processing certain data.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Sharing and Disclosure` }</span>
          <br/>
          <br/>
          <span>{ `GASI may disclose your personal data to third parties under the following circumstances:` }</span>
          <ul>
            <li><b>{ `Service Providers:` }</b>&ensp;{ `Entities that assist us in system hosting, analytics, communications, or customer support, under strict confidentiality agreements;` }</li>
            <li><b>{ `Affiliates and Partners:` }</b>&ensp;{ `For system integration or shared research and planning objectives;` }</li>
            <li><b>{ `Authorities:` }</b>&ensp;{ `When required by law, legal process, or government request;` }</li>
            <li><b>{ `Business Transactions:` }</b>&ensp;{ `In connection with a corporate restructuring, merger, acquisition, or asset transfer;` }</li>
            <li><b>{ `With Your Consent:` }</b>&ensp;{ `For any other purpose disclosed to you at the time of collection.` }</li>
          </ul>
          <span>{ `We do not sell or lease your personal data for marketing purposes.` }</span>        
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Data Transfers` }</span>
          <br/>
          <br/>
          <span>{ `Your personal data may be stored or processed on servers located outside your jurisdiction. By using SEEDs, you acknowledge and consent to such cross-border data transfers, subject to appropriate safeguards in compliance with data protection regulations.` }</span>     
          <br/>    
          <br/>
          <span className = "text-subtitle">{ `Retention of Data` }</span>
          <br/>
          <br/>
          <span>{ `We retain personal and usage data only for as long as necessary to fulfill the purposes outlined in this Policy or as required by law. The Company will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. The company will also retain Usage Data for internal analysis purposes. Usage data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our application, or we are legally obligated to retain this data for longer time periods. Once data is no longer needed, it is securely deleted or anonymized.` }</span>     
          <br/>    
          <br/>
          <span className = "text-subtitle">{ `Security Measures` }</span>
          <br/>
          <br/>
          <span>{ `GASI implements reasonable administrative, technical, and physical safeguards to protect your data from unauthorized access, alteration, or disclosure. However, no system is completely secure, and users are urged to protect their credentials and report any suspicious activity.` }</span>     
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Data Subject Rights` }</span>    
          <br/>    
          <br/>
          <span>{ `In accordance with applicable data protection laws, users may:` }</span>
          <ul>
            <li>{ `Request access to their personal data;` }</li>
            <li>{ `Request correction of inaccurate or outdated data;` }</li>
            <li>{ `Request deletion of personal data, subject to legal retention requirements;` }</li>
            <li>{ `Withdraw previously granted consent, where applicable;` }</li>
            <li>{ `Object to certain processing activities.` }</li>
          </ul>
          <span>{ `To exercise these rights, contact: ` }<a href = "mailto:info@geospectrum.com.ph">{ "info@geospectrum.com.ph" }</a></span>     
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Data Collected from Persons Under the Age of Eligibility for Consent` }</span>    
          <br/>    
          <br/>
          <span>{ `The SEEDs application is not intended for individuals under the age of 13. We do not knowingly collect personal information from minors. If such data is inadvertently collected, it will be promptly removed upon discovery or notification.` }</span>
          <br/>    
          <br/>
          <span className = "text-subtitle">{ `Changes to the Privacy Policy` }</span>    
          <br/>    
          <br/>
          <span>{ `GASI reserves the right to amend this Privacy Policy at any time. Significant changes will be communicated via the application or email notification. Continued use of SEEDs after such changes constitutes acceptance of the updated Policy.` }</span>
          <br/>
          <br/>
          <br/>
          <br/>
          <span>{ `For questions, clarifications, or support regarding the Privacy Policy, contact us at:` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Geospectrum Analytics Services, Inc.` }</span>
          <br/>
          <span>{ `Unit 804, Linden Suites Tower 1, 37 San Miguel Avenue, Ortigas Center, Pasig City, Philippines` }</span>
          <ul>
            <li><b>{ `Email:` }</b>&ensp;<a href = "mailto:info@geospectrum.com.ph">{ "info@geospectrum.com.ph" }</a></li>
            <li><b>{ `Phone:` }</b>&ensp;{ `+63917-7915536 | +63920-9113418 | +(632)-8637-8026` }</li>
            <li><b>{ `Website:` }</b>&ensp;<a href = "https://www.geospectrum.com.ph/">{ "GEOSPECTRUM" }</a></li>
          </ul>
          <br/>
          <br/>
      </div>
      </Grid>
    </Grid>
  );
}

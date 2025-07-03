import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(function () {
  return ({
    pageTermsOfUse: {
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
        flex: "0 1 auto",

        font: "800 72px/1 'Outfit', sans-serif",
        color: "var(--color-black)",
      },
      
      "& > :nth-of-type(2)": {
        overflow: "hidden auto",

        flex: "1 1 auto",

        font: "500 24px/1 'Outfit', sans-serif",
        color: "var(--color-black)",

        "& > *": {
          width: "auto",
          height: "0",
        },
      },
    },
  });
});

export default function PrivacyPolicy() {
  const styles = useStyles();

  return (
    <Grid id = "page-terms-of-use" className = { styles.pageTermsOfUse } container>
      <Grid item>
        <span>{ "Privacy Policy" }</span>
      </Grid>
      <Grid item>
          <div>
            <span>
              { `This Privacy Policy describes how Geospectrum Analytics Services Inc. and its associates (“GASI”, “we”, “us”, “our”) collect, use, and disclose information from and about you when you use or access our application Social Economic Environmental and Demographic Systems for LGU (“SEEDs for LGU”, “application”, “service”).` }
            </span>
            <br/>
            <br/>
            <span>
              { `By using or accessing the application in any manner, you acknowledge that you have read and accept the practices and policies outlined in this Privacy Policy.` }
            </span>              
            <br/>
            <br/>
            <span>
              { `Remember that your use of GASI's service is always subject to the Terms of Use, which incorporate this Privacy Policy. Any terms we use in this Privacy Policy without defining them have the definitions given to them in the Terms of Use.` }
            </span>      
            <br/>
            <br/>
            <span>
              { `WHAT DOES THIS PRIVACY POLICY COVER?` }
            </span>      
            <br/>
            <br/>
            <span>
              { `This Privacy Policy covers our treatment of information that we collect when you use or access the Services. This information may include "Personal Information", meaning information reasonably capable of being associated with you (and in some jurisdictions, your household). This Privacy Policy does not cover the practices of companies we don't own or control or people that we don't manage.` }
            </span>        
            <br/>
            <br/>
            <span>
              { `WHAT INFORMATION DOES GASI COLLECT FOR SEEDS FOR LGU?` }
            </span>        
            <br/>
            <br/>
            <span>
              { `Before using our application, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:` }
            </span>  
            <br/>
            <br/>
            <span>&emsp;&emsp;{ `•	Email Address` }</span>
            <br/>
            <span>&emsp;&emsp;{ `•	First Name and Last Name` }</span>
            <br/>
            <span>&emsp;&emsp;{ `•	Usage Data` }</span>
            <br/>
            <br/>
            <span><b>{ `Personal Data` }</b></span>
            <br/>
            <br/>
            <span>
              { `` }
            </span>        
            <br/>
            <br/>
            <span>
              { `` }
            </span>        
            <br/>
            <br/>
            <span>
              { `` }
            </span>        
            <br/>
            <br/>
            <span>
              { `` }
            </span>        
            <br/>
            <br/>
            <span>
              { `` }
            </span>        
            <br/>
            <br/>
            <span>
              { `` }
            </span>  
          {`
              


              <br/>
              
              
              <br/>
              

              <br/>
              

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
              HOW DOES GASI USE MY INFORMATION ON SEEDS FOR LGU?
              GASI may use your Personal Data for the following purposes:
              <br/>
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
              We may combine information that we collect from you through the Application with information that 
              we obtain from third parties and information derived from any other products or services we provide.
              <br/><br/>
              <b>Aggregate/de-identified/anonymized information</b>
              <br/><br/>
              We may aggregate, de-identify, or anonymize your information such that it is no longer reasonably 
              capable of being associated with you and use such aggregated or anonymized information for any purpose.
              WILL GASI DISCLOSE MY INFORMATION?
              We may share Your personal information in the following situations:
              <br/>
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

              WILL GASI DISCLOSE MY INFORMATION?

              The security of your Personal Data is important to ys but remember that no method of transmission 
              over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially 
              acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              <br/><br/>
              WHAT ARE MY RIGHTS AND CHOICES?
              <b>Transfer of Your Personal Data</b>
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
              If the company is involved in a merger, acquisition or asset sale, your Personal Data may be 
              transferred. We will provide notice before your Personal Data is transferred and becomes subject to 
              a different Privacy Policy.<br/><br/>
              <b>Law enforcement</b>
              Under certain circumstances, the company may be required to disclose your Personal Data if required 
              to do so by law or in response to valid requests by public authorities (e.g., a court or a government 
              agency).<br/><br/>
              <b>Other legal requirements</b>
              The company may disclose your Personal Data in the good faith belief that such action is necessary to:
              <br/>
              •	Comply with a legal obligation.<br/>
              •	Protect and defend the rights or property of the company.<br/>
              •	Prevent or investigate possible wrongdoing in connection with the application.<br/>
              •	Protect the personal safety of users of the application or the public.<br/>
              •	Protect against legal liability.
              <br/>
              <b>Delete Your Personal Data</b>
              You have the right to delete or request that We assist in deleting the Personal Data that We have 
              collected about You.
              Our Service may give You the ability to delete certain information about You from within the Service.
              You may update, amend, or delete Your information at any time by signing into Your Account, if you 
              have one, and visiting the account settings section that allows you to manage Your personal information. 
              You may also contact Us to request access to, correct, or delete any personal information that You have 
              provided to Us.
              Please note, however, that We may need to retain certain information when we have a legal obligation 
              or lawful basis to do so.
              DATA RETENTION
              The Company will retain your Personal Data only for as long as is necessary for the purposes set out 
              in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply 
              with our legal obligations (for example, if we are required to retain your data to comply with 
              applicable laws), resolve disputes, and enforce our legal agreements and policies. <br/><br/>
              The company will also retain Usage Data for internal analysis purposes. Usage Data is generally 
              retained for a shorter period, except when this data is used to strengthen the security or to improve 
              the functionality of our application, or we are legally obligated to retain this data for longer time 
              periods.
              MINORS
              Our application does not address anyone under the age of 13. We do not knowingly collect personally 
              identifiable information from anyone under the age of 13. If you are a parent or guardian and you 
              are aware that your child has provided us with Personal Data, please contact us. If we become aware 
              that we have collected Personal Data from anyone under the age of 13 without verification of parental 
              consent, we take steps to remove that information from our servers.<br/><br/>
              If we need to rely on consent as a legal basis for processing your information and your country 
              requires consent from a parent, we may require your parent's consent before we collect and use that 
              information.
              CHANGES TO THIS PRIVACY POLICY
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page.<br/><br/>
              We will let you know via email and/or a prominent notice on our application, prior to the change 
              becoming effective and update the "Last updated" date at the top of this Privacy Policy.<br/><br/>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy 
              Policy are effective when they are posted on this page.
              HOW TO CONTACT US
              If you have any questions about this Privacy Policy, you can contact us:<br/>
              •	Via email: it.support@geospectrum.com.ph<br/>
              •	By visiting this page on our website: https://www.geospectrum.com.ph/gms/contact-us/
              <br/><br/> `}
        </div>
      </Grid>
    </Grid>
  );
}

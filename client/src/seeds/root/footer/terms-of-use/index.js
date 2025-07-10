import * as React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import { SEEDSContext } from "../../../context/SEEDSContext";

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

      "& > :nth-child(1)": {
        font: "800 72px/1.00 'Outfit', sans-serif",
        color: "var(--color-black)",

        "& > *": {
          width: "270px",
          
          whiteSpace: "nowrap",
          overflow: "hidden",

          display: "flex",
          flexFlow: "column nowrap",
        },
      },
      
      "& > :nth-child(2)": {
        overflow: "hidden auto",

        font: "400 16px/1.25 'Outfit', sans-serif",
        color: "var(--color-black)",

        "& > *": {
          width: "auto",
          height: "0",

          "& a": {
            font: "800 16px/1.25 'Outfit', sans-serif",
            color: "var(--color-black)",

            "&:hover": {
              color: "var(--color-green-dark)",
            },
          },

          "& blockquote": {
            display: "inline-block",
            width: "auto",

            boxSizing: "border-box",
            marginInlineStart: "0",
            marginInlineEnd: "0",
            borderLeft: "solid 2px var(--color-black)",
            padding: "12px",

            background: "var(--color-gray-light)",

            font: "400 16px/1.25 'Outfit', sans-serif",
            color: "var(--color-black)",
          },

          "& .text-subtitle": {
            font: "800 16px/1.25 'Outfit', sans-serif",
            textTransform: "uppercase",
            color: "var(--color-black)",
          },
        },
      },
    },
  });
});

export default function TermsOfUse() {
  const styles = useStyles();

  const { setAppBarValue } = React.useContext(SEEDSContext);
  
  React.useEffect(function () {  
    setAppBarValue("/terms-of-use");
  }, []);

  return (
    <Grid id = "page-terms-of-use" className = { styles.pageTermsOfUse } container>
      <Grid item>
        <div>
          <span>{ "Terms" }</span>
          <span>{ "of Use" }</span>
        </div>
      </Grid>
      <Grid item>
        <div>
          <span className = "text-subtitle">{ `Version 1.0 | Effective Date: 04 July 2025` }</span>
          <br/>
          <br/>
          <span>{ `These Terms of Use (“Terms”) govern the access to and use of the SEEDs, a web-based geographic information system (“GIS”) application (the “Application”) developed and maintained by Geospectrum Analytics Services, Inc. (“Geospectrum”, “GASI”, “we”, “us”, or “our”). SEEDs is intended to serve as a decision-support tool for the integration, visualization, and analysis of spatial, environmental, and socioeconomic data.` }</span>
          <br/>
          <br/>
          <span>{ `By accessing or using the SEEDs application, you agree to be bound by these Terms, as well as any other applicable policies and guidelines published by GASI, including the accompanying `}<a href = "/privacy-policy">{ "Privacy Policy" }</a>{ `, which forms an integral part of this Agreement. If you do not agree to these Terms in full, you are not authorized to use the application.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `About SEEDs` }</span>
          <br/>
          <br/>
          <span>{ `SEEDs is a secure, browser-based application designed to support users—such as researchers, planners, institutions, and government agencies—in analyzing, visualizing, and interpreting geospatial and statistical data. It integrates multiple datasets and generates interactive map layers, charts, and reports that support evidence-based planning, monitoring, and policy formulation.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Acceptance of Terms` }</span>
          <br/>
          <br/>
          <span>{ `By using SEEDs:` }</span>
          <ul>
            <li>{ `You affirm that you are of legal age and capacity to enter into this Agreement.` }</li>
            <li>{ `If you are using the application on behalf of an organization, agency, or institution, you represent and warrant that you are authorized to accept these Terms on its behalf.` }</li>
          </ul>
          <span>{ `The use of SEEDs is intended for individuals who are of legal age and capacity. Users accessing the application on behalf of a government agency, academic institution, or private organization must ensure they have appropriate authority to bind said organization to these Terms.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Access and Use of the Platform` }</span>
          <br/>
          <br/>
          <span>{ `You are granted a limited, non-exclusive, non-transferable, and revocable license to use the SEEDs Platform for lawful, non-commercial, and research, planning, or governance-related purposes, subject to the following:` }</span>
          <ul>
            <li><b>{ `Authorized Use Only:` }</b>&ensp;{ `You may access, view, and download content for internal use only.` }</li>
            <li><b>{ `Restricted Activities:` }</b>&ensp;{ `You may not reverse engineer, decompile, disassemble, or attempt to derive source code from the Platform, or use automated scripts to extract or scrape content.` }</li>
          </ul>
          <span>{ `Registration may be required to access certain features of the application. By registering for an account, you agree to provide accurate and complete information and to maintain the confidentiality of your login credentials. You are solely responsible for all activities that occur under your account.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Intellectual Property Rights` }</span>
          <br/>
          <br/>
          <span>{ `Unless explicitly stated otherwise, all content, data layers, software, documentation, user interface elements, graphics, source code, and branding materials made available through the SEEDs application are the intellectual property of Geospectrum Analytics Services, Inc., or are used under valid license from third-party sources.` }</span>
          <br/>
          <br/>
          <span>{ `You may not reproduce, modify, republish, distribute, or otherwise exploit any part of the application without the express written permission of GASI or the applicable rights holder.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Acceptable Use and Restrictions` }</span>
          <br/>
          <br/>
          <span>{ `Users agree to use the SEEDs application in a lawful and responsible manner. In particular, you shall not:` }</span>
          <ul>
            <li>{ `Use the application for any unlawful, fraudulent, or malicious purpose;` }</li>
            <li>{ `Introduce or transmit viruses, malware, or any other code intended to disrupt or compromise system functionality;` }</li>
            <li>{ `Attempt to gain unauthorized access to accounts, data, or systems;` }</li>
            <li>{ `Extract or scrape data using automated tools or bots without prior consent;` }</li>
            <li>{ `Impersonate another individual or misrepresent your affiliation with any entity;` }</li>
            <li>{ `Interfere with the performance or availability of the application or its components.` }</li>
          </ul>
          <span>{ `GASI reserves the right to suspend or permanently revoke access to users who violate these provisions.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Data Use, Attribution, and Licensing` }</span>
          <br/>
          <br/>
          <span>{ `SEEDs incorporates data from multiple sources, including proprietary analyses, public datasets, and third-party institutional partners.` }</span>
          <ul>
            <li>{ `Users are expected to verify the licensing terms associated with specific datasets before reuse or redistribution.` }</li>
            <li>{ `Proper attribution must be provided in any public output, presentation, or publication that uses or references data accessed from SEEDs. A recommended citation format is:` }</li>
            <blockquote>{ `Data and outputs generated using SEEDs (Spatial Environmental and Economic Data System), developed by Geospectrum Analytics Services, Inc.` }</blockquote>
            <li>{ `GASI disclaims any responsibility for how users interpret or apply such data outside the context of the application.` }</li>
          </ul>
          <span className = "text-subtitle">{ `Warranties and Disclaimers` }</span>
          <br/>
          <br/>
          <span>{ `The SEEDs application is provided on an “as is” and “as available” basis without warranties of any kind, whether express or implied.` }</span>
          <br/>
          <br/>
          <span>{ `GASI makes no representation or warranty as to the accuracy, completeness, timeliness, or fitness for any specific purpose of the data or visualizations generated through the application. The use of SEEDs and any decisions made based on its outputs are solely at the user's discretion and risk.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Limitation of Liability` }</span>
          <br/>
          <br/>
          <span>{ `To the fullest extent permitted by applicable law, Geospectrum Analytics Services, Inc. shall not be held liable for any indirect, incidental, special, punitive, or consequential damages—including but not limited to loss of data, revenue, or operational disruption—arising from the use or inability to use the SEEDs application.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Termination of Access` }</span>
          <br/>
          <br/>
          <span>{ `Geospectrum reserves the right to terminate or suspend access to the Platform at its sole discretion, without notice, for any reason, including but not limited to:` }</span>
          <ul>
            <li>{ `Breach of this Agreement.` }</li>
            <li>{ `Technical or security issues.` }</li>
            <li>{ `Legal compliance requirements.` }</li>
          </ul>
          <span className = "text-subtitle">{ `Modifications to the Terms of Use` }</span>
          <br/>
          <br/>
          <span>{ `GASI reserves the right to amend these Terms at any time. Updates will be posted within the application, and it is the user's responsibility to remain informed of any changes. Continued use of the application following the posting of modifications constitutes acceptance of the revised Terms.` }</span>
          <br/>
          <br/>
          <span>{ `GASI may also modify, suspend, or terminate access to any part of the application at its sole discretion and without prior notice.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Governing Law and Jurisdiction` }</span>
          <br/>
          <br/>
          <span>{ `These Terms shall be governed by the laws of the Republic of the Philippines. Any dispute arising under or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts located in Pasig City, Metro Manila.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Severability and Waiver` }</span>
          <br/>
          <br/>
          <span>{ `If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. Failure to enforce any provision shall not constitute a waiver of such right.` }</span>
          <br/>
          <br/>
          <span className = "text-subtitle">{ `Entire Agreement` }</span>
          <br/>
          <br/>
          <span>{ `These Terms of Use, along with the Privacy Policy and any supplemental terms, constitute the entire agreement between you and Geospectrum regarding the Platform and supersede any prior agreements or communications.` }</span>
          <br/>
          <br/>
          <br/>
          <br/>
          <span>{ `For inquiries or concerns regarding these Terms of Use, please contact:` }</span>
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

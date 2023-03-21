import React from 'react';
import SubdomainCard from './subdomainCard';
import Carousel from './carousel';

export default function SeedsOverview () {
  return (
    <div>
      <Carousel/>
      <SubdomainCard seedsFeatures="Social"
        domainName={["Education", "Health", "Housing and Social Welfare", "Sports and Recreation", 
          "Protective and Safety Services"]}
        iconName={["2 Education", "3 Health", "4 Housing", "5 Sports&Rec", "6 Protective"]}/> <br/><br/>
      <SubdomainCard seedsFeatures="Economic" 
        domainName={["Agriculture and Forestry", "Commerce, Trade and Industry", "Tourism"]}
        iconName={["8 Agriculture", "10 Tourism", "10 Tourism"]}/><br/><br/>
      <SubdomainCard seedsFeatures="Environmental" 
        domainName={["Land Resources", "Land Use / Land Use Trends", "Topography", "Soils","Climate", 
          "Hazard and Disaster Risk","Sanitation"]}
        iconName={["12 Land Resources", "13 Land Use", "14 Topography", "15 Soil", "16 Climate", "17 Hazards", 
          "18 Sanitation"]}/><br/><br/>
      <SubdomainCard seedsFeatures="Demographic" 
        domainName={["Human Resources", "Labor Force Profile", "Municipality/ City Census Profile"]}
        iconName={["20 Human Resources", "21 Labor Force", "20 Human Resources"]}/><br/><br/>
    </div>
  );
}
 
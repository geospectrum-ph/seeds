import BG from '../../assets/satellite-bg.jpg'
import SocialIcon from '../icons/1 Social.png'
import EconomicIcon from '../icons/7 Economic.png'
import EnvironmentalIcon from '../icons/11 Environmental.png'
import DemographicIcon from '../icons/19 Demographic.png'

// import images later here

const seedsCore = [
    {
        title: 'SEEDs Populate',
        description1: 'this feature allows uploading and tagging of various spatial and textual information to the SEED database management system ',
        description2: 'Metadata and contextual information are also included to catalogue, sort and filter various information stored in its database.',
        imageUrl: SocialIcon,
        // time: 1500,
    },
    {
        title: 'SEEDs Catalogue',
        description1: 'this feature allows access to the SEED database. Depending on the user level and privileges, various information can be accessed and utilized using the SEED Catalogue',
        description2: 'Discovery to sorting and filtering to downloading this information is done in the Catalogue.',
        imageUrl: EconomicIcon,
        // time: 1500,
    },
    {
        title: 'SEEDs Map Portal',
        description1: 'this is the geographic map feature of SEEDs where any spatial data stored in the catalogue are accessed and mapped in GIS-based display',
        description2: 'Map styles and features are integrated to the SEEDs map portal to allow users to interactively display and assess any spatial information of interest.', 
        description3: 'Products from this feature include visualization, map generation and map production.',
        imageUrl: EnvironmentalIcon,
        // time: 1500,
    },
];
export default seedsCore;
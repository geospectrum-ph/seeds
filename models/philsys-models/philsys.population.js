const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const philsyspopulationSchema = new Schema({
    Household_Serial_Number: {type: Number},
    Population_ID:{type: String},
    Name: {type: String},
    Is_Household_Head: {type: Boolean},
    Relationship_to_Household_Head: {type: String},
    Gender: {type: String},
    Date_of_Birth: {type: String},
    Marital_Status: {type: String},
    Birth_Registration: {type: String},
    Religious_Affiliation: {type: String},
    Citizenship: {type: String},
    Literacy: {type: String},
    Ethnicity: {type: String},
    Functional_Difficulty: {type: String},
    Residence_at_Time_of_Birth: {type: String},
    Residence_Five_Years_Ago: {type: String},
    Highest_Grade_Year_Completed: {type: String},
    Is_an_Overseas_worker: {type: String}
});
const philsysPopulation = mongoose.model('PhilSYS Population', philsyspopulationSchema);
module.exports = philsysPopulation;
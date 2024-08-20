// TEST CASE

// custom sld to array of sld legend json 
const sld2legend = require('./sld2legend.js')

const fs = require("fs") // Package used for reading file directories
var sldTest;
// var pathToObjectSLD = '../Leaflet.SLD-master/examples/austrians-vienna.sld' // not working
var pathToObjectSLD = 'client/src/assets/Leaflet.SLD-master/examples/austrians-vienna.sld' // right-click > copy relative path
var sldPromise = fs.readFileSync(pathToObjectSLD).toString(); //sldPromist is the string version of the file
// console.log(sldPromise);
// console.log(typeof(sld2legend))

// async function test(){
//     var sldTest = await sld2legend.sld2le    gend(sldPromise) // convert sldPromise (string) to sldTest (json, legend)
//     .then(console.log('sldTest', sldTest));
// }

async function test(){
    var sldTest = await sld2legend.sld2legend(sldPromise) // convert sldPromise (string) to sldTest (json, legend)
    // console.log('ito yung binalik niya na sldTest:', sldTest)
    // .then(() => console.log('It has returned this sldTest:', sldTest));
    return sldTest
}
test()
// test().then((sldTest) => {console.log('It has returned this sldTest:', sldTest)})

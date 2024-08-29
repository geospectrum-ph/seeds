// Created 19 February 2021
// Converts SLD (text) into an array of jsons for its legend
 
async function extractSldRules(sldText){
    var sldRules = await sldText.split("se:Rule"); // Split using 'se:Rule'

    sldRules = sldRules.filter(function(v, i) { // remove even items
        // check the index is even
        return i % 2 == 1;
      });
    // console.log('extractSldRules done!')
    return sldRules
}

function extractAttribute(sldText, key){ // function inside extractSinglesld which finds property in sldText
    try { // try finding the property style inside the sldText
      var keylen = key.length; // length of key
      var keypos = sldText.search(key) 
      if (keypos > -1){ // if key exists in sldText
        keypos = keypos + keylen; // key starting position of property
        var keyend = sldText.indexOf("<", keypos); // key ending position of property
        return sldText.slice(keypos, keyend); // return value by slicing sldText according to start and end positions of key
      } else { // if key doesn't exist in sldText
        return null
      }; // 

    } catch (error) { // if it fails to find the property style inside the sldText
    };
};

// Version 2.3
async function sld2legend(sldText) { // function which extracts sld styles from sldRule
  var sldOut
  await extractSldRules(sldText)
  .then( async (sldRules) => {
      var sldLegends =  [] // initialize sldLegends array
      sldRules.find( (sldRule) => {// for each sldRule
          var sldLegend = { // sldLegend item
              'name' : extractAttribute(sldRule, 'Name>'),
              'title' : extractAttribute(sldRule, 'Title>'),
              'color' : extractAttribute(sldRule, 'stroke">'),
              'weight' : extractAttribute(sldRule, 'stroke-width">'),
              'strokeOpacity' : extractAttribute(sldRule, 'stroke-opacity">'),
              'fillOpacity' : extractAttribute(sldRule, 'fill-opacity">'),
              'fillColor' : extractAttribute(sldRule, 'fill">'),
              'dashArray' : extractAttribute(sldRule, 'stroke-dasharray">'),
              'lineJoin' : extractAttribute(sldRule, 'stroke-linejoin">'),
              'lineCap' : extractAttribute(sldRule, 'stroke-linecap">')
          }; 
          sldLegends.push(sldLegend)
      }
  )
  if (sldLegends.length === sldRules.length){
    return sldLegends
  }
  })
  .then((sldLegends) => {sldOut = sldLegends})
  // console.log('sldOut:', sldOut)
  return sldOut
};

module.exports = { sld2legend }; // export this function


// // TEST CASE

// const fs = require("fs") // Package used for reading file directories

// // var pathToObjectSLD = '../Leaflet.SLD-master/examples/austrians-vienna.sld' // not working
// var pathToObjectSLD = 'client/src/assets/Leaflet.SLD-master/examples/austrians-vienna.sld' // right-click > copy relative path
// var sldPromise = fs.readFileSync(pathToObjectSLD).toString(); //sldPromist is the string version of the file
// // console.log(sldPromise);

// var sldTest = sld2legend(sldPromise); // convert sldPromise (string) to sldTest (json, legend)
// console.log('sldTest', sldTest);
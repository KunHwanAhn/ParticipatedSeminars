// Import functions
// Use functions

//ES6
const myModule = require('./module.js');

const folderPath = process.argv[2];
const extenstion = process.argv[3];

myModule(folderPath, extenstion, (err, filteredFiles) => {
  if (err) {
    return console.log(err);
  }

  filteredFiles.forEach((fileName) => {
    console.log(fileName);
  });
});
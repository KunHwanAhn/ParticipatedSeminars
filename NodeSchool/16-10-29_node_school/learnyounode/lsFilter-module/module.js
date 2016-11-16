// Define functions
// Export functions
// node.js에서 이미 module을 정의 해놨음.

//ES6
const fs = require('fs');
const path = require('path');

module.exports = function (folderPath, extenstion, cb) {
  fs.readdir(folderPath, (err, fileNames) => {
    if (err) {
      return cb(err);
    }

    const filtered = fileNames.filter((fileName) => {
      if (path.extname(fileName) === '.' + extenstion) {
        return true;
      } else {
        return false;
      }
    });

    return cb(null, filtered);
  });
};
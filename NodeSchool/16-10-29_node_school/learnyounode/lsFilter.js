/*
# LEARN YOU THE NODE.JS FOR MUCH WIN!

 ## LS 거르기 (연습 문제 13개 중 5개 째)

  주어진 디렉터리의 파일 목록을 만든 후 확장자로 걸러 출력하는 프로그램을
  만드세요. 프로그램의 첫 번째 인자로 디렉터리 이름(예: '/path/to/dir/')을
  받고 거를 확장자는 두 번째 인자로 받습니다.

  예를 들어, 두 번째 인자로 'txt'를 받으면 .txt로 끝나는 파일로만 목록을
  거를 필요가 있습니다. 두 번째 인자는 '.'이 앞에 붙지 않는 것에 주의하세요.

  파일의 목록은 한 줄당 한 파일씩 콘솔에 출력해야 합니다. 반드시 비동기
  I/O를 사용하세요.

 ─────────────────────────────────────────────────────────────────────────────

 ## 힌트

  fs.readdir() 메소드는 그 첫 번째 인자로 경로 이름을, 두 번째로 콜백을
  받습니다. 콜백은 이렇습니다.

     function callback (err, list) { // Body }

  list는 파일 이름 문자열의 배열입니다.

  fs 모듈의 문서는 브라우저에 이 주소를 넣으면 볼 수 있습니다.
  file:///your/account/node_path/node/v6.8.1/lib/node_modules/learnyounod
  e/node_apidoc/fs.html

  아마 extname 메소드를 구현하는데 노드의 path 모듈이 도움될 것입니다.

  path 모듈의 문서는 브라우저에 이 주소를 넣으면 볼 수 있습니다.
  file:///your/account/node_path/node/v6.8.1/lib/node_modules/learnyounod
  e/node_apidoc/path.html
 */

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var args = process.argv,
    folderName = args[2],
    exp = _.isUndefined(args[3]) ? undefined : '.' + args[3];

// fs.readdir(folderName, function (error, list) {
//   if (error) {
//     return console.log(error);
//   }

//   _.forEach(list, function (_fileName) {
//     if (_.isUndefined(exp)) {
//       console.log(_fileName);
//     } else {
//       if(path.extname(_fileName) === '.' + args[3]) {
//         console.log(_fileName);
//       }
//     }
//   });
// });

// ES6
var filtered;

fs.readdir(folderName, (error, fileNames) => {
  if (error) {
    return console.log(error);
  }

  filtered = fileNames.filter((fileName) => {
    if (path.extname(fileName) === exp) {
      return true;
    } else {
      return false;
    }
  });

  filtered.forEach((value) => {
    console.log(value);
  });
});
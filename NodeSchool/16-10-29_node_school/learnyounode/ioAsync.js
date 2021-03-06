/*
# LEARN YOU THE NODE.JS FOR MUCH WIN!

 ## 비동기 I/O 시작하기！ (연습 문제 13개 중 4개 째)

  단일 비동기 파일시스템 연산을 사용해 cat file | wc -l처럼, 파일을 읽어 그
  안의 개행의 수를 콘솔(stdout)에 출력하는 프로그램을 작성하세요.

  첫 번째 인자로 읽어야할 파일의 전체 경로를 넘겨줍니다.

 ─────────────────────────────────────────────────────────────────────────────

 # 힌트

  이 문제의 해결책은 Node.js적인 방법인 비동기를 사용하는 것을 빼면 이전
  문제와 거의 같습니다.

  fs.readFileSync()대신 fs.readFile()를 사용하고 이 메소드의 반환 값을
  사용하는 대신 두 번째 인자로 넘긴 콜백 함수에서 값을 수집해야 합니다.
  콜백에 대한 더 자세한 내용은 다음 링크를 확인하세요.
  [https://github.com/maxogden/art-of-node#callbacks](https://github.com/max
  ogden/art-of-node#callbacks)

  관용적인 Node.js 콜백은 이런 모양인 것을 기억해 두세요.

     function callback (err, data) { // Body }

  첫 번째 인자가 있는 지로 에러가 발생했는지를 확인할 수 있게 됩니다. 에러가
  없다면, 두 번째 인자로 Buffer 객체를 받게 됩니다. readFileSync()처럼, 두
  번째 인자로 'utf8'를 넣을 수 있고 세 번째 인자로 콜백을 넣어 Buffer 대신
  String을 받을 수 있습니다.

  fs 모듈의 문서는 브라우저에 이 주소를 넣으면 볼 수 있습니다.
  file:///your/account/node_path/node/v6.8.1/lib/node_modules/learnyounod
  e/node_apidoc/fs.html
 */

var fs = require('fs');

var args = process.argv,
    splitArrary;

// fs.readFile(file, 'utf8', callback) can also be used
// callback function: function (error, string) { // Body }
// fs.readFile(args[2], function (error, data) {
//   if (error) {
//     return console.log(error);
//   }

//   splitArrary = data.toString().split('\n');

//   console.log(splitArrary.length - 1);
// });

// ES6
fs.readFile(args[2], (error, data) => {
  if (error) {
    return console.log(error);
  }

  splitArrary = data.toString().split('\n');

  console.log(splitArrary.length - 1);
});
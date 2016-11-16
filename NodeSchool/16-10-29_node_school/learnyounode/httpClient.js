/*
# LEARN YOU THE NODE.JS FOR MUCH WIN!

 ## HTTP 클라이언트 (연습 문제 13개 중 7개 째)

  첫 번째 인자로 넘긴 URL에 HTTP GET 요청을 수행하는 프로그램을 작성하세요.
  응답에서 문자열인 "data" 이벤트 내용을 콘솔(stdout)에 각각 새 줄로
  적으세요.

 ─────────────────────────────────────────────────────────────────────────────

 ## 힌트

  이 연습 문제에는 http 핵심 모듈이 필요할 것입니다.

  http 모듈의 문서는 브라우저에 이 주소를 넣으면 볼 수 있습니다.
  file:///your/account/node_path/node/v6.8.1/lib/node_modules/learnyounod
  e/node_apidoc/http.html

  http.get() 메소드는 간단한 GET 요청의 단축입니다. 간단한 답을 작성하기
  위해 사용하세요. http.get()의 첫 번째 인자는 GET해야할 URL입니다. 두 번째
  인자는 콜백입니다.

  다른 콜백 함수와는 다르게 이런 모양을 하고 있습니다.

     function callback (response) { // Body }

  response 객체는 Node 스트림 객체에 있습니다. Node 스트림을 이벤트를
  발생하는 객체로 취급할 수 있습니다. 가장 흥미로운 세 가지 이벤트는 "data",
  "error", "end"입니다. 이벤트는 이런 식으로 감시할 수 있습니다.

     response.on("data", function (data) { // Body })

  "data" 이벤트는 데이터의 덩어리가 있고 처리할 수 있을 때 발생합니다.
  덩어리의 크기는 뒤에 있는 데이터 소스에 따라 달라집니다.

  response 객체 / http.get()에서 가져온 스트림도 setEncoding() 메소드를
  가지고 있습니다. 이 메소드를 "utf8"과 함께 호출하면, "data" 이벤트가
  명시적으로 문자열로 변환해야 하는 일반 Node Buffer 객체가 아닌 문자열을
  생성합니다.
 */

// var http = require('http')

// http.get(process.argv[2], function (response) {
//  response.setEncoding('utf8')
//  response.on('data', console.log)
//  response.on('error', console.error)
// }).on('error', console.error)


// ES6
const http = require('http');

const URL = process.argv[2];

http.get(URL, (response) => {
  // Response === Stream ===  Event emitter
  response.on('data', (buff) => {
    console.log(buff.toString());
  });
});



















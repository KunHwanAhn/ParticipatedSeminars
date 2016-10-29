/*
# LEARN YOU THE NODE.JS FOR MUCH WIN!

 ## I/O 시작하기！ (연습 문제 13개 중 3개 째)

  단일 동기 파일시스템 연산을 사용해 cat file | wc -l처럼, 파일을 읽어 그
  안의 개행(\n)의 수를 콘솔(stdout)에 출력하는 프로그램을 작성하세요.

  첫 번째 인자로 읽어야할 파일의 경로를 넘겨줍니다. 직접 테스트 파일을 만들
  필요는 없습니다.

 ─────────────────────────────────────────────────────────────────────────────

 ## 힌트

  파일 시스템 연산을 수행하기 위해 Node 핵심 모듈의 fs 모듈이 필요합니다.
  이런 종류 "전역" 모듈을 불러오려면, 다음의 주문을 사용하세요.

     var fs = require('fs')

  이제 fs 모듈 전체를 fs라는 변수로 사용할 수 있습니다.

  fs 모듈 안의 모든 동기(블록킹) 파일 시스템 메소드는 'Sync'로 끝납니다.
  파일을 읽으려면, fs.readFileSync('/path/to/file')를 사용할 필요가
  있습니다. 이 메소드는 파일의 모든 내용을 담고 있는 Buffer 객체를
  반환합니다.

  fs 모듈의 문서는 브라우저에 이 주소를 넣으면 볼 수 있습니다.
  file:///Users//your/account/node_path/node/v6.8.1/lib/node_modules/learnyounod
  e/node_apidoc/fs.html

  Buffer 객체는 효과적으로 임의의 배열(ascii, 바이너리나 다른 형식의)
  데이터를 나타내는 Node의 방법입니다. Buffer 객체는 toString()를 호출하기만
  하면 간단히 문자열로 변환 할 수 있습니다. 예를 들면, var str =
  buf.toString().

  Buffer 모듈의 문서는 브라우저에 이 주소를 넣으면 볼 수 있습니다.
  file:///Users//your/account/node_path/node/v6.8.1/lib/node_modules/learnyounod
  e/node_apidoc/buffer.html

  문자열에 개행을 새는 쉬운 방법을 찾고 있다면, JavaScript String은 '\n'를
  경계 기호로 .split()해 하위 문자열의 배열을 만들 수 있습니다. 테스트
  파일의 마지막 줄에는 개행이 없는 것에 주의하세요. 그러므로 이 메소드를
  사용하면 개행의 숫자보다 한 개 더 많은 요소를 가지게 됩니다.
 */

var fs = require('fs');

var args = process.argv,
    filePath = args[2],
    buf,
    splitArrary;

buf = fs.readFileSync(filePath);
splitArrary = buf.toString().split('\n');

console.log(splitArrary.length - 1);

// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
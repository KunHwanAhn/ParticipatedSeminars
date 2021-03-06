/*
# LEARN YOU THE NODE.JS FOR MUCH WIN!

 ## ASYNC 다루기 (연습 문제 13개 중 9개 째)

  이 문제는 http.get()을 사용해야 한다는 점에서 전 문제와 비슷합니다.(HTTP
  COLLECT) 하지만 이번에는 처음 세 개의 커맨드라인 인자를 사용해, 세 개의
  URL을 수집해야 합니다.

  각 URL이 제공하는 모든 내용을 수집해 콘솔(stdout)에 출력해야 합니다.
  길이를 출력할 필요는 없습니다. URL당 한 줄씩 데이터를 문자열로 표시하기만
  하면 됩니다. 반드시 커맨드 라인 인자로 URL을 받은 순서대로 출력해야
  합니다.

 ─────────────────────────────────────────────────────────────────────────────

 ## 힌트

  이 세 서버가 부드럽게 동작하리라 생각하지 마세요! 원하는 순서대로 응답을
  완료하지는 않아 순서대로 출력되지 않을 것이므로, 그냥 받는대로 출력해서는
  안 됩니다.

  결과를 큐에 넣어 어떤 URL이 전체 내용을 반환했는지 추적해야 합니다. 전부
  다 받았을 때에만, 콘솔에 내용을 출력할 수 있습니다.

  카운팅 콜백은 Node에서 async를 관리하는 기초적인 방법입니다. 직접
  구현하기보다, [async](http://npm.im/async)나 [after](http://npm.im/after)
  같은 서드 파티 라이브러리를 사용하는 것이 더 간편할 수 있습니다. 하지만
  연습 문제이니, 외부 라이브러리 없이 한 번 해보세요.
 */

// var http = require('http')
// var bl = require('bl')
// var results = []
// var count = 0

// function printResults () {
//  for (var i = 0; i < 3; i++) {
//    console.log(results[i])
//  }
// }

// function httpGet (index) {
//  http.get(process.argv[2 + index], function (response) {
//    response.pipe(bl(function (err, data) {
//      if (err) {
//        return console.error(err)
//      }

//      results[index] = data.toString()
//      count++

//      if (count === 3) {
//        printResults()
//      }
//    }))
//  })
// }

// for (var i = 0; i < 3; i++) {
//  httpGet(i)
// }


// ES6
const http = require('http');

const urls = process.argv.slice(2); // Array

var promises = urls.map((url) => {
  return new Promise((resolve) => {
    http.get(url, (response) => {
      var str = '';

      response.on('data', (buff) => {
        str = str + buff;
      });

      response.on('end', () => {
        resolve(str);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
});

Promise.all(promises)
  .then((array) => {
    array.forEach((val) => {
      console.log(val);
    });
  }, (err) => {
    console.log(err);
  });
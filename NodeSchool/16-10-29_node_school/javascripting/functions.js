/*
# JAVASCRIPTING

 ## 함수 (연습 문제 19개 중 17개 째)

  함수는 입력을 받는 코드의 블록입니다. 그 입력을 처리해서 출력을 만듭니다.

  여기에 예제가 있습니다.

     function example (x) {
       return x * 2;
     }

  이렇게 함수를 호출하면 숫자 10을 얻을 수 있습니다.

     example(5)

  위의 예제는 example 함수가 숫자를 인자(입력)로 받아 그 숫자에 2를 곱한
  값을 반환합니다.

 ## 도전 과제

  functions.js라는 파일을 만듭니다.

  그 파일에서 food를 인자로 받는 eat 함수를 선언합니다. food는 문자열이어야
  합니다.

  함수 안에서 food 인자를 이렇게 반환합니다.

     return food + ' tasted really good.';

  console.log()의 괄호 안에서 문자열 bananas를 인자로 하는 eat() 함수를
  호출합니다.
 */

function eat (food) {
  return food + ' tasted really good.';
}

console.log(eat('bananas'));
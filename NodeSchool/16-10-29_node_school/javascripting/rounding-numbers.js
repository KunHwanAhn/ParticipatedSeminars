/*
# JAVASCRIPTING

 ## 숫자 반올림 (연습 문제 19개 중 7개 째)

  +, -, *, /, % 같은 익숙한 연산자를 사용해 기본적인 연산을 할 수 있습니다.

  더 복잡한 연산은 Math 객체를 사용해 할 수 있습니다.

  이 과제에서는 Math를 사용해 숫자를 반올림 해보겠습니다.

 ## 도전 과제

  rounding-numbers.js라는 파일을 만듭니다.

  이 파일 안에서 실수 1.5를 참조하는 roundUp라는 변수를 선언합니다.

  Math.round() 메소드를 이용해 숫자를 반올림합니다. 이 메소드는 숫자를
  가까운 정수로 올리거나 내립니다.

  Math.round()을 사용하는 예입니다.

     Math.round(0.5);

  roundUp 변수를 인자로 Math.round() 메소드에 넘긴 결과를 참조하는
  rounded라는 두 번째 변수를 정의합니다.

  console.log()를 사용해 숫자를 터미널에 출력합니다.
 */

var roundUp = 1.5,
    rounded;

rounded = Math.round(roundUp);
console.log(rounded);
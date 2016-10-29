/*
# JAVASCRIPTING

 ## 배열을 루프하기 (연습 문제 19개 중 14개 째)

  이 도전 과제에서는 for 반복문을 사용해 배열에 있는 값의 목록에 접근하고
  조작하겠습니다.

  배열 값에 접근하는 것은 정수를 사용해 할 수 있습니다.

  배열 안의 각 아이템은 0으로 시작하는 숫자로 확인할 수 있습니다.

  그래서 이 배열의 hi는 숫자 1로 확인할 수 있습니다.

     var greetings = ['hello', 'hi', 'good morning'];

  이렇게 접근할 수 있습니다.

     greetings[1];

  for 반복문 안에서는 숫자 그대로 사용하지 않고 i 변수를 각괄호 안에서
  사용합니다.

 ## 도전 과제

  looping-through-arrays.js라는 파일을 만듭니다.

  이 파일 안에서 다음 배열을 참조하는 pets라는 이름의 변수를 선언합니다.

     ['cat', 'dog', 'rat'];

  for 반복문을 만들어 복수형이 되도록 각 문자열을 변경하세요.

  루프 안에서 이런 구문을 사용하시면 됩니다.

     pets[i] = pets[i] + 's';

  루프 뒤에 console.log()로 pets 배열을 터미널에 출력하세요.
 */

var pets = ['cat', 'dog', 'rat'];

for (var i = 0; i < pets.length; i++) {
  pets[i] = pets[i] + 's';
}

console.log(pets);
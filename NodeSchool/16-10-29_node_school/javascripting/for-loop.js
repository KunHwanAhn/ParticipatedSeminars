/*
# JAVASCRIPTING

 ## FOR 반복문 (연습 문제 19개 중 10개 째)

  for 반복문은 이렇게 생겼습니다.

     for (var i = 0; i < 10; i++) {
       // log the numbers 0 through 9
       console.log(i)
     }

  i 변수는 반복문 변수가 몇 번이나 실행 되었는지 추적하는데 사용합니다.

  i < 10; 구문은 반복문의 한계를 가리킵니다. 이 반복문은 i가 10보다 작을
  때만 계속됩니다.

  i++ 구문은 반복할 때마다 i를 증가시킵니다.

 ## 도전 과제

  for-loop.js라는 파일을 만듭니다.

  그 파일 안에서 total이라는 변수를 선언하고 그 변수를 숫자 0과 같게 합니다.

  limit이라는 이름의 두 번째 변수를 선언하고 숫자 10과 같게 합니다.

  변수 i가 0부터 시작해 1씩 증가하는 for 반복문을 만듭니다. 이 반복문은 i가
  limit보다 작을 동안만 실행됩니다.

  각 반복마다 숫자 i를 total 변수에 더합니다. 이렇게 하려면, 이 구문을
  사용하시면 됩니다.

     total += i;

  for 반복문 다음에, console.log()를 사용해 total 변수를 터미널에
  출력합니다.
 */

var total = 0,
    limit = 10;

for (var i = 0; i < limit; i++) {
  total += i;
}

console.log(total);
/*
# JAVASCRIPTING

 ## 배열 필터 (연습 문제 19개 중 12개 째)

  배열을 조작하는 방법은 여러가지가 있습니다.

  대표적인 사용법으로 특정 값만 가진 배열로 필터링하는 것이 있습니다.

  이걸 하기 위해 .filter() 메소드를 사용할 수 있습니다.

  여기에 예제가 있습니다.

     var pets = ['cat', 'dog', 'elephant'];

     var filtered = pets.filter(function (pet) {
       return (pet !== 'elephant');
     });

  filtered 변수는 이제 cat과 dog만 가지고 있습니다.

 ## 도전 과제

  array-filtering.js라는 이름의 파일을 만듭니다.

  이 파일에 밑의 배열을 참조하는 numbers라는 변수를 정의합니다.

     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  위에 있는 것처럼, numbers.filter()의 결과를 참조하는 filtered라는 변수를
  선언합니다.

  .filter() 메소드에 이렇게 생긴 함수를 넘깁니다.

     function evenNumbers (number) {
       return number % 2 === 0;
     }

  console.log()를 사용해 filtered 배열을 터미널에 출력합니다.
 */

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    filtered;

filtered = numbers.filter(function (_number) {
  return _number % 2 === 0;
});

console.log(filtered);
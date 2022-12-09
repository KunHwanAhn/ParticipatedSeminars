# 디자이너와 웹 개발자를 위한 d3js 기초
- 강규영
- [참고 URL](https://bit.ly/gdg-d3js)

## Tags
- svg
- g: Group Tag라 생각하면 편함

## 시각화 과정
- 데이터 읽기
- 데이터 가공
- 스케일 함수 정의
- 데이터와 축 표현
- 인터랙티비티

## 코딩
- 데이터 읽기: d3.csv
- 데이터 가공: "unary plus is the fastest and preferred way" --MDN
- 스케일 함수 정의: d3.scaleLinear()
- 데이터 표현 - Enter/Update/Exit selection 이해하기
  - Enter: 요소가 추가된 상황
  - Update: 요소가 갱신된 상황
  - Exit: 요소가 지워진 상황
- 축 그리기: d3.axisLeft(), d3.axisBottom()

### Coding
- d3.csv('URL', function(err, data))
- root = d3.select('svg')
- x = d3.scaleLinear().domain([0, 1]).range([0, W - L - R])
- y = d3.scaleLinear().domain([0, data.length]).range([0, H - T - B])
- root.select('.x-axis').call(d3.axisBottom().ticks(5).scale(x))

> 단항 Plus 연산자는 숫자로 변경하는 가장 효과적인 방법이다. feate MDN
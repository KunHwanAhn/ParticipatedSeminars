# Why Typescript with clean architecture
- 정유진, 레이니스트(뱅크샐러드)

## Microservice Architecture
- 자신만의 전문적인 분야를 독자적으로 처리

## 헙업에서 중요한것은?
- `올바른 관점`을 다같이 공유하는 것

### 협업하면서 나온 문제점
- 서로가 만든 코드를 해석하기 어렵다
- 당사자가 아니면 유지보수에 공수가 크다
- 코드리뷰를 해도 스타일 밖에 지적되지 않는다.
- 등등...

> API호출 -> 모델화 -> 로직처리 -> 출력, 실수하기 쉬운 Javascript

## Type 기반 + 웹 개발이 가능한 언어
- Typescript

## Domain Driven Design
- 핵심이 되는 도메인을 지속적으로 정의하고 해당 도메인을 중심으로 소프트웨이러르 설계하는 것
- Entity - UseCase - Controller - UI
- `Entity + UseCase`: 도메인 영역, 도메인 전문가화 합의한 중심영역
- `Controller`: 비지니스 로직 영역, 서비스가 젱하는 기능이 구체적으로 정의도고 도메인 데이터를 제어하는 곳
- `UI`: View 영역, 서비스의 End Point, 제품의 디자인, 표현의 매개체, View Library 등에 의존적

## 빠른 개발 퍼모먼스?
- 서비스의 변화의 따른 코드의 변화를 최소하하는 것

## Typescript & Clean Architecture
- [Sample Code](https://github.com/gpeddler/web-clean-architecture)

### Domain 

#### Entity
- 도메인의 핵심 구성요소

#### Repository

#### UseCase
- 도메인 영역의 End-Point
- 실제로 서비스를 이용하는 사용자가 하는 행동을 정의

### Data

#### Repository
- 도메인 영역의 Repository 기능 구현
- 필요한 Data Source가 주십되어 구현된다.

### UI
- 유저에게 제공할 UI를 제공하는 곳
- UseCase를 호ㅜㄹ하고 최종적인 표현이 일어난다.

## 정리

### 다양한 지식 통제
- 도메인을 중심으로 설계하여 해결
- 지식이 늘어나거나 변화해도 변하는 부분이 일정하다
- 업무시간 추정에도 일부 도움이 되었음

### 올바른 관점 통일
- DDD를 통해 코드베이스의 명확한 중심이 생김
- 사실과 해석을 구분할 수 있게 되었다.
- 코드 리뷰에 변화가 생겼따.

### 실수를 최소화 할 수 있는 개별환경
- Typescript로 보다 안전한 코드 베이스를 만들었다.
- Layered Architecture로 참조관계가 명확해지니 부분적으로 Test가 가능해졌다.

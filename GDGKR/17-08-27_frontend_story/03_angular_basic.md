# Angular 기본 개념 잡기
- 한장현

## Angluar는 AngularJS와 다르다.
- TS를 도입하면서 프레임워크 이름 변경, `Angular`
  - 정기적인 버전업 => 버전 숫자가 빠르게 증가
  - 철학은 비슷, 개발 방법도 비슷
  - 버전 정책은 SemVer
    - 숫자에 겁먹을 필요는 없다. ~이미 v5.0.0 나왔음..~

## Angluar는 종합 프레임워크다
- 전체를 아우르는 구조를 제공
  - 경쟁 프레임워크와 가장 큰 차이
  - 뷰, 데이터 풀, 폼, 라우터, HTTP 애니메이션(+머티리얼 디자인), 서버 사이드 렌더링, CLI, 테스트
- 각 모듈의 정합성, 자연스러운 데이터 연결이 보장
  - MEAN 스택에서 MEAN 스택에서 JSON 객체 사용이 자유로운 거소가 비슷한 느낌

## 프론트엔트 SPA(Single Page App)
- 페이지 내부에서 라우터로 뷰를 전환
  - 전통적인 HTML 페이지 전환 방식과 다름
- 해당 주소일 떄 동작하는 컴포넌트를 등록
  - 자식 라우터를 사용하면 딥 링크도 가능

## TypeScript
- JavaScript 상위 집합(Supoerset)
  - JavaScript + @
  - 정적 타입, 제네릭, 인터페이스, TSLint
- @어노테이션 === 함수
- Angluar 프레임워크에서 지원
  - 함수 타입, 변수 타입 제공
  - 기본 TSLint도 구성

## 컴포넌트 기반
- 추상화된 DOM 엘리먼트
  - 템플릿 + 클래스 코드 (+ 스타일, 테스트 스펙)
  - DOM에 직접 접근하는 것은 지양
- 어노테이션으로 Angluar 컴포넌트 등록
  - 객체 생성, 주입은 Angluar가 관리
  - 라이플싸이클 지원(생성 - 변화감지 - 종료) <- 질문거리 1. Dirty체크... Async 한 동작으로 작업이 종료 된 뒤에 감지를 못한다...
- 컴포넌트의 조합, 트리로 구성

## 데이터 바인딩
- AngularJS에서 가장 인기있었던 기능
  - 성능 향상을 위해 단방향 바인딩이 기본
  - 양방향 바인딩도 가능
- 프로퍼티 바인딩: <span>{{ title }}</span>, <img [src]="imagePath"/>
- 이벤트 바인딩

## 옵저버블
- Push Model Data Stream Publisher
- 콜백 체인 -> Promise 체인 -> Async 체인 -> Observable 체인
- RxJS 내장
  - 기본 패키지에 포함
- 데이터 스트림에 사용
  - Everything is stream?
  - 키보드 입력 이벤트, 서비스 상태 전달에 적합
  - HTTP는? HTTP 단일 통신은 연속된 이벤트가 아니기에, Stream 보다는 Promise가 더 적합
  - WebSocket에 더 어울림

## 서비스를 의존성으로 주입한다
- 컴포넌트를 연결
  - 전역 데이터 풀로 활용
- 의존성 주입기가 인스턴스를 생성하고 주입
  - 생성 방법을 등록하면 컴포넌트에서 선언만 하고 사용
  - 인스턴스 생성 방법을 신경 쓸 필요가 없음
  - 컴포넌트처럼 의존성 구성 가능
  - 더미 객체를 사용하는 단위 테스트에 유리

## 모듈화 지원
- ES6 모듈의 연장, 대체는 아님
  - export, import 사용
  - import로 불러오고 @NgModule에 등록
- Angluar 모듈: @NgModule
  - Angular에서 제공하는 모듈: import
  - 사용자가 만든 컴포넌트: declarations
  - 객체 생성이 필요하면: providers
  - 시작 컴포넌트는: bootstrap

## CLI 지원
- Command Line Interface
  - 프로젝트 기본 틀 생성 + 구성요소 추가 + 서버 실행 + TS Lint + 테스트 + 빌드 + 배포 자동화
  - CLI 버전에 따라 기본 구성이 달라짐
- CLI는 과정을 단순화 할 수 있음
  - npm => IDE => grunt => mocha => AWS
  - Angular CLI!

## 최신 트렌드
- 웹 컴포넌트
- PWA
- 크로스 플랫폼
  - 웹, 모바일, 네이티브 앱, 데스크탑 애플리케이션
    - 네이티브 앱: [IONIC](https://ionicframework.com/), [NativeScript](https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular)

> IONIC은 내장으로 렌더링, NativeScript는 Native로 렌더링

- 리액티브 프로그래밍
- 서버 사이드 렌더링
- 머티리얼 디자인
- Angular CLI
- Augury
  - Chrom 확장으로 제공하는 Debugging Tool

## 지금 공부할 것, 그리고 미래 공부할 것

### 지금 공부해야 할 것
- TypeScript
- Angular 프레임워크
- 컴포넌트 기반 아키텍트
- 리액티브 프로그래밍
  - Streaming Observable

### 앞으로 공부해야 할 것
- WebPack 최적화
  - Angluar 빌드시 내부에서 사용한다.
- 서버 사이트 렌더링 & 검색 엔진 최적화
- 머티리얼 디자인 & 애니메이션

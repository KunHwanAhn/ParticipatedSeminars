#  Angular로 프론트엔드 개발 레벨 업!
- 고재도, 카카오 뱅크

## JavaScript의 역사
ECMA-262 1st edition => ECMA-262 3rd edition(1.5) => ES5 => ES6 => ES7

## JavaScript Library/Framework
- 2008, dojo toolkit
- 2010, JQeury
- 2011 Sencha, Ext JS
- 2012, Angualr.js, Backbone.js
- Now, React, Vue.js, Angular

## Canvas, JavaScript OOP

## dojo toolkit
- 프레임워크 기반 개발 방법
- UI 컴포넌트에 대한 이해
  - Tab, DnD, Tree, Panel etc...

## jQuery, DOM & ajax
- CSS 선택자
- 다양한 DOM 조작방법 & 이벤트 처리
- 크로스 브라우징
- 서버로부터 데이터를 가져오기 위해 ajax 메소드 사용
  - HTTP
  - Server - Client

## Sencha, Ext JS
- 클래스 시스템
- Modularity, 재사용 가능한 단위로 그룹
- Template
- Data Model
- Layout
- Grid Component

## Angualr.js by Google
- MVC 구조
 - Model = JS Obejct
 - View = DOM
 - Controller = JS Function
- 의존관계 주입, Dependency Injection
- 지시자

## 폴리머, Polymer
- [webcomponents.org/](https://www.webcomponents.org/)
- Custom Element: 새로운 엘리먼트의 정의, 기존 엘리먼트의 확장
- HTML Imports: HTML, CSS, JS를 로딩하고 싶다면?
- Shadow DOM: 캠슐화된 DOM, CSS의 스코프 분리
- Template: 네이티브로 지원되는 템플릿

## 컴포넌트
- 명세(Specification)를 가진 다시 사용할 수 있는 소프트웨어 구성요소
- 애플리케이션의 기본 구성 요소로 HTML 요소들을 포함

## Angular
- 2.0.. 삽질
- 4.0 쓸만하네?

### 타입스크립트
- ECMAScript 5 < ECMAScript 6 < TypeScript
- Superset of JavaScript => JavaScript + Static Types

> DOM이 하는 일이 무엇인지 잘 알고 있어야 한다.

## MVC에서 컴포넌트 기반으로
- Stateless 컴포넌트도 있지만, State를 갖고 있는 컴포넌트도 있다 => State 관리의 중요점
  - React => Redux, Mobx
  - Vue.js => Vuex

### 컴포넌트 계층 구조간 커뮤니케이션
- 부모 -> 자식: Property
- 자식 -> 부모: Event
- 자식 <-> 자식: Service

### 라우터를 통한 SPA 개발

### RxJS - Reactive Programming
- 프로그램 패러다임
- 비동기 데이터 스트림을 만들고 변형
- Observable과 함께 프로그래밍하는 것을 의미

> T자형 인재 => A자형 인재, 특정 분야에 대한 깊은 지식 + 커뮤니케이션 + 다양한 분야에 대한 상식과 포용력

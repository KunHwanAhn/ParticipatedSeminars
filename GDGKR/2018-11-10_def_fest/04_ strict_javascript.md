# Use JavaScript More Strictly (feat. TypeScript, flow)
- 이웅재, Studio XID, Inc

> Human Error => Bug

## Type System?
- JavaScript에는 타입이 엇나요? JavaScript의 데이터 타입은 실행 중에 저해지고, 자유롭게 변경된다.
- JavaScript는 느슨한 타입(Loosely type)언어, 동적인 언어(Dynamic)라 한다.

## Static Type Checker
- Flow VS TypeScript

### Flow
- v0.1.0 / 2014, Nov
- v0.86.0 / 2018, Nov
- 타입 체크만 함
- Compile: JS Runtime에서 사용가능하도록 타입체크를 위한 문법을 제거하는 일

### TypeScript
- v0.8.1 / 2012, Nov
- v3.x / 2018, Nov

## JavaScript 컴파일
- 런타임에 동작 가능한 자바스크립트 소스를 만들고, 최적화하는 일
- 전통적인 컴파일과는 다른 점이 있지만, 어쨋든 컴파일에 하는 행위는 `정말 실행할 자바스크립트`를 만드는 과정이다.
- 바벨 / 웹팩 사용하는 사람

## Library의 Type은?
- flow-typed와 @types

### Flow
- flow-typed란 레포지토리에서 관리하고 사용하고 있음
- 838개

### TypeScript
- 3rd Party 매니저들을 지나 npm 패키지로 제공되고 있는 숫자가 4000여개 이상
- https://github.com/DefinitelyTyped/DefinitelyTyped

## Nominal typing VS Structural typing

### Flow
- 함수 및 클래스가 JavaScript에서 이미 사용된 방법에 따라 결정
- 자바스크립트는 객체 지향적 특징과 함수형 특징을 둘다 갖딤
- 클래스는 객체지향적 특징에 따라 명목적 타이핑
- 함수와 객체는 함수형의 경향에 따라 구조적 타이핑

### TypeScript
- 구조적 타이핑을 따르고 있음

## 선택?

### Flow
- 리액트와 함께 많이 쓰이고 있음

### TypeScript
- 전체 프로젝트를 타입스크립트라는 언어 하에서 좀더 엄격하게 타입 시스템을 적용하고 활용하고 싶을 때

> Type Check는 단지 실수를 방지하면서 문법적으로 안전하게 해주는 하나의 노력

## tsconfig - strict
- 모든 Strint type checking 옵션을 활성화
- No Implicit
- Strict
- Always Strict

### noImplicitAny
- 명시적이지 않게 any 타입을 사용하여, 포현식과 선언에 사용하면 에러를 발생

#### suppressImplicitAnyIndexErrors
- noImplicitAny를 사용할 때

#### noImplicitThis
- 첫 번째, 인자에 this가 들어올 때

### Strict

#### strictNullChecks

#### strictFunctionTypes

#### strictPropertyInitialization

### Always Strict
- 일반적인 JavaScript의 `'use strict'`

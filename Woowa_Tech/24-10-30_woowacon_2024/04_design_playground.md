# 디자인 시스템 문서를 생동감 있게 만들기 위한 '우아한플레이그라운드' 제작기
- 추용혁님 / C트랙

## 우아한플레이그라운드
- 디자인 시스템 컴포넌트를 브라우저 환경에서 직접 테스트해볼 수 있는 환경
- 코드와 프리뷰로 나뉘어져 있는 페이지

## 우아한플레이그라운드가 필요했던 배경
- 어드민용 공통 컴포넌트 라이브러리
- 클레이 블루 - 버튼, 카드, 인풋 등의 기본 시스템을 제공하는
- 몰드 어드민 - 어드민 공통 컴포넌트

### 공통 컴포넌트 사용법을 찾아서
- 문서 사이트
  - 코드에 대한 예시는 없고, 정책에 대한 내용만 있음
- StoryBook
  - 코드 예시는 있지만, 원본 데이터를 자세히 보는데에는 한계가 있음
- 실제 코드에서 사용하는 예시를 살펴보기
  - 코드들을 수정하면서 코드 변경 예시에 대해서 예측과 확인이 어려움

> 공통 컴포넌트는 패턴화되어 있어서 복잡한 UI를 빠르게 구현할 수 있지만, 러닝커브가 많이 필요함

### 갖고 잇는 문제점
- 직관만으로 컴포넌트의 이름과 UI를 매칭하기 어려움
- 상위/하위 관계로 맺어져 있는 컴포넌트들의 사용법을 익히는 것도 쉽지 않았음

### 해결법
- 다양한 예시 코드를 제공해주는 것 -> 사소한 케이스까지 포함해서 모든 것을 보여주기 어려움
- 실시간으로 편집하면서 결과물을 볼 수 있다면? => 우아한플레이그라운드 만들어보자!

## 구현

### 요구사항
- 에디터 - 코드를 편집할 수 있어야 함
- 프리뷰 - 코드를 편집하면 실제 화면을 렌더링해야 함
- npm 라이브러리 import 할 수 있어야 함
- 브라우저에서 TypeScript & JSX 문법 처리가 가능해야 함
- IDE에서 사용하던 것처럼 IntelliSense가 되어야 함
- In-Memory 파일 시스템

### 에디터와 프리뷰
- 에디터 - monaco-editor
  - VS Code의 기반이 되는 오픈소스 에디터
- 프리뷰 - iframe
  - srcDoc 속성 = HTML 콘텐츠를 문자열로 전달하여 렌더링할 수 있음

### npm 라이브러리 import
- 브라우저에서의 module resolution
- 브라우저는 file system이 없음
- ESM 기반의 CDN인 esm.sh에서 npm 라이브러리 로드
- importmap을 사용하여 esm.sh로 매핑
  - subpath 매핑을 위해서는 trailing slash 활용하면 가능

### TypeScript와 JSX 문법 지원
- 브라우저는 JavaScript만 이해할 수 있지 않나요?
  - 브라우저가 이해할 수 있는 JavaScript로 변환하는 것이 필요.
- JavaScript 트랜스파일 도구
  - @babel/standalone
    - 번들링 기능 - X
  - esbuild-wasm
    - 번들링 기능 - O
  - @swc/wasm-web
    - 번들링 기능 - X
- esbuild-wasm을 사용하여 JS를 트랜스파일하기로 결정

### TypeScript Intellisense
- monaco-editor에서 제공하는 기능이 있음
- 정적분석은 Server <-> Client 구조로 동작하도록 되어 있음
  - 브라우저 내부에서 Server/Client 모두 실행하고 있음
- react/jsx-runtime을 찾지 못하는 오류 -> 브라우저 런타임엔 파일 시스템이 존재하지 않음, 어떡하죠?
  - TypeScript Language Server를 수정해서 런타임에서 메모리에 있는 정보를 읽도록 Override 필요
- TypeScript Compiler API - preProcessFile로 참조 추출하기
- npm 패키지 추가/제거를 위한 폼을 추가해서 받을 수 있도록 UI 추가

#### Recap
- node_modules 대체를 위해서 TypeScript Language Server Override
- npm 라이브러리 타입 정의 파일(d.ts)
- 참조하는 다른 타입 파일을 재귀적으로 다운로드

### In-memory 파일 시스템
- 매번 반복되는 코드를 생략하자.
  - createRoot()...
- 간단한 read/write 연산 제공하기
- esbuild가 in-memory 데이터를 제대로 읽지 못하는 현상 발생

#### esbuild의 번들링 과정
- input -> resolve -> load -> output
- load 단계에서 인식을 못하는 것
- onResolve & onLoad 추가 플러그인을 사용하여 해결

### 구현 후 복잡해진 기능들
- 연관도를 기준으로 응집

### 플레이그라운드의 두가지 사용 방식
- 컴포넌트 라이브러리로서
- 웹페이지 embedding 용도로서

### 외부에 공유하기 위한 방법
- URL을 생성하여 공유하자
- encoding: lz-string => base64
- decoding: base64 => lz-string

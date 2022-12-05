# 내 import 문이 그렇게 이상했나요?
- [Youtube](https://youtu.be/mee1QbvaO10?t=77)

## 우리를 괴롭히는 에러 메시지들

### Unexpected token import
```
SyntaxError: Unexpected token import
({"Object.<anonymous>":function(module,....){import {
```

### require() of ES Module / ERR_REQUIRE_ESM
```
Uncaught: Error: require() of ES Module
/Users/Foo/dev/.../index.js not supported.
Instead change the require of index.js in null to a dynamic import() which is available in all CommonJS Modules.
{
  code: 'ERR_REQUIRE_ESM'
}
```

## 발표 주제
-  우리의 import 문은 왜 이상할까?
- 어떻게 하면 올바른 import 문을 쓸 수 있을까?

## CommonJS
- 이상한 import

### 모듈 시스템 없는 JavaScript
```HTML
<!-- 전역 jQuery 객체를 정의 -->
<script src="https://cdn.com/jquery.js"></script>
<!-- 전역 lodash 객체를 정의 -->
<script src="https://cdn.com/lodash.js"></script>
<!-- 전역 객체를 참조하여 사용 -->
<script>
  jQuery(document).ready(function() {
    lodash.get(obj, 'foo');
  })
</script>
```

### CommonJS 모듈 시스템
```JavaScript
const jQuery = require('jQuery');
const lodash = require('lodash');

jQuery(document).ready(function () {
  lodash.get(obj, 'foo');
});
```

```JavaScript
// add.js
exports.add = function (a, b) {
  return a + b;
}

// main.js
const { add } = require('./add.js');
console.log(add(1, 2));
```

### 모듈 시스템의 행복
- `파일 단위`의 개발
- 수백개, 수천개 JS 파일로 분리 가능
- 손쉬운 라이브러리 함수 재사용

## 가짜 import의 비밀: TS 또는 Babel
- TSC/Babel의 트랜스파일링
```JavaScript
// 트랜스파일 전
import React from 'react';

// ts or babel에 의한 트랜스파일 후
const React = require('react');
```

> 우리의 import-export는 가짜였다

## CommonJS의 문제점

### 언어 표준이 아닌 CommonJS
- node.js
- 브라우저나, deno에서는 사용이 불가능

#### 문제점 1. 정적 문석의 어려움
- `require()`는 말 그대로 함수이다

```JavaScript
if (SOME_CONDITION) {
  React = require('react');
}

require(SOME_CONDITION: 'foo' : 'bar');

const originalRequire = global.require;
originalRequire(...);
```

#### 문제점 2. 비동기 모듈 정의 불가능
- JavaScript 비동기 실행과 궁합이 좋지 않음

```JavaScript
let isInitialized = false;

exports.initialize = async function initialize() {
  if (isInitialized) {
    throw new Error('이미 initialize 했습니다.');
  }

  await connectToDB();
  isInitialized = true;
}

exports.readFromDB = async function readFromDB(...args) {
  if (!isInitialized) {
    throw new Error('먼저 initialize를 호출하세요.');
  }
}
```

#### 문제점 3. 조용한 require 함수 재정의
- Jest 프레임워크 내에서도 비슷하게 재정의하는 부분이 있음
```TypeScript
const defaultRequire = global.require;

const myRequire = (request: string) => {
  ...
}

global.require = myRequire;
```

## ECMAScript Moduels (ESM)

### ESM 문법
```JavaScript
// add.js
export function add(x, y) {
  return x + y;
}

// main.js
import { add } from './add.js';
console.log(add(1, 2));
```

### 쉬운 정적 분석
- JavaScript 파일이 참조하는 파일에 대해서 쉽게 알 수 있음
- import / export는 키워드이기에 재할당이 불가능함
```JavaScript
// 틀린 코드 1
if (SOME_CONDITION) {
  import React from 'react';
}

// 틀린 코드 2
import Somthing from SOME_CONDITION ? 'foo' : 'bar';

// 틀린 코드 3
const myImport = import;
myImport React from 'react';
```

### 쉬운 비동기 모듈 (feat. Top-level await)
```JavaScript
const db = await connectToDB();

export async function readFromDB() {
  await db.read();
}

export async function writeToDB() {
  await db.write();
}
```

### ESM은 "언어 표준"
- Node.js(v12+)뿐만 아니라 브라우저, Deno 등에서도 쉽게 사용할 수 있음

## 정리
- **CommonJS**
   - require()
   - 정적 분석 어려움
   - 동기
   - 언어 표준이 아님
- **ESM**
   - import / export
   - 정적 분석 쉬움
   - 비동기
   - 언어 표준

> Node.js 생태계는 ESM으로 가고 있다.

## 우리를 괴롭히는 에러 메시지들의 원인

### 동기 <-> 비동기
- 비동기 -> 동기
   - 호출 가능
- 동기 -> 비동기
   - 사용하기 어려움

### CommonJS <-> ESM
- ESM 프로젝트 -> CommonJS 프로젝트
   - 사용 가능
- CommonJS 프로젝트 -> ESM 프로젝트
   - 사용하기 어려움

#### CommonJS는 import 가능
```bash
$ node
Welcome to Node.js v16.14.0.
Type ".help" for more information
> await import('react');
[Module: null prototype] { Component, Fragment, ... }
```

#### ESM은 require 불가능
```bash
$ node
Welcome to Node.js v16.14.0.
Type ".help" for more information.
> require('ky');
Uncaught:
Error: require() of ES Module
/Users/Foo/dev/.../ky/distribution/index.js not supported.
```

## Node.js에서의 ESM 규칙
- 너무 많은 CommonJS 라이브러리가 있다

### package.json - type: module
#### ~/my-service/node_modules/ky/package.json
```JSON
{
  // ...
  "type": "module"
  // ...
}
```

#### ~/my-service/node_modules/ky/index.js
```JavaScript
// 이 파일은 ESM이다.
export function ky() {

}
```

### package.json - type: commonjs
- type의 기본 값은 `commonjs`이기에 없다면, **암시적으로 CommonJS로 취급**
#### ~/my-service/node_modules/react/package.json
```JSON
{
  // ...
  "type": "commonjs"
  // ...
}
```

#### ~/my-service/node_modules/react/index.js
```JavaScript
// 이 파일은 CommonJS이다.
module.exports = { ... }
```

### .js 파일은 가장 가까운 package.json 설정을 따른다
- CommonJS 패키지 하위 .js파일은 모두 CommonJS
- ESM 패키지 하위 .js 파일은 모두 ESM

### .cjs는 항상 CommonJS, mjs는 항상 ESM이다
- .cjs -> 항상 require()
- .mjs -> 항상 import / export

#### ~/my-service/node_modules/ky/package.json
```JSON
{
  // ...
  "type": "module"
  // ...
}
```

#### ~/my-service/node_modules/ky/script.cjs
```JavaScript
// 이 파일은 CommonJS이다.
const fs = require('fs');
```

## ESM으로 옮기기 어려운 두 가지 이유
- 우리가 사용하는 가짜 ESM
- 성숙하지 않은 생태계

### 우리가 사용하는 가짜 ESM
- 가짜 import와 진짜 import의 차이

#### 문제가 있는 코드
```JavaScript
import { Component } from './MyCompnent'
```

#### 문제가 없는 코드
```JavaScript
import { Component } from './MyCompnent.js'
```

#### Node.js require의 동작
```JavaScript
import { Component } from './MyCompnent'
```
1. ./MyComponent
2. ./MyComponent.js
3. ./MyComponent.node
4. ./MyComponent/index.js

#### Node.js에서 후회하는 10가지 - Ryan Dahl
- 나는 Node.js require()에서 확장자를 명시하지 않아도 되도록 한 결정을 후회한다
- 브라우저 동작과도 맞지 않고, JS파일을 불러오기 위해 몇 번의 파일시스템 접근을 해야 한다

#### 확장자를 포함한 정확한 경로는 필수
- import하는 파일은 반드시 확장자가 명시되어야 한다
- 브라우저에서 import가 동작하는 방법과 동일하다

### 성숙하지 않은 생태계
- 정식 버전에서 ESM 지원 시작 from TypeScript 4.7

#### 현재 틀린 TypeScript 코드
```TypeScript
import { add } from './add.ts';
```

#### 올바른 TypeScript: .js로 import하기
- add.ts만 있다고 해도, **add.js로 import**해야 한다
```TypeScript
import { add } from './add.js';
```

#### TypeScript의 CJS-ESM
- JavaScript
   - .js, .jsx
   - .cjs
   - .mjs
- TypeScript
   - .ts, .tsx
   - .cts
   - .mts

### 라이브러리 지원: subpath import 문제

#### 에러가 발생하는 케이스
```bash
$ node
Welcome to Node.js v16.14.0.
Type ".help" for more information.
> await import('next/app')
Uncaught:
Error: Qualified path resolution failed: we looked for the following paths, but none could be accessed.
```

#### 정상 동작 케이스
```bash
$ node
Welcome to Node.js v16.14.0.
Type ".help" for more information.
> await import('next/app.js')
[Module: null prototype] {
  ...
}
```

> .js 확장자를 명시해야 한다

#### package.json - exports field
- From node.js v12.20
```JSON
{
  "exports": {
    "./app": {
      "import": "./app.js"
    }
  }
}
```

### 라이브러리들의 ESM 대응 필요
- jset, ts-node, yarn => require의 동작을 바꿈

#### jest.mock()이 동작하는 방법
```TypeScript
const defaultRequire = global.require;

const jestRequire = (request: string) => {
  if (isMocked(request)) {
    return mockedModule(request);
  }

  return defaultRequire(request);
}

global.require = jestRequire;
```

#### ts-node
```TypeScript
require('./MyComponent.ts')
```
- TS ---ts-node가 변환---> JavaScript -> require()

#### Yarn의 Plug'n'Play
- 일반적인 node_modules를 참조하지 않음
```JavaScript
require('react');
// ~/my-service/.yarn/cache/react@17.0.1.zip/...
```

## 지금은 어떤 서비스를 옮길 수 있을까?
- TypeScript를 사용하고 있지 않을 때
   - 또는 .js 확장자를 쓰는 것도 괜찮을 때
- 사용하는 라이브러리가 ESM 환경을 지원할 때
   - react, emotion 등 라이브러리는 ESM 지원
- Jest, Yarn PnP, ts-node 등을 사용하지 않을 때
   - CommonJS에 의존성이 큰 라이브러리를 사용하지 않을 때

## 내 서비스를 ESM으로 옮기는 방법

### 패키지를 ESM으로 옮기자
- package.json에 `type: module` 추가
```JSON
{
  "name": "my-service",
  "type": "module",
  // ...
}
```

### 파일 확장자 추가
```JavaScript
// add.js 파일인 경우
import { add } from './add.js';

// add/index.js 파일인 경우
import { add } from './add/index.js';
```

### require() 호출 삭제
```JavaScript
import path from 'path';
import url from 'url';

export default { ... };
```

### __dirname
- 전역변수 사용 지양
```JavaScript
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
```

### 최후의 수단
```JavaScript
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
```

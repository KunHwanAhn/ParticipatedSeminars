# 광고 웹 SDK 개편기 with Preact
- [Youtube](https://www.youtube.com/watch?v=s0hJjmPlNkU)
- [발표자료](https://speakerdeck.com/kakao/gwanggo-web-sdk-gaepyeongi-with-preact)

## 목차
- 광고 웹 SDK 소개
- 개편 목표
- 개편 톺아보기
- Preact 도입
- 개편 그 이후


## 광고 웹 SDK 소개
- 쇼핑몰이나 블로그와 같은 매체에 광고를 게재하고 수익을 창출하기 위해 제공되는 **웹 스크립트**
- AdFit SDK

### 광고 단위란?
- 광고를 노출할 영역

### 광고 요청/응답 과정
- 광고 웹 SDK <--광고 소재--> 광고 서버
- iframe으로 격리된 소재 코드

### 광고 웹 SDK의 주요 기능
- 광고 소재 렌더링
- 광고 지표 수집
- 어뷰징 방지

## 개편 목표
- 변경에 유연하고 이해하기 쉬운 코드
- SDK 프로젝트의 통합
- 테스트 강화
- 최신 기술의 도입

### 변경에 유연하고 이해하기 쉬운 코드
- 하나의 모듈에 연관된 많은 기능들
- SOLID Principles
   - SRP: 단일 책임 원칙
   - OCP: 개방-폐쇄 원칙
   - LSP: 리스코프 치환 원칙
   - ISP: 인터페이스 분리 원칙
   - DIP: 의존성 역전 원칙

### SDK 프로젝트의 통합
- 비공개/공개 SDK 내에 공통 코드 존재
   - 유지보수 비용 증가

### 테스트 강화
- Unit: 커버리지 90%이상
- E2E: 다양한 브라우저 대응

### 최신 기술의 도입
- IE 지원 중단으로 인한 레거시 코드 제거 가능
- Typescript + Preact

## 개편 톺아보기
- 단일 책임 원칙에 충실한 광고 도메인 모델
- 의존관계에 따른 계층 구조
- 렌더링 프로세스
- SDK 프로젝트의 통합
- Unit Test

### 단일 책임 원칙에 충실한 광고 도메인 모델
- 하나의 객체에 모든 기능을 담게 된다면?
   - 코드 복잡도 증가
   - 협업 시 소스 코드 충돌
- 광고 업무 용어를 기준으로 한 도메인 모델 분리

### 의존관계에 따른 계층 구조
- 저수준 모듈 & 고수준 모듈 계층 분리
   - 개방-폐쇄 원칙(OCP), 기능의 확장은 쉽게, 구조의 변경은 최소화
- 저수준 모듈 -> 고수준 모듈. 단방향으로 흐르는 모습으로 설계

#### 광고 소재 스토어 추가
- abstract class `광고 소재 스토어`: `광고 단위`를 전달하고 `광고 데이터`를 응답 받는 중개자
- interface `광고 서버`: `광고 소재 스토어`로부터 `광고 단위`를 받아 `광고 데이터`를 전달
- abstract class `광고 소재`: `광고 소재 스토어`에서 `광고 데이터`로 생성한 광고
- 인터페이스 또는 추상 클래스로 만든 이유는 의존성 역전 원칙(DIP)를 지키기 위해서

#### 의존성 역전 원칙(DIP)의 적용
- 광고 서버 인터페이스와 광고 서버 구현체를 나눔으로써 테스트 시에도 테스트용 구현제를 주입하여 단순해짐

### 렌더링 프로세스

#### 광고 렌더링에 필요한 기능들
- 소재 렌더링
- 렌더링 검증
- 지표 수집
- 등...
- 각각의 함수를 나눠서 구현하기로 결정함

#### 렌더러 함수와 렌더링 파이프라인
- 렌더링 파이프라인: 렌더러 함수라는 인터페이스를 사용할 뿐 기능에 의존하지 않음
- 렌더러 함수 interface: 기능을 구현할 수 있는 함수

### SDK 프로젝트의 통합
- 비공개 SDK 빌드 진입점
```JavaScript
export default new 비공개_SDK(
  new 렌더링_파이프라인([
    비공개_소재_렌더링_함수,
    비공개_렌더링_검증_함수,
    비공개_지표_수집_함수,
  ]),
);
```
- 공개 SDK 빌드 진입점
```JavaScript
export default new 비공개_SDK(
  new 렌더링_파이프라인([
    공개_소재_렌더링_함수,
    공개_렌더링_검증_함수,
    공개_지표_수집_함수,
  ]),
);
```

### Unit Test
- 유닛 테스트 커버리지 목표 90%
   - 유닛으로 다루기 힘든 부분은 E2E로 커버
   - Storybook을 활용하여 커버
- Github & Jenkins를 사용한 자동화된 유닛 테스트 커버리지 검사
- Jest 커버리지 검사 설정
```JavaScript
module.exports = {
  // ...
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    }
  },
  // ...
};
```

#### 의존성 있는 함수 foo 예제
```JavaScript
import { bar } from './bar';

export function foo() {
  const barResult = bar();
  return `if(kakao)${barResult}`;
}
```
```JavaScript
import { foo } from './foo';

test('foo', () => {
  jest.mock('./bar', () => {
    bar: jest.fn(() => 2022),
  });
  expect(foo()).toBe('if(kakao)2022');
});
```

#### 의존성 주입을 사용한 함수 foo 예제
```TypeScript
import { Baz } from './Baz';

// 고차함수로 설계 변경
export function foo(bar: Baz) {
  return () => {
    const barResult = bar();
    return `if(kakao)${barResult}`;
  };
}
```
```JavaScript
import {} from './foo';

test('foo', () => {
  const barMock = () => 2022;
  const fooWithBarMock = foo(barMock);
  expect(fooWithBarMock()).toBe('if(kakao)2022');
});
```

## Preact 도입
- 처음 광고 소재 렌더링을 설계할 때는 렌더러 함수로만 구현하려고 했음
- 충분히 가능한 일이고, 설계시 의도한 부분이었음
- 하지만, DOM요소를 사용하려면 아래와 같은 절차적인 코드가 필요했음
```JavaScript
const parent = document.createElement('div');
const child = document.createElement('p');

child.innerText = 'Hello, World!';
parent.appendChild(child);
return parent;
```
- React에서 제공하는 JSX 기능을 사용하면 개발이 쉬워질 것으로 판단함
```JavaScript
return (
  <div>
    <p>Hello, World!</p>
  </div>
);
```

### 리액트 컴포넌트를 사용한다면?
- 함수와 JSX만으로 컴포넌트를 만들 수 있는 React에 대해서 고민하기 시작함

### 광고의 렌더링을 리액트 컴포넌트로 표현하면?
- DOM 요소의 렌더링을 document.createElement 등으로 생성하거나 별도의 템플릿을 다룰 필요 없이 JSX 문법을 통해 간결한 표현이 가능
- 컴포넌트를 계층 구조로 나눠 복잡한 기능을 작은 컴포넌트로 분산
- 리액트 훅을 사용하면 컴포넌트 로직과 라이프사이클의 관리가 용이
- 리액트 컴포넌트에 익숙한 개발자가 많음
- => 광고 SDK 내에서 UI 관련된 부분이 적지만, 얻을 수 있는 장점이 많다고 판단함

> 리액트를 쓰자니 빌드된 파일의 크기가 커질 것 같은데?
> 3KB, Preact 공식 홈페이지에서 소개하는 크기

### Preact 렌더러 함수 구현
```JavaScript
import { render } from 'preact';

export function preact_렌더러_함수(광고소재) {
  render(
    <Component creative={광고소재} />,
    element,
  );
}
```
```JavaScript
export default new 비공개_SDK(
  new 렌더링_파이프라인([
    preact_렌더러_함수, // preact로 만든 렌더러 함수
    공개_렌더링_검증_함수,
    공개_지표_수집_함수,
  ]),
);
```

### 구현 방법의 풍부함
- DOM 요소로 표현되네? => Component
- 컴포넌트 라이프사이클 또는 상태 로직이 필요해! => Hooks
- 컴포넌트로 구현 안해도 되는 독립적인 기능이야! => Renderers

### Storybook의 활용
- SDK의 렌더링을 확인하고 테스트 할 수 있게 됨
- SDK가 실환경 테스트에서 겪는 어려움
   - Unit 테스트를 통해 어느정도 기능이 동작함을 보장할 수 있으나, 실제 동작하는 모습을 눈으로 확인하기가 어려움

### Storybook이란?
- 컴포넌트를 독립적으로 테스트하며 개발할 수 있도록 도와주는 개발툴
- React, Vue, Svelte부터 Preact까지 다양한 프레임워크 지원
- Unit Test: 자동화 테스트 + 실시간 개발
- E2E Test: 자동화 테스트 + 무겁지만 다양한 브라우저 환경
- **Storybook: 실시간 개발 + 가벼운 실제 브라우저 환경**

## 개편 그 이후

### 순환 복잡도
- 코드의 분기로 인한 경로 개수를 측정해 복잡성을 나타내는 정량적 지표
- 20 또는 25 이하를 유지하면 개발하는 것을 권장함
- 아래 코드의 순환 복잡도 = `P(분기 개수) + 1` = `1 + 1` = 2
```TypeScript
function isOdd(value: number) {
  if (value % 2 === 1) {
    return true;
  }

  return false;
}
```

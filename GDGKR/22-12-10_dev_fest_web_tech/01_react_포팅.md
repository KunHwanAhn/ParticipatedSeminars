# 기존 프로젝트 리액트로 포팅 with Shadow DOM & 모노레포 구성하기 with turborepo & 디자인시스템 배포 ci 만들기
- 한근택

## 목차
- 인프런 대시보드 페이지를 리액트로 분리하기
- 프론트엔드 모노레포 구죽
- 디자인 시스템 배포 파이프라인 구축

## 인프런 대시보드 페이지를 리액트로 분리하기
- 전형적인 SSR + MPA
- HTML FxDOM(Event binding)
- Andman framework (Vanilla JS + node.js)

### 분리 후 페이지 제공
- API + CDN React
- Bulma + Global CSS => Style
   - Style 간섭 발생! => CDN으로 호스팅하다보니 꼬일수밖에...
```html
<html>
  <script src="foo.js">
  <script src="bar.css">
  <script src="baz.css">
</html>
```

### 선택의 시간
- Antman에서 필요한 CSS만 남기고 모두 정리하기 => 불가능
- !important => 수습이 종료될수도...
- React Application 격리하기 => Shadow DOM

### Shadow DOM
- 컴포넌트 레벨로 캡슐레이션이 가능함
```jsx
export default App() {
  return (
    <ShadowRoot>
      <app>
    </ShadowRoot>
  );
}

```

#### 문제들
- Emotion으로 만든 스타일이 적용 안됨
   - ???
   - shaow root에
- Dom QUERY Select 로직 문제
   - app-shaell 패키기 개발하는 것으로 해결
   - App-shell 패키지는 header, footer fhwlr vhgka
   - react application 에서 빌드한 html을 사용함

## 프론트엔드 모노레포 구죽
- 비슷한 성격의 프로제그들이 많아질거라 예상되어, 레포지토리의 형태를 고민함 => monoreop
- 기술적인 이유도 있지만, out of sight, out of mind를 막고 싶었음

### 고민했던 부분
- 패키지간의 의존성이 가시적으로 관리
- 병합되면 패키지가 배포
- 특정 패키지만 선택하여 배포
- CI/CD
- yarn + turporepo

### yarn + turporepo
- monorepo로 구성된 각 패키지의 통합/빌드를 관리하는 것

### Jenkins OOM 이슈 발생
- vite.js memory issue
- turborepo 병렬 처리
- bundle size

#### vite.js memory issue
- vite.js 메모리 과다 사용 이슈가 보고됨

#### turborepo 병렬 처리
- 병렬 실행 시, 사양 지정한하면 풀로 당겨서 리소스를 사용함
- --concurrency 옵션을 사용하여 성능 제한
   - --concurrency=30% => 30%만 사용
   - --concurrency=1 => 1개만 실행

#### bundle size
- 트리 쉐이킹이 잘 동작하지 않은 케이스
- msw, faker.js와 같이 production에 필요하지 않은 패키지 번들에서 제외
- editor에 쓰이는 hightligh.js에서 minor한 언어 플러그인 제외
- 가장 큰 사이즈인 shaka player의 경우 core 모듈이라 생각해 코드 스플리팅 하지 않음
- 탭별로 사용하는 에디터는 코드 스플리팅 적요

#### Design Sysgtem 분리
- 모노레포에서 분리하여 별도의 레포지토리
- ESM형태로 디자인 시스템 제공

## 디자인 시스템 배포 파이프라인 구축
- 바뀐 패키지만 저장소에 배포
- semver로 자동 관리
- 내부 의존성도 자동 관리
- 로그, 릴리즈, 태그 자동 관리
- 트리 쉐이팅을 위한 esm으로!

### 기존의 패키지의 배포 여정
- 코드 변경 -> 리뷰 -> 버전 변경 -> 배포 -> 깃 태그 -> changelog & release 작성
- `코드 변경 -> 리뷰`: 개발자 영역
- `버전 변경 -> 배포 -> 깃 태그 -> changelog & release 작성`: 자동화가 가능한 영역
- changeset: 모노레포 패키지 버전 관리 도구

### 내부 의존성 문제
- B패키지의 버전이 오를 때마다 왜 A 패키지의 메이저 버전이 bump up 되는 거지?
- peer dependency: 라이브러리를 사용하는 측에서 필요한 종속성
- ~~RTFM, Read the fucking manual~~
- 패키지를 다른 패키지의 피어 의존성으로 설정하면, 이로 인해 피어 의존성을 소유하고 있는 메이저의 버전이 증가함
- account에서 icon, button 등을 사용할 생각에 피어 의존성으로 하고 중복 설치를 막고자 단순 접근 => icon, button 등을 모두 모달에 포함해 빌드하는 형태로 수정

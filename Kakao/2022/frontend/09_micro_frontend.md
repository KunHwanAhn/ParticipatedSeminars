# 마이크로프론트엔드. 실무에 쓸만할까?
- [Youtube](https://www.youtube.com/watch?v=DOS0YPwdnhk)
- [발표자료](https://speakerdeck.com/kakao/maikeuro-peuronteuendeu-silmue-sseulmanhalgga)

## 목차
- 언제 마이크로 프론트엔드 구조를 적용해야 할까?
- 카카오워크 FE 개발팀은 어떻게 하고 있을까?
- 정말로 중요한 것들

## 언제 마이크로 프론트엔드 구조를 적용해야 할까?

### MSA가 UX관점에서 올바른 것일까?
- 개발자가 만든 서비스
- 사용자가 가입한 서비스

### 배포 주기의 문제
- 웹페이지로 만들어져 있음에도, 다른 부서의 앱과 연결되어 있어 앱의 심사를 받아야 하는 번거로움이 있었음

### 디펜던시의 업데이트 대응
- 서비스 - 신규 기능의 개발
- 코드 - 리팩토링 & 최신화

## 카카오워크 FE 개발팀은 어떻게 하고 있을까?

### 프로젝트 분리
- 서비스는 항상 유지보수해야 하고 공사를 해야 한다
- 공사하는 중에는 티가 나면 안된다
- AS-IS: Npm + webpack
- TO-BE: pnpm + turborepo + vite

### 서버 사이드 라우팅
- 런타임 시 통합

#### 컨테이너
- 웹 컴포넌트 + 워크스페이스 환경 앱
- 컨테이너: 웹 컴포넌트로 개발
- 서비스 앱: 일반적인 웹 프레임워크 앱

##### 웹 컴포넌트
- 프레임워크로부터 독립적
- prop을 설정할 수 있다
- 이미 빌드된 상태. 런타임에 바로 사용 가능
- 앱과 관계없이 업데이트 가능
- children을 가질 수 있다
```jsx
// app.tsx / app.vue / app.svelte
<work-container routes={devRoutes}>
  <WorkSpace />
</work-container>
```

## 정말로 중요한 것들
- 속도
   - 개발 속도: 서비스 스케일이 커지고 개발자가 많아졌을 때, 도입을 고려
   - 로딩 속도: 관리자 서비스는 빠른 로딩보다, 빠른 피쳐 딜리버리가 중요
- 늙지 않는 코드
   - 관리되지 못한 코드는 아무도 건들고 싶지 않은 프로젝트가 됨
   - 이로 인해 점점 도태되는 서비스가 될 수 있음
   - 코드가 분리되어 있기 때문에 짬짬이 코드를 개선할 수 있음

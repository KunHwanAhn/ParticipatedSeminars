# Tooling for Progressive Web Apps: Lighthouse and More
- 장기효

## Lighthouse?
- 워싱턴포스트 61 VS 뉴욕타임즈 50
- 웹 페이지 성능 측정 도구
  - Progressive Web App
  - 객관적 수치

## 설치
- Chrome Extension
- NPM node moudle: npm install -g lighthouse
  - Node LTS 권장
  - lighthouse {{ TEST_URL }}

## PWA 주요 지표
- Offline이어도 정상적으로 동작하는가
- 페이지 로딩이 빠른가
- Secure connection
- 홈스크린에 추가할 수 있을 것인가?
- 반응형 웹 디자인
- 다른 주요 브라우저(Firefox, Safari)에서 테스트가 되는가

> Lighthouse가 성능 향상에 대해서 진단은 해주지만, 이를 목표로 하는 것이 아니라, 항상 사용자 경험을 개선하기 위해서 노력해야 한다.
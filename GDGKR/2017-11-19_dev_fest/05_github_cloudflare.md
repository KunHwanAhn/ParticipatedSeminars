# Github와 CloudFlare를 이용한 무료 고성능 웹 어플리케이션 호스팅
- 박병진

> 서비스에 맞는 기술을 선택해서 개발해야 한다

## 웹 어플리케이션 구성
- HTML
- CSS
- JavaScript
- WAS(Web Application Server)
- Database

## 웹 어플리케이션
- SPA(Single-page Application)
- 클라이언트 디바이스의 성능 향상과 함꼐 서버의 로드를 클라이언트에게 전과하여 서비스의 전체적인 성능 향상
- API서버와 통신하여 데이터를 표현하는 역할을 수행
- CDN(Contents Delivery Network)

## JAM Stack

### Waht is JAM stack?
- JavaScript, API, Markup
- 모던웹 개발을 하기 위한 구성

### JS
- 모든 동적인 처리를 프론트엔드 단에서 자바스크립트로 수행
- JS Framework

### APIs
- 모든 서버단 처리는 재사용 가능한 API로 추상화
- Custom-built API / 3rd-party API

### Markup
- 배포시 빌드 가능한 마크업 템플릿 엔진 사용
- Jekyll

## What is Static Site Generator?

### 컨텐츠와 스타일의 분리
- 템플릿 엔진 기반으로 미리 웹 사이트 레이아웃 구성

### StaticGen
- Netlify에서 운영하는 오픈소스 Statics Stie Generator 랭킹 페이지

## JAM Stack의 장점
- `Better Performance`: CND을 활용시 컨텐츠 캐싱이 쉬움, 전세계 엣지를 통해 글로벌 확장 용이
- `Low Cost`: 운영을 위한 웹 서버가 불필요, 정적파일 호스팅 환경만 필요
- `Higher Security`: 비지니스 로직 처리는 API에게 위임, CDN을 활용시 쉽고 안정적인 HTTPS/SSL
- `Better Developer Experience`: 데이터와 로직의 분리

## Best Practice
- [jamstack.org](https://jamstack.org/)
- 모든 프로젝트는 CDN에 업로드
- 배포시 CDN 캐시는 즉시 폐기
- 배포는 모든 변경 파일이 업로드 완료 시에 적용
- Git으로 버전관리를 하고 단일 표준 명령여로 어플리케이션 빌드
- Babel, PostCSS, Webpack과 같은 모던 빌드 도구 활용하여 최신 JS 문법 사용
- 빌드 자동화로 JAM Stack 마크업 변경사항 실시간 확인

## Deployment
- Github Pages + CloudFlare
- Netlify
- AWS S3 + CloudFront

### Github Pages + CloudFlare

#### Github Pages
- Github 사용자의 Static Web Site 호스팅 무료 제공
- github.io 도메인을 이용하여 HTTPS/SSL 지원
- Jekyll 기반의 기본 템플릿

##### 사용제한
- Github 저장소 1GB 사용 제한 / 월 100GB 대역폭 제공 / 시간당 10개 빌드
- 빌드가 필요한 경우 빌드 겨로가물을 특정 디렉토리 혹은 브랜치에 보관 필요

#### CloudFlare
- 역방향 프록시(Reverse Proxy) 역할 수행
- 무료로 전세계 CDN 및 SSL 인증서, 그리고 DDoS 방어 서비스 제공

##### 사용제한
- 개인 도메인을 소유하고 있어야 하며, 네임서버를 CloudFlare로 설정 필요

### Netlify
- Github / BitBucket / Gitlab과 연동 및 쉬운 프로젝트 호스팅 제공
- 무료로 CDN 및 SSL 인증서 지속적인 배포 제공
- 공식 API 및 CLI 도구 제공

#### 사용제한
- 개인 도메인을 소유하고 있어야 하며, 네임서버를 Netlify로 설정 필요

### AWS S3 + CloudFront
- AWS 클라우드 인프라 상에서 서비스를 운영하는 경우

## DEMO
- Github + CloudFlare
- Netlify

## 요약
- 서비스의 목적에 맞는 웹 기술 스택을 선택하자
- 목적과 맞다면 웹 서비스 설계시 JAM Stack을 고려하자
- 세상 좋은 무료 서비스 참 많다

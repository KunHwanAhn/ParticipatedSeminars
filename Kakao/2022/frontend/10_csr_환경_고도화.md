# 카카오페이 프론트엔드 개발팀의 Client Side Rendering 환경 고도화
- [Youtube](https://www.youtube.com/watch?v=CUSy500EuDs)
- [발표자료](https://speakerdeck.com/kakao/kakaopei-peuronteuendeu-gaebaltimyi-client-side-rendering-hwangyeong-godohwa)

## 목차
- CSR 개발 환경
- 만났던 이슈들

## CSR 개발 환경

### 2018년과 2022년의 프론트엔드 개발팀
- 2명 <=> 40명+
- 서비스 개발 <=> 서비스 개발 & 환경 고도화

### FE 인프라 TF
- 효율적이고 안정적인 서비스 운영을 위한 전반적인 FE 환경 개선
- Client Side Rendering 환경 개선과 관련된 이야기
   - 공통 서버 개선
   - 빠른 배포
   - 빠른 롤백
   - FE 서비스 RC 배포
   - Open Graph 운영성 업무

### 우리가 늘상 겪는 상황들
- 프론트엔드 서비스를 제공하는 서버의 운영이 너무 어려워.. 운영이 용이한 환경으로 바꿔야할 때가 온 것 같은데
- 빠르게 핫픽스를 나가야 하는데, 배포하는데 시간이 너무 오래 걸리네
- 새로운 기능을 퍼블릭 오픈하기 전에 운영 환경에서 최종 확인하고 싶은데
- SNS에서 페이지 미리보기가 제대로 나와야 잠재 사용자를 끌어올 수 있는데, CSR 환경에서는 이 작업이 너무 번거로워

## 만났던 이슈들
- 유연한 운영이 어려운 기존 프론트엔드 서비스 제공 환경
- 프론트엔드 서비스 배포-롤백에 오랜시간 소요
- 퍼블릭 오픈 전 기능 최종 확인 수단의 부재
- 외부 트래픽을 전이시키기 위한 운영성 개발업무 존재

### 유연한 운영이 어려운 기존 프론트엔드 서비스 제공 환경
- 2018년에는 아주 간단한 정적 파일 서버
- 2022년에는 인증,SEO,기타, 서비스 개수 등 복잡한 서버
- 현 상황에 맞는 신규 환경 구성이 필요하게 됨

#### 신규 환경 구성 후보
- Static Web Hosting
   - 공통 기능 제공 부분에 대한 고려 필요
- Server Side Rendering
   - 전체 서비스에 대한 마이그레이션 작업 필요
- Serverless
   - 전체 서비스에 대한 마이그레이션 작업 필요
- **큰 틀에서 기존과 동일한 환경구성**
   - 서비스 개발자들에게 과도한 마이그레이션 부담을 주지 말자
   - 기존과 유사하지만 서버 관리 부담이 적은 환경을 구축하자

#### 공통 서버(Legacy)의 관리가 어려웠던 이유
- 물리 서버로 구성되어 있음
   - 트래픽이 늘어나는 경우 물리적으로 서버를 늘리고, 관리해야 하는 포인트가 늘어남
- 서버 내부에 산출물이 보관되어 스케일링 시, 서버별로 다른 버전이 있을 가능성이 있음
- **Container 기반 아키텍처로 변경**

#### Container 기반 아키텍처로 변경
- 서버 내부에 보관되던 산출물을 별도 공간으로 분리
- 서비스 개발자들에게 과도한 마이그레잇녀 부담을 주지 않는 방식
- Kubernetes(k8s)
   - 컨테이너화된 애플리케이션의 관리를 도와주는 오픈소스 시스템
   - 점진적 롤아웃을 통한 안정적인 무중단 배포 가능
   - 간편한 Sacling 지원
- 개발 편의성, 운영 안정성 확보

### 프론트엔드 서비스 배포-롤백에 오랜시간 소요
- Git 저장소 -> 패키지 매니저 -> 빌드 -> 배포
- 패키지 매니저의 의존성 설치 시간이 매우 오래걸렸음
- **Yarn Berry(yarn 2) 도입**
- **외부 저장소에 symlink도입**

#### Yarn Berry(yarn 2) 도입
- Node.js 환경에서 사용 가능한 Package Manger
- Node Module의 Plug'n'Play 지원
   - 효율적인 의존성 관리
   - 예측 가능한 의존성 사용
   - 환경과 독립된 실행 환경 보장
- Yarn Plug'n'Play
   - Package(Node Moduels)를 node_modules 폴더가 아닌, .pnp.cjs 파일로 관리
   - Package 파일은 프로젝트 내 Cache 폴더에 보관되고 Git으로 관리
      - .pnp.cjs는 Cache 폴더의 패키지 파일을 참조
- 업무 효율 향상

#### 외부 저장소에 symlink도입
- symlink는 항상 최신 버전을 가리킴
- 롤백을 하는 경우에는 해당 산출물을 가리키도록 수정
- 운영 안정성 증진

### 퍼블릭 오픈 전 기능 최종 확인 수단의 부재
- Sandbox - 개발
- Beta - 검증
- Production - 운영
   - 운영 이슈 발생 시, 3,800만 유저에게 영향
- **Release Candidate 배포 환경 구성**

#### Release Candidate 배포 환경 구성
- 사용자 계정 기반의 Release Candidate 배포 환경 구성
   - 일반 사용자 --인증 값--> 공통 서버 ----> 서비스 산출물
   - 사내 사용자 --인증 값--> 공통 서버 ----> Release Candidate
- 사내 사용자 대상 `최종 실환경 검증`

### 외부 트래픽을 전이시키기 위한 운영성 개발업무 존재
- 서비스 공유하기 기능
   - 카카오페이 사용자 --서비스 공유하기--> SNS <-- 공유링크 접속 -- 잠재 사용자
- 적절한 URL 미리보기 제공이 중요
- Open Graph를 통한 페이지 정보 정의 필요

#### Open Graph Protocol (a.k.a. OG Tag)
- 소셜 그래프 내에서 웹 페이지를 리치하게 표현하기 위한 프로토콜
- <meata> 태크의 Property와 Cotent를 사용하여 표현
```html
<head>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="페이지 제목" />
  <meta property="og:description" content="페이지 설명" />
  <meta property="og:image" content="/image-url.png" />
</head>
```

#### Client Side Rendering 환경에서의 Open Graph 운영은 어렵습니다
- 서비스마다 하나의 index.html 존재
- 서비스마다 Open Graph 정의 가능
- 페이지마다 다른 Open Graph 적용 필요
- Open Graph로 최대한 리치한 정보 제공
- 경로별 Open Graph 설정 가능하게끔 변경

#### 경로별 Open Graph 설정 가능하게끔 변경

##### AS-IS
- Open Graph를 포함한 Static HTML 페이지를 만들어서 배포
- Static HTML 페이지에 사용자 접속 시 원래 서비스 페이지로 Redirect
- 필요 시마다 Static Page 생성 작업 필요

##### TO-BE
- 경로별 Open Graph 값을 등록할 수 있는 환경 구축
- 사용자가 요청한 경로에 해당하는 Open Graph 값 제공
- **FE 공통 서버에서 경로별 Open Graph를 설정하도록 수정**

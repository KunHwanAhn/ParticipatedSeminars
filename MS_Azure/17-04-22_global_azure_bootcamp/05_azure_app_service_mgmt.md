# Azure AppService로 탄탄하게 관리하기
- 김영재, 바풀 CTO, MS Azure MVP

## 바로풀기 App
- 100% Azure PaaS

## Azure App Service
- Azure의 1순위 서비스 중 하나: WAS 그 이상
  - 기반은 IIS의 서브셋으로 구현
  - Linux Docker 지원 시작
  - 80 / 443 Port만 Open
- 발전 과정
  - WebSite: 단순 IIS스러운 WAS + WebJobs
  - App Service v1: 4개의 App 카테고리로 개편 (Web, Mobile, API, Logic)
  - App Service v2: Azure Function, 부하분산 강화, Linux Docker, ...

## App Service와 아이들
- Web App: 프론트 엔드
  - WebJobs: Web App의 은밀한 보조
- API App: Swagger 쓰면 편리함
- Logic App
- Function App

## 본론에 들어가기 전에
- [Azure 앱서비스 구조를 깊게 살펴봅시다](https://youngjaekim.wordpress.com/2017/04/03/번역-azure-앱서비스-구조를-깊게-살펴봅시다)
- [The New Azure App Service Environment](https://msdn.microsoft.com/en-us/magazine/mt797651)

## App Service 구조
- 언어를 만드는 언어가 있듯, PaaS를 만드는 PaaS가 있음
  - 내부는 Azure Cloud Service(Classic)으로 구현됨
  - 약 1,000rodml tjqjfmf gkskdml `확장 단위`로 관리함
- 확장단위 내에 구성요소 및 역할
  - 프론트엔드: Layer-7 로드 밸런서 + SSL 핸들링
  - 웹 작업자(worker): 유저의 앱을 구동하는 런타임
  - 파일 서버: Azure Blob Storage를 네트워크 디스크로 마운트하는 역할
  - API 콘트롤러: 앱의 실행/정지 등의 명령을 처리
  - Publisher: 앱 배포용 FTP 프로토콜 제공(서비스용이 아님)
  - SQL: 앱 구동 메타데이터 저장
  - Data Role: 내부 캐시(유저가 사용하는 것이 아님)
- Worker(앱 런타임)가 이미 돌고 있는 상태에서 확장 명령에 따라 앱을 복제하여 순식간에 확장
- 확장/축소 완료 후에 로드 밸런서가 트래픽을 분산하므로 유실 없음

### App Service의 네트워크 특성
- 1개의 인/아웃바운드 겸용 + 4개의 아웃바운드 전용 = 총 5개의 IP
- 고정IP 할당 가능. 앱을 정지하면 다른 IP로 바뀔 수 있음.
- 네트워크 주소 변환(NAT)

- App Service Environment(ASE)
  - 독립된 확장 단위를 원할 떄, Premium tier만 사용 가능
  - 일종의 서버팜. 여러 개의 ASP(App Service Plan)를 호스팅
  - 온전히 독립된 네트워크 인프라 설정
  - 100개의 ASP 가능
- ASP(App Service Plan)

## App Service 이해 == App Service Service Plan 이해
- 하나의 ASP에 앱 2개를 띄우면 두 App트래픽을 같은 ASP가 받음
- ASP 2개의 인스턴스로 수평 확장하면 App도 2배(4개)

## 소결론
- `어떤 App Service Plan tier를 만들고 어떤 App을 넣을 것인가`가 중요함

## App Service로 서비스 관리
- App Service Plan 이름은?
  - 프로젝트명-heavy / light / test 용도에 맞춰서 구분하는 것이 좋다

### 참고
- 많은 기능은 App Service외에 별도로 존재

## 배포 슬롯(Deployment Slot)

## 고급 도구 (Advanced Tools), Kudu

## 프로덕션에서 테스트(Testing in Production)
- Slot별 라우팅

## 경고 (Alert)

## 인스턴스당 매트릭(Metrics per instance)

## Application Insights
- 추천 텔레메트리
  - 끝점 별 응답시간
  - 똑똑한 자동 알림
  - 매주 요약 이메일
- 무료도 훌륭함
- 단점: 보존기한 90일
- 좋은 조함
  - Application Insights + New Relic

## Logic App으로 모니터링
- 끝점을 모니터링하다 응답 없으면 Slack으로 알림을 보냅시다
- 주안점
  - 콘솔 없음
  - 코딩 없음
  - 100% PaaS

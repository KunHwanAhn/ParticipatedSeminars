## OTLP
- Open Telemetry = OpenCensus(Google) & OpenTracing(CNCF) 두 프로젝트가 통합
- 언어 독립적인 명세
- 높은 성능과 확장성
- 다양한 백ㄷ엔드 시스템 지원

## OLTP 메트릭
- 데이터독 SDK 의존성을 벗어나기 위해서 API로 제공하는 메트릭

## 커스텀 메트릭
- 사용자의 직접 정의하고 수집하는 맞춤형 측정 지표
- COUNT, RATE, GAUGE 등

## Log to Metric
- 커스텀 메트릭의 일종
- 지정된 로그 데이터가 데이터독에서 메트릭 데이터로 관리
- 대시보드 지원
- API 지원(create, get 등)

## API Gateway
- MAS 도입과 API Management
- 클라이언트와 백엔드 서비스 사이에 위치한 미들웨어 컴포넌트
- API 클라이언트와 백옌드 서비스 사이의 중개자 역할을 하는 API 관리 도구
- 여러 마이크로 서비스의 백엕드 API 진입점

### API 게이트웨이의 등장
- MSA
  - 모놀리식 - 전체 동합 유지보수 어려움, 일부를 수정해도 전체 재배포
    - 도메인별 필요한 언어에 맞춰서 진행하는 것이 어려움
- MSA Service Mesh
- 규모가 커질수록 복잡성 증가
- 유저 <-> API Gateway <-> 도메인 별 서비스

## API 로그 관리하기

### API 게이트웨이를 통과하며 일어나는 일
- 라우팅, 인증, 인가, 로깅, 보안위험 탐지, AI 프롬프트 가드/프록시 등

> 로깅을 이용하여 관리하는 방향으로 결정

### API Management
- API에 명시적인 이름을 부여하고, 개별 정책을 적용하여 관리
- Gateway + API Management 조합으로 사용량, 지연 상태 등 개별 파악 가능!

### Logs by API Management
- Datadog Custom metrics 활용

### Dashboard from Metrics
- Metrics 데이터로 확인할 수 있는 정보
  - API 호출
  - APP 호출
  - 개별 지연시간

> 로그만 잘 해두면 커스텀이 필요 없는거 아닌가? => 15일이 지나면 데이터가 날아감, 비용도 비쌈

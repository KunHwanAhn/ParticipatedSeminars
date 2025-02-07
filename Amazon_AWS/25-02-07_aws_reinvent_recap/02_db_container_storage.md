# AWS 신규 서비스: Database, Container, Storage, Analytics

## Database
- 2024년은 아마존 오로라 출시 10주년
- 0개의 Aurora 용량 단위(ACU)
  - 콜드 스타트 이슈가 있음
  - 초기 실행 시 15초 정도의 대기 시간이 발생함
  - 고객 데이터 분석을 위한 서버리스 데이터 조회할 때 사용하면 좋음. 프로덕션의 컴퓨팅 파워에 영향을 주지 않음
  - 급증하는 트래픽이 있을 때 서버리스로 실행하여 대응, 트래픽이 잦아들면 클라우드를 내려서 제공
- 데이터베이스 확장에 대한 요구사항
  - 수직 확장: 쓰기에 대한 트래픽이 클 경우에 스펙 업그레이드
  - 수평 확장
  - 쿼리 처리량
- 확장을 위한 샤딩 전략
  - 데이터를 어떤 기준으로 샤딩할 것인지? 샤딩을 위한 키는 어떻게 생성할 것인지?
  - 확장한 이후의 데이터 밸런싱은 어떻게 할 것인지?
- SQL VS NoSQL
  - SQL
    - 정적인 데이터
    - 스키마에 맞춰서 데이터 저장
  - NoSQL
    - 데이터 중복 발생
    - 대용량 데이터 처리에 강점
  - NewSQL
    - 데이터 레코드를 찾아서 읽고 쓰는데 소모하는 시간은 10% 정도에 불과, `90%의 시간이 버퍼풀을 관리하거나 멀티쓰레딩과 관련된 동작을 제어하는데 사용`
    - 버퍼풀 제거, 낙관적 동시성 제어와 타임스탬프 오더링으로 멀티쓰레딩 관련 오버헤드 제거
      - 낙관적 동시성 제어(Optimistic Concurrency Control)
    - Amazon Aurora DSQL(Distributed SQL), Google Spanner
    - DSQL은 언제 써야 하는가?
      - 가용성이 매우 중요할 때, 한 쪽이 장애가 나도 전환이 가능해야 할 때
      - 멀티 리전이 꼭 필요할 때
- Oracle Database@AWS
  - 2025년 2월 기준, 버지니아 리전에서마 제공
  - Zero-ETL을 통해 AWS Analytics Service와 통합
  - 준 실시간 분석 및 기계 학습, 생성형 AI 활용
  - Amazon S3와의 기본 통합을 통해 백업, 복원 및 재해 복구 쉽고 안전하게


## Container & DevOps
- Amazon EKS
  - Auto Mode - 전체 Kubernetes 클러스터 인프라 자동화
    - 컨트롤 플레인 뿐만 아니라 데이터 플레인도 AWS가 관리
  - Amazon EKS Hybrid Node
- AWS PrivateLink
  - 연결이 필요한 회사 대 회사로 직접적으로 연결 / Public이 아닌 Private 네트워크로

## Storage
- Data Lake 구축
- AWS S3 Tables - S3를 RDBMS 처럼 쓸 수 있도록
- AWS S3 Metadata - 21개의 시스템 메타데이터 필드를 자동 생성
- AWS S3 Browser - 콘솔 권한이 아닌, 별도 서비스를 단순하게 앰플리파이로 띄워서 사용

## Analytics

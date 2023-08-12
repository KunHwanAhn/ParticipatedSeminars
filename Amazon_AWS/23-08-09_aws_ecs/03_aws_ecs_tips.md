# Amazon ECS Essentials Tips #1-1
- 신정섭 SA
- [발표자료 1](https://file.notion.so/f/s/028a9bfb-e881-4046-9e96-406047f11a6b/Session4_ECS_Essential_Tips_1-1_230809.pdf?id=e76640db-5bc8-4ea0-82e8-5127b7842a31&table=block&spaceId=769c01d3-3a50-4175-96f8-6a9a7a70abb6&expirationTimestamp=1691654400000&signature=t7amvbz-uUbLKPM2N7mzU87NUG0ljOufKIHBDpFeStg&downloadName=%5BSession4%5D+ECS_Essential_Tips_1-1_230809.pdf)
- [발표자료 2](https://file.notion.so/f/s/3cd319cf-a184-4693-87a1-bd11d562ee0b/Session4_ECS_Essential_Tips_1-2_230809.pdf?id=64227e29-cf63-47d6-8599-d8b75ec174fb&table=block&spaceId=769c01d3-3a50-4175-96f8-6a9a7a70abb6&expirationTimestamp=1691654400000&signature=Bm8pOrA9ztyWcfwq0aRP7jXPw22ICY1Y-u9ZKhk3hjM&downloadName=%5BSession4%5D+ECS_Essential_Tips_1-2_230809.pdf)
- [발표자료 3](https://file.notion.so/f/s/8ef6a45f-04c0-4a86-b840-93a2913fa654/Session5_ECS_Essential_Tips_2_230809.pdf?id=3636ea45-20fe-49fd-ba73-6217f7540309&table=block&spaceId=769c01d3-3a50-4175-96f8-6a9a7a70abb6&expirationTimestamp=1691654400000&signature=hmHEtSGlmwB9jyShX_G7kL9jNZ7FjfpZZ69Mf_wYvto&downloadName=%5BSession5%5D+ECS_Essential_Tips_2_230809.pdf)

> 서버리스? 서버가 없다 X / 관리할 서버가 없다

## Fargate Dive Deep

### Fargate Architecture
1. 작업 실행
2. 용량 확보 & 작업 실행 의도 저장
3. 작업 대기
4. 작업 정의를 통해 컨테이너 실행 명령
5. 컨테이너 실행
6. 컨테이너 실행 결과 보고

### Control Plane & Data Plane
- Control Plane (runs Fargate business logic)
   - 죽어도 사용자의 서비스는 문제가 없음
   - 사용자의 서비스가 죽은 경우 사용자의 서비스를 살려주는 역할
- Data Plane (runs your containers)

### Fargate Data Plane
- 실제 파게이트 관련된, 파게이트 동작할 인스턴스는 AWS의 어딘가에 인스턴스가 모여 있음
- 실제 파게이트를 띄울 물리 서버 위에는 컨테이너 동작을 위한 도구들이 다 설치되어 있음

### Fargate Control Plane

#### Frontend Service
- Entry-point(API 도달점)
- Authentication
- Authorization
- Limit enforcement

#### Cluster Manager Sub-system
- 클러스터와 작업 상태 관리
- 데이터 플레인과 통신하고 작업 상태 변경을 컨트롤
- k8s의 etcd와 같은 태스트 상태 관리 DB를 관리하는 곳

#### Capacity Manager Sub-system
- 인스턴스에 대한 상태 유지
- 인스턴스에 작업 배치(선택)
- 용량 보충

#### Task 실행 흐름
1. 작업 실행
2. 용량 확보
3. 작업 대기
4. Fargate Agent 활성화
5. Agent CM에 등록
6. 작업정의를 전송하고, Agent가 컨테이너를 실행하도록 명령
7. Fargate Agent bootstraps task containers
8. 작업 상태 보고 (RUNNING)

#### Firecracker
- Firecracker 는 안전한 멀티테넌트 컨테이너 및 기능 기반 서비스를 생성하고 관리하기 위해 특별히 설계된 오픈 소스 가상화 기술입니다.
- Lambda, Fargate, Athena 등의 서비스에서 워크로드를 지원합니다.
- AW에서 만든 경량화된 컨테이너 VM
- Security from the ground up
   - KVM-based virtualization
- Speed by design
   - < 125 ms to launch
   - 150 microVMs per second/host
- Scale and efficiency
   - < 5 MB memory footprint per microVM

#### Task Security & Isolation
- Hypervisoer에 의해서 격리가 되기 때문에, 컨테이너를 해킹을 당하더라도 Hypervisor 상위 계층 까지만 영향을 받음

#### 보안 조치 필요
- VPC 안에서 Fargate VM 끼리는 통신이 안되도록 조치
- 최소 권한으로 설정된 권한 에이전트는 로컬 작업에 대한 상태만 검색/변경

> AWS Lambda도 Firecracker를 사용하고 있음. Lambda에서 컨테이너를 띄우는 경우에는 Firecracker를 띄움

## Service Connect

### Complexity of modern architecture
- MSA로 가게 되면 도메인별로, 목적별로 분리하게 된다.
   - 컨테이너가 다른 컨테이너를 호출하기 위해서 서로의 IP를 알아야 하기 떄문에 Registry 서비스도 필요하게 된다.
- 고가용성을 위해서는 리소스의 현재 인스턴스 및 연결 가능한 인스턴스와의 안정적인 검색과 연결이 중요합니다.

### Connecting microservices reliably is hard
- 많은 수의 서비스
- 기하급수적으로 증가하는 복잡성
- 여러 버전과 단계가 공존
- 동적으로 확장되는 인프라
- 비정상적인 엔드포인트 교체

### Amazon ECS 내부 통신 방법
- Amazon ECS Service Discovery
- Amazon Elastic Load Balancer
- AWS App Mesh
- Amazon ECS Service Connect

#### Amazon ECS Service Discovery

##### 장점
- 매우 간단한 DNS 검색 서비스
- Cloud Map은 자동으로 Route53에 필요한 항목을 등록하고 업데이트
- 클라이언트는 Route53에서 얻은 연결 정보를 활용해서 직접 통신
##### 단점
- IP를 안 뒤에는 직접 통신을 하기 때문에, 트래픽에 대한 Telemetry 정보 제공 안함
- DNS 검색은 라운드-로빈 방식만 지원

#### Amazon Elastic Load Balancer

##### 장점
- 가장 많이 활용되는 방법으로 클라이언트는 ELB를 통해 통신
- 작업(Task)은 ELB의 타겟 그룹으로 설정됨
- ELB에서 제공되는 Telemetry 정보

##### 단점
- ELB 자체는 비용이 발생하는 추가 리소스
- 레이턴시가 추가됨

#### 잠깐, 마이크로서비스 간 내부 통신이라고?
- Service Mesh 개념의 등장과 이를 위한 Sidecar proxy 패턴
- Envoy 프로젝트
   - "The network should be transparent to applications. When network and application problems do occur it should be easy to determine the source of the problem."
   - 2016년 Lyft에서 시작한 사내 프로젝트
   - OSS project
   - CNCF(Cloud Native Computing Foundation) project
   - Istio, AWS App Mesh, Amazon ECS Service Connect 에서 활용
- [Inside Envoy](https://www.youtube.com/watch?v=uaksVVHDhYU)

#### AWS App Mesh
- SKIP...

#### Amazon ECS Service Connect
- Amazon ECS Service Discovery의 진화된 버전
- 애플리케이션 개발자에게 동일한 간단한 경험과 풍부한 기능 제공
   - Envoy Proxy 기반의 Service Connect Agent가 Sidecar로 동작
   - Amazon ECS 콘솔 및 CloudWatch에서 제공되는 풍부한 트래픽 원격 분석 기능
   - 트래픽 헬스 체크
   - 복원력을 갖춘 통신을 위한 자동 재시도
   - 강력해진 롤링 배포

##### Service Connect 타입 – 클라이언트, 클라이언트-서버

###### 클라이언트 타입
- 프론트엔드, Reverse Proxy, ELB 등을 통해 외부 트래픽을 수신하는 경우 사용
- 서비스는 통신을 위해 다른 서비스를 검색해야 하지만, 자신은 검색될 필요가 없음

###### 클라이언트-서버 타입
- 백엔드, 미들웨어, 내부 통신이 필요한 마이크로 서비스 등에서 사용
- 서비스는 통신을 위해 다른 서비스를 검색하고, 마찬가지로 다른 서비스가 검색할 수 있어야 함
- 서비스 검색에 필요한 Port alias, Discovery, DNS, Port 등 설정이 필요함

##### Service Connect 배포하기
- 클라이언트를 배포하기 전에 백엔드 서비스를 배포하여 안전한 배포 및 롤백 보장 필요
- 백엔드 서비스에 대한 클라이언트-서버 서비스 구성
   - 네임스페이스에 Service Connect 엔드포인트를 생성
   - 프론트엔드에서 사용하는 것과 동일한 DNS 또는 클라이언트 별칭을 사용
- 프론트엔드 서비스에 클라이언트 or 클라이언트-서버 서비스 연결 구성 추가

##### Service Connect 고려사항
- Service Connect Agent는 Sidecar Proxy이기 때문에 자체적인 CPU, Memory
리소스가 필요
   - 유휴 상태일 때 Service Connect 컨테이너는 100개의 CPU 유닛과 40MiB의 메모리 사용
   - Service Connect Proxy 컨테이너의 작업 CPU 및 메모리에 256개의 CPU 유닛과 최소 64MiB의 메모리를 추가하는 것을 권장
- 롤링 업데이트만 지원
- ECS 서비스는 오직 하나의 네임스페이스에 설정 가능
- ECS 플랫폼 버전 확인 필요
   - Fargate Linux platform 1.4.0+ / ECS Agent 1.67.2+

> 내부 통신을 할 일이 늘어난다면 서비스 커넥트를 고려해봐라!

## 카오스 엔지니어링를 위한 AWS FIS

### 카오스 엔지니어링?
- 2010년 넷플릭스 엔지니어가 제안하여 시스템 엔지니어링 방법으로 진화
   - 최초의 카오스 몽키라는 도구는 AWS 인프라의 인스턴스를 무작위로 마비시키도록 고안됨
   - https://netflix.github.io/chaosmonkey
- 왜 카오스라는 용어를 사용했을까?
   - 분산 시스템에서 개별 서비스는 정상적으로 동작해도 상호 작용은 카오스 그 자체
   - 폭발적인 이베트로 인해서 예측 불가능한 상황에 빠질 수 있음. 폭발 반경에 대한 예측이 매우 어려움
   - 단위 테스트, 통합 기능 테스트의 한꼐 (모르는데 어떻게 테스트 해요)
- 카오스 엔지니어링이란, 복잡하면 대규모 분산 시스템에 대한 신뢰 확보를 위해서 시스템에 대한 실험을 통해 생산 환경에서의 불안정한 조건을 처리할 능력에 대한 신뢰를 구축하는 것
- 환경을 무작위로 파괴하는 것이 아니라, 통제되는 환경에서 계획된 실험을 통해서 시스템의 견고함을 확인하는 것

### 카오스 엔지니어링 도입은 어려움
- 다양한 도구와 기존 스크립트 결합
- 에이전트 또는 라이브러리 설치 필요
- 실험 안정성 확보가 어려움
- 실제 이벤트를 재현하기 어려움 (한 번에 다중 장애)

### 카오스 엔지니어링 과정
- 정상 상태
   - 비지니스에 영향을 주는 통계치 사용
   - Amazon: 100 ms of extra load time caused a 1% drop in sales (Greg Linden).
- 가설 수립
   - What if?
   - 404 혹은 503 상태인가?
   - 300ms까지 지연중인가?
   - 서버에 접속할 수 있는가?
- 실험 디자인
   - 통제된 환경에서 실험 구성
   - 실험할 가설 선택
   - 실험 범위 측정 지표 정하기
   - 실험 계획 알리기 및 실행
- 결과 확인
   - 실험 평가 및 오류 확인
   - 문제 인지 및 알림 시간?
   - 자동 롤백 시작 시점?
   - 전체 복구 및 안정화 시간?
- 문제점 수정
   - 재발 방지 대책 수립
   - 문제점 해부(PostMortems)
   - 오류 해결(Correction of Errors)
- https://channy.creation.net/blog/1173

### AWS FIS
- 완전 관리형 카오스 엔지니어링 서비스
- Actions (작업)
- Targets (대상)
- Experiment templates (실험 템플릿)
- Experiments (실험)
- 작업과 대상에만 집중하면 된다

#### Actions
- 실험 중에 실행되는 오류 주입 내용
- 작업 내용
   - 장애 유형
   - 지속시간
   - 대상 자원
   - 다른 작업과 관련된 타이밍
   - 롤백 동작 같은 오류 별 매개 변수

#### Targets
- 작업을 수행할 하나 이상의 AWS 리소스
- 대상 내용:
   - 리소스 유형
   - 리소스 IDs, 태그 및 필터
   - 선택 모드 (e.g., ALL, RANDOM)

#### Experiment templates
- 실험 시작을 위한 구성
- 템플릿 내용:
   - Actions (작업)
   - Targets (대상)
   - Stop condition alarms (알람 조건)
   - IAM 역할
   - 설명
   - 태그

#### Experiments
- (실험)은 실험 템플릿이 실행된 목록 및 내역
- 실험 결과에 있는 항목:
   - 실험 스냅 샷
   - 생성 및 시작 시간
   - 상태
   - 실행 ID
   - 실험 템플릿 ID
   - IAM 역할 ARN

#### AWS Task Actions
- https://docs.aws.amazon.com/ko_kr/fis/latest/userguide/ecs-task-actions.html
- CPU 스트레스 - aws:ecs:task-cpu-stress
- I/O 스트레스 - aws:ecs:task-io-stress
- 특정 프로세스 종료 시뮬레이션 - aws:ecs:task-kill-process
- 버려지는 네트워크 트래픽 시뮬레이션 - aws:ecs:task-network-blackhole-port
- 네트워크 레이턴시 시뮬레이션 - aws:ecs:task-network-latency
- 네트워크 패킷 손실 시뮬레이션 - aws:ecs:task-network-packet-loss

## Amazon ECS 비용 최적화

### Amazon ECS 비용 최적화 3가지 핵심원리
- 운영 효율화
- 리소스 활용도 높이기
- 리소스 다양하게 활용하기

### 운영 효율화
- Narrow our focusing area
- Infrastructure as a Code
- Use Observability Tools
- Cost Visibility Tools

#### Narrow our focusing area
- 우리가 집중해야 하는 영역을 좁혀라
- 코딩에 집중할 수 있게 하는 것 역시 비용 최적화의 일종
- Fargate를 사용하는 것 자체가 관심을 둬야 하는 부분을 줄여준다
- EC2 위에서 리소스 관리를 잘 할 수 없다면 오히려 Fargate가 더 저렴할 수 있다

#### Infrastructure as a Code
- Amazon ECS Blueprints
   - IaC 도구를 처음 사용하는 사용자를 위한 모범 사례 / well-designed 패턴의 IaC 솔루션
   - Terraform / CDK 지원
   - https://github.com/aws-ia/ecs-blueprints
- Amazon ECS CDK extensions
- AWS Copilot CLI
   - Amazon ECS 기반의 클라우드 아키텍처 구성을 지원해주는 도구
   - Auto Scaling, CD pipeline, metrics, alarms and logs 구성
   - Well-architected 기반의 인프라 구성
   - Continuous deployment pipelines
   - 효율적인 트러블슈팅과 운영
   - 애플리케이션 개발에 집중

#### Use Observability Tools
- CloudWatch Logs
   - awslogs 로그 드라이버 제공
   - AWS FireLens 로그 라우터 제공 (Fluent Bit, Fluentd 기반)
- CloudWatch Container Insights
   - 컨테이너 지표, 성능 로그를 수집하고 집계하여 요약
   - 기본 제공되는 대시보드

#### Cost Visibility Tools
- 비용 최적화를 위한 첫 번째 단계는 비용 가시성 확보
- Amazon ECS on Fargate의 경우 작업 단위로 비용 가시성을 확보할 수 있음
- AWS Cost Explorer를 활용하여 비용 가시성 확보하기
   - 비용이 고정적이라면 사용량을 확인해보고 리소스 효율화하기
   - 비용이 많이 지출되는 Task를 최적화
   - 파트너사가 끼어 있다면, 파트너사에서 제약을 두기 때문에 직접 접근이 어려울 수 있음

### 리소스 활용도 높이기
- 적절한 Task 사이즈 찾아가기
- 적절한 Task 개수 찾아가기
- 적절한 Task 컴퓨팅 용량 찾아가기
-

#### 적절한 Task 사이즈 찾아가기
- 처음부터 적절한 Task 사이즈를 찾는 것은 쉽지 않음
- Observability 도구의 Metric 정보를 활용해서 리소스 사용량을 파악
   - CPU / Memory utilization 을 시작으로 워크로드에 맞는 기준을 찾기
   - 평균의 함정에 빠지지 않기(기간 별 평균 사용량은 기간 조건에 따라서 결과가 매우 달라짐)
   - 일정 기간(일, 주, 월)에 대한 측정 값을 파악해서 조정해나가기

#### 적절한 Task 개수 찾아가기
- Task 개수는 유연하게 운영하는 전략이 유리함. 결국 오토 스케일링이 핵심
- 오토 스케일링 기준 설정하기
   - ECS 제공 Metric (CPU, Memory utilization, Service Connect Metric)
   - 미리 정의된 Metric (ELB 평균 latency, SQS queue depth)
   - 사용자 정의 Metric (SQS backlog per task)
- 하지만, Task 개수로 해결하기 어려운 상황도 있음
   - Cache 사용, Gateway를 통한 Throttling, Event Eriven 구조 등

#### 적절한 Task 컴퓨팅 용량 찾아가기
- 적절한 리소스 여유를 유지하면서 Task 개수와 사이즈를 운영하는 것은 더 어렵다!
- ECS on EC2의 경우, 용량 공급자를 사용하면 자동 계산되면서 컴퓨팅 용량을 조정
   - 하지만 용량 공급자의 목적은 스케일링을 위한 도구로 컴퓨팅 용량을 위한 도구는 아님
   - EC2 Scale-out은 비용이 크기 때문에 여유 리소스가 너무 작아도 스케일링에 불리함
- ECS on Fargate의 경우, 1 Task 1 VM 구조라서 여유 리소스를 신경쓸 필요 없음
   - 사전에 Task에 알맞은 컴퓨팅 리소스를 결정했다는 가정

### 리소스 다양하게 활용하기
- Graviton 프로세서 활용하기
- Spot 인스턴스 활용하기
- On-demand & Spot 혼합하여 사용하기
- Savings Plans 사용하기

#### Graviton 프로세서 활용하기
- Amazon Linux 2(arm64) AMI for EC2 제공
- Fargate 도 AWS Graviton2 프로세서를 지원
- Multi-arch images 완전 지원
- 고성능, 20% 저렴한 가격, 가격대비 성능비 40% 높음
   - Arm 기반은 상대적으로 전력을 적게 먹기 때문에 저렴함
- 다양한 AWS 서비스에서 활용 중이며 많은 고객 사례가 쌓이고 있음
- 애플리케이션 테스트를 통해서 바로 적용 가능함

#### Spot 인스턴스 활용하기
- EC2 Spot 인스턴스는 최대 90% 저렴 (instance pool 선택해야 함)
- Fargate Spot 인스턴스는 최대 70% 저렴 (자동으로 다양하게 선택됨)
- 회수 가능성이 있음 (경고 후 최대 2분)
   - 애플리케이션은 내결함성이 있도록, Stateless 하도록 구성
   - Amazon EventBridge를 통해 Spot 인스턴스 회수 신호(Task 상태 변경)를 받을 수 있음
- 단, Amazon ECS의 경우
   - Task 중단 및 종료 처리를 자동으로 진행
   - ELB 연결 종료를 자동으로 Graceful하게 Drain 처리함

#### On-demand & Spot 혼합하여 사용하기
- Run 2/3 On-Demand, 1/3 on Spot

#### Savings Plans 사용하기
- Instance Saving Plans
   - Instance Savings Plans apply savings to selected instance usage across any tenancy or OS
- Compute Savings Plans
   - Compute Savings Plans discounts apply to any compute usage automatically
   - Compute Savings Plans apply to Fargate, AWS Lambda, and Amazon EC2
- Savings Plans 은 예약 인스턴스와 동일한 비용 절감 효과를 제공하지만 더 넓은 범위와 획기적으로 향상된 유연성을 제공하며 오버헤드 관리를 최소화합니다

## 대규모 트래픽 준비하기

### 사전에 준비하기
- Quota & API Throttling 체크하기
- Amazon ECS Service Auto Scale 사용하기 (예약된 스케줄)
- Amazon EventBridge 사용하기
- Throttling or Virtual Waiting Room 준비하기
- Spot Instance 활용하기

#### Quota & API Throttling 체크하기
- Amazon ECS도 AWS의 다른 리소스와 함께 운영되기 때문에 대규모 서비스에서는 Quota 제한에 걸리는 경우가 있음 (상향 요청 필요)
   - 예를 들어 ALB의 경우, ALB 당 / Resion 당 Target 개수가 1000개로 제한됨
   - https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-quotas.html
- ECS 운영 중에 과도한 ECS API가 요청되면 AWS 에서 Throttling 함
   - AWS CloudTrail 로그를 통해 throttling 이벤트를 감지할 수 있음
   - Throttling 이벤트는 Amazon EventBridge 에도 emit 됨
   - 만약 직접 ECS API를 다루는 경우 AWS SDK 등을 활용하지 않는다면 재시도 로직을 직접 구현해야 함 (Amazon EventBridge + AWS Lambda 조합으로 backoff retry)

#### Amazon ECS Service Auto Scale 사용하기 (예약된 스케줄)
- Amazon ECS 는 [Application Auto Scaling](https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-scheduled-scaling.html)의 예약된 조정을 지원함
   - scalable targte 생성
   - scheduled-action 정의

#### Amazon EventBridge 사용하기
- Amazon ECS 클러스터의 현재 상태에 대한 거의 실시간에 가까운 알림을 받을 수 있음
- [Amazon ECS 이벤트](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwe_events.html)는 Amazon EventBridge 으로 전송함
   - 컨테이너 인스턴스 상태 및 변경
   - Task 상태 변경 (특히, Spot 인스턴스의 종료 알림)
   - Service 액션(INFO, WARN, ERROR) 및 배포 상태 변경
- 각 이벤트는 AWS Lambda 등을 이용하여 목적에 맞는 처리가 가능함(알림 처리)
- Amazon EventBridge Scheduler를 사용하면 Cron 작업 가능

#### Throttling or Virtual Waiting Room 준비하기
- Throttling
   - 전체 시스템의 장애보다 Throttling을 통해서 일부 사용자에게만 Fallback 정책 적용
   - Amazon API Gateway 등을 활용하면 Throttling 설정 가능
   - 사용자의 UX 경험을 위한 API 등은 별도 분리 or Lambda 처리
- Virtual Waiting Room 솔루션 활용
   - 콘서트 / 스포츠 티켓 판매, 블랙 프라이데이 등의 특별 할인 행사 / 온라인 수강 신청 등
   - https://aws.amazon.com/ko/solutions/implementations/virtual-waiting-room-onaws/

#### Spot Instance 활용하기
- 평소에도 Spot Instance를 활용하면 Spike 트래픽에 대응 가능
- 대규모 트래픽의 경우 Spot Instance를 적극 활용해서 사전에 프로비저닝하기
- Spot 인스턴스 회수 가능성을 최소로 만드려면?
   - 여러 리전 및 가용 영역을 사용
   - 여러 인스턴스 유형을 사용
   - EC2 Spot 인스턴스를 사용하는 경우, "용량 최적화 전략"을 사용

### 빠르게 배포하기
- 컨테이너 이미지 최적화하기
- Task 부트스트랩 시간 올리기
- Fargate 사용하기
- 로드밸런서 healthcheck 설정 확인하기
- 로드밸런서 connection draining 설정 확인하기
- SIGTERM 반응성 높이기
- 컨테이너 캐시 설정하기
- 네트워크 모드 수정하기

#### 컨테이너 이미지 최적화하기
- 컨테이너 기동 시간의 50% 이상은 컨테이너 이미지 다운로드 시간
- 컨테이너 이미지는 작을수록 배포와 스케일링에 유리함
- 최적화된 베이스 이미지(Slim 이미지 & Multi Stage 빌드)를 만들자
- 애플리케이션은 꼭 필요한 Dependency만 포함하도록
- 애플리케이션 크기 자체가 크다면 분리 고려

#### Task 부트스트랩 시간 올리기
- Task를 구성하는데 여러 가지 CPU를 필요하는 프로세스가 진행됨
   - start-up 스크립트 실행 / 압축 해제 / 라이브러리 다운로드 등
   - 애플리케이션 부트스트랩(Spring Boot의 경우 Bean 생성 등)
- [ECS Agent Metadata API](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html) : Task 메타데이터 및 Docker 통계 정보 확인 가능
   - Metric을 CloudWatch로 전송해서 부트스트랩 시간 분석 가능
- vCPU를 조금 더 할당해주면 전체적인 부트스트랩 시간이 올라갈 수 있음
- ECS on EC2의 경우 Task의 수평 확장이 빠름 (binpack)

#### Fargate 사용하기
- ECS의 경우, Fargate는 EC2 보다 스케일링이 빠름
- ECS의 경우, Fargate는 ARM 프로세서도 지원함(x86 대비 조금 빠름)
- Fargate는 매년 스케일링 속도 개선이 이뤄지고 있음(2020 대비 2022년 12배 빠름)

#### 로드밸런서 healthcheck 설정 확인하기
- healthcheck 기본 설정값은 새로운 Task에 트래픽 유입까지 최대 2.5분이 소요
   - HealCheckInternalSeconds : 30s
   - HealthyThresholdCount : 5
- 빠른 스케일링(배포)를 위한 권장 값
   - HealCheckInternalSeconds : 5s
   - HealthyThresholdCount : 2

#### 로드밸런서 connection draining 설정 확인하기
- Task를 종료하면 로드 밸런서는 다운스트림 컨테이너에 대한 새 연결 전송을 중단하지만 기존 연결이 저절로 종료될 때까지 대기함
   - deregistration_delay.timeout_seconds : 300s
- 애플리케이션 평균 응답시간이 1초 미만인 경우에는 불필요한 대기 시간
- 빠른 Drain을 위한 권장 값
   - deregistration_delay.timeout_seconds : 5s

#### SIGTERM 반응성 높이기
- 로드밸런서 드레인이 완료되면 ECS Agent는 컨테이너에 SIGTERM 신호를 전송
   - 애플리케이션이 수행 중인 작업을 완료하도록 경고하는 것
   - 해당 신호를 받으면 애플리케이션의 Graceful 셧다운 동작을 해야하지만... 대부분 무시함
      ```js
      process.on('SIGTERM', function () {
         server.close();
      })
      ```
   - SIGTERM 신호 이후 기본 대기 시간 이후에 SIGKILL 명령이 내려짐 (ECS_CONTAINER_STOP_TIMEOUT : 30s)
- 애플리케이션의 응답 속도가 평균 1초라면 이 시간을 2s로 설정하는 것이 권장됨
   - 가장 좋은 방법은... SIGTERM 처리를 애플리케이션에서 처리하자

#### 컨테이너 캐시 설정하기
- ECS Agent는 기본적으로 컨테이너 이미지를 항상 원격 저장소에서 Pull
   - ECS_IMAGE_PULL_BEHAVIOR : default
- 권장 설정 값
   - ECS_IMAGE_PULL_BEHAVIOR : once or prefer-cached
   - ECS가 원격 레지스트리에서 다운로드하는 대신 호스트의 디스크 캐시에 있는 이미지를 사용
- Fargate의 경우에는 1 Task 1 VM 구조라 로컬 캐싱이 불가능
   - vCPU 추가 할당 / 작은 base 이미지 / ECR 이 같은 리전으로 사용
   - [Seekable CIO 기술을 활용하여 컨테이너 이미지 Lazy Loading 하기](https://aws.amazon.com/ko/blogs/tech/under-the-hood-lazy-loading-container-images-with-seekable-oci-and-aws-fargate/)
      - 컨테이너 이미지 자체도 메타 데이터 등을 인덱싱 해놔서 필요한 것만 다운 받고 레이지 로딩하는 방법
      - 250MB 이상인 이미지의 경우 효과적

#### 네트워크 모드 수정하기
- awsvpc 모드를 사용하면 Amazon ECS는 각각의 Task 별로 ENI를 생성하여 VPC private IP를 할당함
   - Task 별로 각각의 보안 그룹 설정이 가능하고, 통신을 제어할 수 있는 유연성이 향상됨
   - Task를 배포하는 상황에서 ENI를 프로비저닝하고 설정하는 시간이 소요됨
- 빠른 배포를 위해서라면 bridge 모드를 고려

# AWS ECS Overview
- 안성진 SA
- [발표자료](https://file.notion.so/f/s/e33668de-d3f1-4c36-bd57-499c11fe2237/Session3_ECS_Auto_Scaling_%E1%84%87%E1%85%A2%E1%84%91%E1%85%A9_%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%85%E1%85%A3%E1%86%A8_230809.pdf?id=c6297a35-dac8-40f7-a781-ecd389ecaf30&table=block&spaceId=769c01d3-3a50-4175-96f8-6a9a7a70abb6&expirationTimestamp=1691647200000&signature=IZiF8ItMCBcR90VJ7vEW6DeSWQ00ZxdIhXgaA4ARV0w&downloadName=%5BSession3%5D+ECS_Auto+Scaling_%E1%84%87%E1%85%A2%E1%84%91%E1%85%A9+%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%85%E1%85%A3%E1%86%A8_230809.pdf)

## ECS Auto Scaling
- Auto Scaling: 성능, 안정성 및 비용 최적화
- EC2의 오토 스케일링은 다음과 같은 근거를 기준으로 고려. e.g. CPU, Network, LB Session
- Service Auto Scaling & Cluster Auto Scaling

### Auto Scaling
- 서비스 내의 작업 수를 자동으로 늘리거나 줄이는 역할을 함
- ECS는 CPU 및 메모리 통계를 CloudWatch에 게시하고,
- `Target Tracking`, `Step Scaling`, `Scheduled Scaling` 지원
- AWS에서는 CPU 메트릭 기반의 Target Tracking 사용을 권고
- Target Tracking은 메트릭을 반올림하여 확장을 원활하게 수행.
- Task는 CloudWatch로 데이터를 전송하고, CloudWatch는 서비스 작업 수를 늘리거나 줄이기 위해 AutoScaling을 트리거시킴

#### Target Tracking
- 특정 상황이 되면 스케일링을 진행. e.g. 온도가 25도 이상이면 돌아라

#### Scheduled Scaling
- 미리 이벤트 일정을 생각해서 예약을 걸어두는 것. e.g. 2023-06 올영세일 대비 늘려라!

### Service Auto Scaling
- EC2 오토 스케일링은 EC2를 늘리는 것
- 서비스 오토 스케일링은 Task를 늘리는 것
- Application Auto Scaling
   - 임계치가 일정 조건을 만족하면 CloudWatch로 이동
   - CloudWatch에서 알람을 줘서 Application, Task 갯수를 증가
- 오토 스케일링의 Min/Max 갯수도 지정해서 관리할 수 있음
- 리전별로 최대치는 `5,000`개

#### With Service Metrics
- https://aws.amazon.com/ko/blogs/tech/autoscaling-amazon-ecs-services-based-on-custom-metrics-with-application-auto-scaling

### Cluster Auto Scaling
- 클러스터를 키우려면 EC2를 증가해야 함

### AWS ECS 용량 공급자
- 인스턴스 안의 용량이 얼마나 차 있는가를 기준으로 판단
   - 총 컨테이너가 4대가 뜰 수 있는데 3대가 떠 있는 경우 1대를 더 띄우는 방식으로 준비할 수 있음

#### 용량 공급자 전략
- Capacity Provider Strategy
   - CP1: base = 3, weight = 1
   - CP2: base = 0, weight = 3
   - 7 Tasks, CP1 = 3, CP2 = 3
   - https://aws.amazon.com/ko/blogs/containers/deep-dive-on-amazon-ecs-cluster-auto-scaling

### How does CAS Work
- CAS는 CloudWatch metric 중 `CapacityProviderReservation`을 추적하도록 동작합니다.
- `CapacityProviderReservation` = `M/N * 100`
   - M = ASG에서 필요한 인스턴스 개수 (`to be computed`)
   - N = ASG에서 현재 실행중인 인스턴스 개수(`known`)
- CAS는 아래 내용을 고려하는 알고리즘을 기반으로 M을 추정합니다.
   - 단일 인스턴스 유형 또는 혼합 인스턴스 유형을 사용하도록 ASG가 구성되어 있는지
   - 프로비저닝 상태에서 대기 중인 작업의 리소스 요구 사항(CPU, 메모리)
   - 작업에 대한 배치 전략(있는 경우)

### How does Cluster Scale-out Work?
- 클러스터에는 3개의 인스턴스가 있는 ASG와 함께 하나의 용량 공급자가 있습니다.
   - 서비스에 7가지 작업이 있다고 가정
- 각 인스턴스에는 세 가지 작업에 충분한 용량이 있습니다.
- 프로비저닝 상태의 작업이 없습니다
- M = 3, N = 3, CapacityProviderReservation = 100

#### 스케일 아웃이 필요한 경우
- ECS 서비스 Auto Scaling은 서비스의 작업 수를 10개로 확장합니다.
- 하나의 작업이 사용 가능한 용량 없이 프로비저닝 상태입니다.
- CAS estimates M = 4, CapacityProviderReservation = 133
- ASG의 원하는 카운트를 N = 3에서 N = 4로 비례적으로 조정하기 위해 스케일링이 시작됩니다.

### How does Cluster Scale-in Work?
- 이전과 동일한 설정
- Managed termination protection is enabled
- 프로비저닝 상태의 작업이 없는 경우, M = 3, N = 3, CapacityProviderReservation = 100

#### 스케일 인이 필요한 경우
- ECS Service Auto Scaling은 서비스의 작업 수를 4개로 축소합니다.
- CAS estimates M = 2, CapacityProviderReservation = 66
- ASG의 N = 3에서 N = 2로 조정하기 위해 스케일링이 시작됩니다.

### 용량 공급자 고려 사항­ EC2
- 하나 이상 작업을 시작하면 용량 사용 가능 여부에 따라 작업이 실행되거나 실행되지 않음
   - Cluster AutoScaling이 활성화되면 충분한 용량이 없을 때 PROVISIONING 상태로 전환
- Enable managed scaling
- Enable instance scale-in Protection
- 용량 공급자가 관리하는 ASG을 수정하지 않음
- Auto Scaling에 Warm Pool을 추가 할 수 있음
   - ECS_WARM_POOLS_CHECK=true

### 용량 공급자 고려 사항 - Fargate
- 새 콘솔에서 Fargate 및 Fargate Spot은 용량 공급자를 생성할 필요가 없음
- Fargate와 EC2 용량 공급자 전략을 함께 쓸 수 없음
- Fargate Spot 용량 공급자 사용 시 Windows 컨테이너는 지원하지 않음
- ARM 64 아키텍처를 사용하는 Linux Task는 Fargate Spot을 지원하지 않음

## Capacity Provider Demo

### EC2 Spot and Fargate Spot

#### EC2 Spot
- Unused Capacity
- Price up to 90% less than OnDemand
- Can be reclaimed by Amazon EC2(with two minute warning)
- You choose instance pools

#### Fargate Spot
- Unused Capacity
- Price up to 70% less than standard Fargate
- Can be reclaimed (with two minute warning)
- Automatic diversification

### ECS Spot 중단 처리
- Amazon ECS는 Spot 중단을 자동으로 처리합니다.
   - 스팟 인스턴스를 뺏기기 2분 전에 알림을 줌.
- set ECS_ENABLE_SPOT_INSTANCE_DRAINING=true on EC2 instance - User Data
- ECS는 Task termination을 조정합니다.
- 로드 밸런서 연결을 자동으로 정상 종료시킵니다.
- EC2는 스팟이 종료되면 on Demand 방식으로 바뀌어서 처리할 수 있지만
- Fargate는 스팟이 종료되면 자동으로 전환하는 것이 안된다.

## Deployment

### ECS Deployment Basic
- 기본 전략은 롤링 업데이트
- 블루/그린은 최신 콘솔 기준으로는 비활성화 되어 있어서 AWS CLI로 해야한다.
   - 콘솔에서 자동으로 블루/그린을 할 수 있는 새로운 방법을 준비 중인지 일시적으로 비활성화 한 것으로 판단

### Deployment Types
- Rolling
- Blue/Green Deployment
- External Tools (3rd Party)

### Rolling Deployment
- ECS Service Scheduler는 배포 구성에 따라 기존 작업을 새 작업으로 바꿉니다.
- 배포 구성
   - 최소 실행 작업 비율
   - 최대 실행 작업 비율

#### Rolling Deployment­ - Failure detection
- 배포가 실패한 시기를 식별하려면…
   1. 배포 회로 차단기
   2. CloudWatch 경보
- 이후 선택적으로 마지막 작업 배포로 롤백할 수 있습니다.

#### 만약 배포에 실패했거나 Task가 중지됐다면?
- 트러블 슈팅 가이드 - https://docs.aws.amazon.com/ko_kr/AmazonECS/latest/developerguide/ecs_cwe_events.html#ecs_service_deployment_events
https://repost.aws/ko/knowledge-center/ecs-task-stopped

#### RollingUpdate Deploy Tip
- ECS Deployment 옵션 조정하기
   - Min running tasks
   - Max running tasks
- Availability – Min: 100, Max: 200
- Speed – Min: 50, Max: 200

### BlueGreen Deployment
- 애플리케이션 가용성 향상
- 롤백 프로세스를 단순화하여 배포 위험 감소

#### BlueGreen Deployment - Traffic Shifting Ways
- Canary
- Linear
- All-at-once

#### Deployment Configuration
- AWS CodeDeploy

## Take Away
- Service Auto Scaling & Cluster Auto Scaling을 활용하여 성능, 안정성, 비용 최적화
- 다양한 Auto Scaling Policy 고려 (Target Tracking, Step, Scheduled)
- Capacity Provider로 작업 배치 전략 구성
- On-Demand + Spot Instance를 활용하여 성능 유지 및 비용 절감 (단, Interrupt가 발생할 수 있다)
- Rolling Update 시 min/maxHealthPercentage를 활용하여 배포 시 일부 비용 절감
- 예상하는 트래픽이 있으면 요청서를 전달해야 한다.

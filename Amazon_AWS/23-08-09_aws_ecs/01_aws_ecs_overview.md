# AWS ECS Overview
- 안성진 SA
- [발표자료](https://file.notion.so/f/s/aec930ca-a502-4249-8a13-856f936a31ae/Session2_ECS_Overview_230809.pdf?id=343d85f2-6042-4baa-81de-77d1d0115ee6&table=block&spaceId=769c01d3-3a50-4175-96f8-6a9a7a70abb6&expirationTimestamp=1691647200000&signature=bVGx_O8Xvf_iTZyq52BHBp_G3esBBPt6WlgQpKJj-1s&downloadName=%5BSession2%5D+ECS_Overview_230809.pdf)

## ECS 소개
- 배포, 스케줄링, 컨테이너화된 애플리케이션 스케일링 & 관리

### Hosting
- 컨테이너가 동작하는 환경
- EC2
- FARGATE

### Image Registry
- 컨테이너 이미지 저장소
- 주기적으로 이미지 스캐닝
- AWS ECR

### ECS 아키텍처

#### 생성하는 방법
- AWS 콘솔
- AWS CLI
- Infrastructure as a Code using CDK

### ECS를 지원하는 통합 에코시스템
- 데이터독, 뉴렐릭 등의 다양한 도구들에서 지원하고 있음

### AWS ECS powers Amazon
- SageMaker, Lex, Polly, Batch, amazon.com 추천 시스템
- Amazon ECS forms the building blocks for various services at Amazon
- Tested for security, reliability, availability, and scale

## ECS 오브젝트
- ECS 클러스터
- ECS 작업: 실제 컨테이너 작업(최소 실행 단위). 하나 혹은 둘 이상의 컨테이너의 묶음
- ECS 서비스: ECS 위에서 작업을 실행하는 방법. 정의한 작업 수를 유지하기 위해 지속적으로 관리

### AWS ECS 클러스터
- 작업이 실행되는 논리적 그룹
- Control Plane / Data Plane으로 나뉘어 구성

### ECS 주요 구성 요소
- Control Plane: 오케스트레이션을 위한 태스크 스케줄링. 클러스터만 만들어도 비용이 발생하지 않음
   - Cluster Manager
   - Scheduler
   - API
- Data Plane: 고객이 제어하는 요소들이 있는 곳
- ECS 에이전트: 워커 노드에 남아 있는 리소스를 모니터링해서 콘트롤 플레인에 전달

### AWS ECS 작업
- 클러스터에서 최소 실행 단위
   - 네트워킹, 스토리지, 파라미터, IAM 역할, 컴퓨팅 리소스 등의 구성 값 설정 가능
- 작업 정의 (Task Definition) 내용을 기반으로 작업 배포
   - 배포 타입 설정
   - 컨테이너 이미지 매핑을 통한 정의 작업
   - 작업 역할을 부여해 API 요청을 받을 때 권한에 따라 동작
   - 작업 크기 설정
   - AppMesh, FireLens 등과의 통합 설정
- 하나의 작업 당 최대 10개의 컨테이너 가능

### ECS 작업에 부여하는 IAM 역할
- 호스트에 있는 권한을 상속받지 않고 작업(Task)에 IAM 역할을 할당
- EC2 Instance Role
- Task Execution Role: 태스크가 최조의 프로비저닝을 하고 있을 때, 외부 환경 변수나, 보안 키 값을 가져오는 등의 역할을 할 때의 권한
- Task Role: 태스크가 동작할 때, 접근할 수 있는 리소스 정의. e.g. 컨테이너에서 Dynamo DB를 가거나, S3에 접근하는 등의 권한

### 다른 서비스들과의 손쉬운 연동
- `awslogs`라는 기본 드라이버를 사용하여 로그를 남기도록 하고, 이를 CloudWatch에서 볼 수 있음
- awslogs는 기본적으로 블록킹으로 동작하고 있음. non-blocking 모드로 실행하도록 변경하는 것도 고려 필요

### FireLens를 통한 로그 라우팅
- ECS를 위한 컨테이너 로그 라우터
- 로그를 필터링 및 라우팅하는 Fluent Bit 사이드카를 자동으로 생성
- 특정 EC2 인스턴스, 작업 ID, 애플리케이션 버전과 같은 추가 메타데이터를 로그에 넣을 수 있음
- SaaS Provider(e.g. Datadog)에게 제공하는 것도 가능

### 다양한 볼륨 선택
- 컨테이너 인스턴스 /var/lib/docker/volumes 위치에 도커 관리형 볼륨이 생성됨
- 도커 볼륨 드라이버(플러그인이라고도 함)들은 Amazon EBS와 같은 외부 스토리지 시스템과 통합하는데 사용
- 호스트 머신에 있는 파일 혹은 디렉토리를 컨테이너에 마운트
- EC2 혹은 Fargate 런치 타입에 상관없이 호스트 볼륨 바인딩 지원
- Amazon Elastic File System (EFS)를 컨테이너에 마운트

### AWS ECS 서비스
- ECS 위에서 작업을 실행하는 방법
- 주요 설정 내용
   - 서비스 유형(replica, daemon)
      - replica: 여러대 복제
      - daemon: 꼭 하나는 무조건 있어야 한다.
   - 작업 배치 전략
      - CPU or GPU
   - 배포 유형
- AWS ELB를 통한 효율적 부하 분산
- Service Auto Sacling을 통한 탄력적 워크로드 구성

### Service 배포
- Service 생성
   - AWS ECS 콘솔 사용
   - JSON 파일고 함께 AWS CLI 사용
- Service 생성을 위한 CLI 명령

### 다양한 작업 배치 전략 (ft. Scheduler)
- Task 배치 과정
   - 리소스 식별 (CPU, Memory, GPU, Port...)
   - 작업 배치 졔약 (m5.large, g4dn.large...)
   - 작업 배치 전략 (Binpack, AZ Spread)
   - 태스크 배치
- Binpacking: 컨테이너를 워커 노드에 밀집 시켜서 배치
- Spread: AZ에 나눠서 안정적으로 배치

> AWS ECS 에이전트도 나름의 리소스를 먹기 때문에, 이러한 부분을 고려해야 함

> 소프트 리밋 뿐만 아니라, 하드 리밋도 같이 고려해야 함

## AWS Fargate on Amazon ECS

### AWS Fargate의 장점
- 관리 업무로 인한 오버헤드 경감
   - 까다로운 컨테이너 클러스터 관리를 AWS에 위임함으로써 고객은 애플리케이션에만 집중
- 기존 컨테이너 그대로 배포 가능
   - 기존의 컨테이너 변경 불필요
   - 현재 쿠버네티스, ECS 클러스터의 서비스, 워크플로우 그대로 이용
- 필요한 만큼만 & 쉬운 연동
   - 컨테이너 실행에 필요한 자원만큼만 비용 지불
   - 기존 AWS 네트워크, 보안과 네이티브하게 통합하여 사용

### AWS Fargate Task CPU와 메모리
- 0.5 vCPU부터는 메모리 할당이 1GB 단위로 가능
- 8 vCPU는 메모리 할당이 4 GB 단위로 가능
- 16 vCPU는 메모리 할당이 8 GB 단위로 가능

> Fargate에서 디버깅이 필요하다? exec 명령어를 사용하여 가능

### AWS Fargate를 도입하기 위해 고려해야 될 사항
- 호스트 OS 단에 구축해야하는 compliance 및 소프트웨어 요소가 있다면 사용 불가능
- GPU 지원 X
- 작업 정의 시, 네트워크 모드 중, awsvpc 모드만 지원
- 작업(Task) ENI에 고정 IP 주소 사용 불가능 (아래 해결 방법)
   - https://aws.amazon.com/ko/premiumsupport/knowledge-center/ecs-fargate-static-elastic-ip-address/?nc1=h_ls

## Amazon ECS Networking
- 네트워크 타입은 Task Definition에서 `networkMode`로 정의 가능.

### Networking - None
- None으로 네트워크 모드가 설정되면 작업의 컨테이너에 외부 연결이 없으며 컨테이너 정의에서 포트 맵핑을 지정할 수 없음
- 외부 통신이 필요하지 않는 경우에 사용
- 잘 사용하지 않는 타입

### Networking - Host
- TASK가 HOST의 Network Stack을 공유 가능
- `Container Ports`는 `EC2 Instance’s network interface`와 직접 맵핑됨
- Task는 도커 빌트인 Virtual Network으로 바로 전달
- 1개의 EC2 Instance에 중복으로 같은 Task 실행 불가

### Networking - Bridge
- Host와 Container 간에 Virtual Network Bridge를 이용하여 통신
   - EC2 내, Docker Built-in Virtual network 매커니즘 활용
- Port Mapping 방식: `Static` 또는 `Dynamic`
   - Static: 사용자가 지정, EC2에 같은 Task 실행 안됨
   - Dynamic: 도커가 Host traffic port를 Random으로 할당

### Networking - awsvpc
- `Task` 별로 `elastic network interface(ENI)` 할당
- Fargate는 awsvpc mode로만 동작
- Task 에 Amazon EC2 인스턴스와 동일한 네트워킹 속성을 적용할 수 있음.
   - 예: Security Group, VPC Flow logs 등
- EC2 Instance Type 별로 ENI 할당 제한, 제한 이상의 Task를 생성이 필요하면 `awsvpcTrunking`모드 활성화

## Amazon ECS Developer Tools

### Developer Tools – Copliot for ECS
- Copilot은 로컬 개발 환경의 ECS에서 생산 준비가 된 컨테이너화된 애플리케이션 구축, 릴리스 및 운영을 단순화
- 최신 애플리케이션 모범 사례를 지원하는 개발자 워크플로와 일치
```bash
$ copilot init --app python-app \
--name pythin-svc \
--type 'Load Balanced Web Service’ \
--dockerfile './Dockerfile’ \
--port 80 \
--deploy
```

### Developer Tools – Docker Compose for ECS
- Docker Compose를 사용하여 ECS Fargate에 애플리케이션 배포
- ECR 또는 Docker Hub에서 컨테이너 이미지 배포
- 로컬 개발 환경과 ECS 환경 간에 빠르게 전환
- ECS에 애플리케이션을 배포하기 위한 독창적인 접근 방식
- docker compose up 및 docker compose down 만큼 쉽습니다.

## Take Away
- ECS 작업 정의에 적정 크기만큼 리소스를 할당
- Fargate 사용 시 제약 사항 확인 (Fargate Spot – ARM X, Fargate - GPU X …)
- 최소 권한 원칙에 따라 최소한의 권한 부여 (TaskExecutionRole, TaskRole)
- 필요에 따라 작업 배치 전략/제약 활용
- 워크로드에 따라 Log Driver 사용 시 awslogs – blocking(default), non-blocking, firelens 고려

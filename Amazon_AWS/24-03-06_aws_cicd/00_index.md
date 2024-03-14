# DevOps on AWS - CI/CD
- [발표자료](https://mature-glade-1aa.notion.site/CJ-Oliveyoung-CI-CD-Workshop-for-ECS-2024-3-6-a751c7ac67ca4370b8b0cf6a6f993dec)
- 이상현님 / AWS Solutions Architect

## DevOps
- flickr에서 시작
- 어플리케이션 개발을 속도감있게 하기 위해 나온 개념
- Dev와 Ops의 간격을 줄이기 위해서

### Flickr - 10 deploys per day

### 인프라 & 기술적인 측면
1. Automated infrastructure
2. Shared version control
3. One step build and deploy
4. Feature flags
5. Shared metrics
6. IRC and IM robots

### 문화적인 측면
1. Respect
2. Trust
3. Healthy attitude about failure
4. Avoiding Blame

## 소프웨어 개발 생명 주기
- Dev(`계획 -> 코드 -> 빌드`) -> QA(`테스트`) -> Ops(`릴리즈 -> 배포 -> 운영 -> 모니터링`)
- 위의 과정을 거치다보니 점점 속도는 느려짐
- DevOps로의 전환을 위해서는 자동화가 필요!

## DevOps의 이점
- 협업 향상
- 신속한 전달
- 신뢰성
- 보안
- 확장성
- 속도

## DevOps 방식 및 도구
- CI/CD
- 관찰가능성(Observability)
- 인프라의 코드화(Infrastructure as code)
- Source / Actifact 관리
- 복원력 및 보안

## AWS DevOps Tools
- AWS Code Commit

### AWS CodeCommit
- 프라이빗 Git 리포지토리를 호스팅하는 안전하고 확장성이 뛰어난 관리형 소스 제어 서비스

#### 어디에, 어떻게 소스 코드를 관리할 것인가?
- GitHub, GitLab, PERFORCE, IBM Rational ClearCase

#### CodeCommit
- 완전 관리형 소스제어 서비스
- Git 스탠다드 지원
- IAM과 통합하여 리포지토리에 대한 사용자별 액세스 가능
- HTTPS, SSH 지원

#### CodeCommit 리포지토리에 연결하는 방법
- HTTPS
  - Git 자격 증명
  - 개발 도구에서 직접 연결하기
- SSH
  - AWS CLI
  - 퍼블릭-프라이빗 키 페어 e.g. `*.pem`

#### 가격
- 최초 5명의 `활성사용자` 무료
- 5명이후 추가되는 활성사용자 당 매달 1.00 USD
- 1 계정당
  - 1000개의 리포지토리, 요청시 최대 25000개
  - 매달 10GB의 스토리지
  - 매달 2000건의 git 요청

### AWS CodeBuild
- 소스코드 컴파일, 테스트를 위한 완전관리형의 지속적 통합 서비스

#### CodeBuild
- 완전 관리형 빌드 서비스
- 사용한 만큼 지불
- 빌드 요청에 따라 확장 가능
- CI/CD 활성화
- 보안

> Source Code -> Build Trigger -> CodeBuild -> Output Artifacts

#### 어떻게 작동하는가?
1. 소스 코드 다운로드
2. 임시 컴퓨팅 컨테이너의 `buildspec.yaml` 에 구성된 명령을 실행합니다(모든 빌드에서 새로 생성됨).
3. 빌드 출력을 서비스 콘솔 및 CloudWatch 로그로 스트리밍합니다.
4. 생성된 아티팩트를 S3 버킷에 업로드합니다.

#### 다양한 소스 공급자
- AWS S3
- AWS CodeCommit
- GitHub
- GIthub Enterprise
- BitBucket

#### buildspec.yaml 예제
```yaml
version: 0.1

 # 빌드 단계에서 사용할 변수
environment_variables:
  plaintext:
    JAVA_HOME: "/usr/lib/jvm/java-8-openjdk-amd64"

# 빌드 단계에서 수행할 수 있는
# 작업의 예:
# • 패키지를설치하거나명령을 실행하여"설치"에서환경을 준비할수있습니다.
# • "pre_build"에서구문검사,명령을실행합니다.
# • "build"에서빌드도구/명령을 실행합니다.
# • 앱을추가로테스트하거나 컨테이너이미지를post_build의 리포지토리로 배송하세요.
phases:
  install:
    commands:
      - apt-get update -y
      - apt-get install -y maven
  pre_build:
    commands:
      - echo Nothing to do in the pre_build phase...
  build:
    commands:
      - echo Build started on `date`
      - mvn install
  post_build:
    commands:
      - echo Build completed on `date`

# S3에서 아티팩트 생성 및 저장
artifacts:
  type: zip
  files:
    - target/messageUtil-1.0.jar
  discard-paths: yes
```

#### 가격
- 분 단위로 지불
- 메모리 및 CPU 리소스의 양으로 구분되는 세 가지 컴퓨팅 유형:

### AWS CodeDeploy
- 다양한 컴퓨팅 서비스에 대한 소프트웨어 배포를 자동화하는 완전관리형 배포 서비스

#### CodeDeploy
- 모든 인스턴스에 대한 코드 배포 자동화
- 애플리케이션 업데이트의 복잡성 처리
- 애플리케이션 배포 중 다운타임 방지
- 실패가 감지되면 자동으로 롤백
- 모든언어와 운영체제로 Amazon EC2 또는 온프레미스서버에 배포
- 타사 도구 및 AWS와 통합

#### 가격
- EC2, Lambda, ECS 에서 사용하는 경우 추가비용 없음
- 온프레미스에서 CodeDeploy를 사용하는 경우 업데이트당 0.02USD

### AWS CodePipeline
- 릴리스 파이프라인을 자동화를 위한 완전관리형 지속적 전달 서비스

#### CodePipeline은 무엇을 할 수 있나요?
- 빠르고 안정적인 애플리케이션 업데이트를 위한 지속적인 제공 서비스
- 소프트웨어 릴리스 프로세스 모델링 및 시각화
  - 동시 빌드
  - 순차 빌드
  - 관리자 승인 후 빌드
- 코드가 변경될 때마다 코드를 빌드, 테스트 및 배포합니다
- 타사 도구 및 AWS와 통합

#### 가격
- 활성 파이프라인 1개당 1.00USD

> [실습을 위한 저장소](https://github.com/aws-samples/cicd-for-ecs-workshop-code)

## AWS Code Pipeline - 롤링 업데이트
- CodePipeline으로 CI/CD 파이프라인을 구축하고, 애플리케이션 코드 변화를 Staging 환경의 ECS 서비스에 배포
- ECS 서비스를 정의할 때 롤링 업데이트의 세부 규칙을 정의

### 배포 파이프라인
1. 컨테이너 이미지 & 애플리케이션 코드 Repository 생성
  - 컨테이너 이미지를 호스팅 할 ECR repo를 준비
  - AWS CodeCommit repo를 생성해서 애플리케이션 코드 저장
2. ECS 리소스 생성 (로그 그룹 / Task / Task definition)
  - ECS task를 위한 CloudWatch 로그 그룹 생성
  - ECS task definition 생성
  - ECS 서비스 생성
3. 소스-빌드-배포를 포함하는 CodePipeline 정의
  - 소스로 CodeCommit 연결
  - CodeBuild 프로젝트 정의
  - Deploy Stage로 ECS 클러스터 & 서비스 연결
  - 애플리케이션 호출 테스트
4. 변경 및 재배포 테스트
  - 변경 내용을 서비스에 commit & push 하고, 파이프라인을 다시 trigger 한 후, 다시 테스트

## AWS Code Pipline - 블루/그린
- 블루/그린 배포 - 이전 애플리케이션 버전을 실행하는 환경(블루)과 새 애플리케이션 버전을 실행하는 환경(그린)을 별도로 격리하여 생성하는 배포 전략
  - 프로덕션 트래픽을 전환하기 전에 새로 배포된 환경을 테스트할 수 있습니다.
  - 현장에서 롤링 업데이트를 사용할 때 발생할 수 있는 불일치를 피하면서 이전 버전에서 새 버전으로 즉시 전환할 수 있습니다.
  - 새 버전을 실시간으로 전환한 후 문제가 감지되면 이전 버전으로 즉시 롤백할 수 있습니다.
  - 블루/그린은 카나리 및 선형 배포와 같은 다른 전략의 baseline을 제공합니다.
- 이전 실습의 롤링 업데이트([Link](https://www.notion.so/CJ-Oliveyoung-CI-CD-Workshop-for-ECS-2024-3-6-a751c7ac67ca4370b8b0cf6a6f993dec?pvs=21)) 파이프라인 아키텍처에 아래 두 단계를 추가
  - `Approve` 단계 - 프로덕션 배포를 승인
  - `DeployProd` 단계 - 프로덕션에 블루/그린 배포
    - prod 클러스터의 새로운 ECS 서비스인 `hello-server-prod`에 배포
    - 프로덕션 release를 위한 변경사항이 승인(Approve)되면, CodeDeploy에서 최신 task definition을 활용하도록 `hello-server-prod` 서비스를 업데이트
- 블루그린 배포를 위해, ALB의 80 포트 리스너는 경로 `/hello/*`로 들어오는 트래픽을 이 두 타겟 그룹 중 하나로 전달하도록 구성
  - 애플리케이션의 새 버전은 다른 그룹에 배포되며, 실행 상태가 되면 CodeDeploy에서 타겟 그룹을 전환해서 새 버전을 적용

### 배포 파이프라인
1. 프로덕션을 위한 로드밸런서의 타겟그룹 및 ECS 서비스 생성
  1. ALB의 블루/그린 타겟그룹 생성
  2. 프로덕션 서비스 용 CloudWatch 로그 그룹 생성
  3. 프로덕션 서비스 용 Task definition 생성 및 등록
  4. 프로덕션 ECS 서비스 생성
2. CodeDeploy 애플리케이션 정의
  1. 소스 repository에 task definition 및 app spec 파일 추가
  2. CodeDeploy 애플리케이션 생성
  3. 프로덕션 클러스터를 위한 CodeDeploy 배포 그룹 구성
3. 파이프라인 단계 추가
  1. `buildspec` 업데이트
  2. `Approve` 단계 추가
  3. `DeployProd` 단계 추가
4. configuration 및 애플리케이션 변경을 push
  1. configuration 변경을 push → 파이프라인을 트리거
  2. 파이프라인을 모니터링하고, 프로덕션으로 배포를 승인(Approve)
  3. 프로덕션 애플리케이션을 테스트
  4. 애플리케이션 코드 변경을 push
  5. 파이프라인을 모니터링하고, 프로덕션으로 배포를 승인(Approve)

## AWS Code Pipeline - 테스트 포트 설정 & 카나리 배포

### 실습 시나리오
- 이전 랩에서 생성된 CodeDeploy 애플리케이션 구성을 수정해서 다양한 기능 테스트
  - 배포 그룹(deployment group)에서 테스트 리스너 및 검증 기간을 활용 → 블루/그린 그룹을 스위치하기 전에 새로운 task set을 테스트 포트에서 검증
  - 이전 버전으로 롤백
  - 카나리 및 선형 배포 활용
- 실습 순서
  1. 테스트 포트에서 replacement task set 검증하기
    1. 프로덕션 ALB에 테스트 리스너 및 리스너 규칙 추가
    2. 검증 테스트를 실시하도록 CodeDeploy 애플리케이션 업데이트
    3. 변경사항 배포
    4. 테스트 포트를 사용해 새 배포 검증
    5. 운영 트래픽을 re-route하고 롤백 수행
  2. 카나리 배포
    1. CdeDeploy 애플리케이션 업데이트
    2. 이전 변경사항을 다시 배포 시도

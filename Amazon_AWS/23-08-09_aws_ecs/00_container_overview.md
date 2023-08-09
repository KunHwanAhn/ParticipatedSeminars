# Container Overview
- 최용호 SA
- [발표자료](https://file.notion.so/f/s/276f2453-b9ca-4d37-a094-a2ae7f6a3fc2/Session1_Container_Overview._230809pdf.pdf?id=4c9ca9db-1ef8-4243-82b5-0d60b27789bf&table=block&spaceId=769c01d3-3a50-4175-96f8-6a9a7a70abb6&expirationTimestamp=1691647200000&signature=H9--XNQdet1lSViC2kQ1na8LXzhnpgmTXU1c72P1g4M&downloadName=%5BSession1%5D+Container_Overview._230809pdf.pdf)

## 컨테이너란?
- 규격화 되어 있어서 정리하기 쉬움
- 격리되어 있어서 다른 곳에 영향을 주지 않음

## 컨테이너의 장점
- 재사용성
- 가벼운 가상화 기술
- 높은 이식성
- 효율적인 리소스 사용
- 개발 생산성 향상

## 재사용성

### 어플리케이션 서비스 환경 구축
- 서버를 구축하다보면 A환경에서는 되는데 B환경에서는 안되는 상황이 비일비재
- 문서를 정리하고 관리해서 Step-by-Step으로 따라하더라도 안되는 경우도 있음

### 필요한 것들을 미리 만들어 놓을 순 없을까요?

#### 이미지
- 노턴 고스트
- AWS AMI
- 도커 이미지

#### 이미지 속에 세부 내용을 보거나 변경하고 싶다면?
- 이미지를 통해 OS 실행하고 실행된 OS를 사용
- 그리고 추가 작업을 한 뒤에 새로운 이미지를 저장함
- 관리하기가 힘들어짐

#### 이미지의 내용도 확인하고 버전관리도 하려면 어떻게 해야 할까요?
- 앤서블
- saltstack
- C chef
- AWS CloudFormation

### 도커는 Dockerfile을 사용하여 코드화
- Dockerfile 작성
- 이미지 만들기
- 완성된 이미지를 저장소에 저장
- 이미지는 컨테이너 형태로 구동

## 가상화 기술
- 리눅스의 기술을 사용하여 선박의 컨테이너처럼 프로세스가 사용하는 자원을 격리
   - Storage
   - Namepaces
   - Networking
   - Cgroups
   - Security

### Process Namespace
- 동일한 이미지를 사용하여 두 개의 컨테이너 인스턴스 시작
- 호스트에서 볼 때 컨테이너화 된 투 애플리케이션은 호스트에서 기보적으로 실행되는 다른 프로세스처럼 보임
- 각 컨테이너 내부의 셸에서 보면 애플리케이션은 별도의 프로세스(PID) 네임스페이스에서 PID1로 실행
- PID 네임스페이스 분리는 한 컨테이너의 프로세스가 다른 컨테이너의 프로세스를 보거나 상호 작용하는 것을 방지

### Process (PID) Namespaces를 사용한 컨테이너 격리
- PID namesapce (parent) <-> PID namesapce (child)
- 리눅스는 기본적으로 페어런트 프로세스가 죽으면 자식 프로세스도 같이 죽음
- systemd는 호슽츠의 root process (PID 1) 입니다.
- `dockerd`, `docker-containered`, `docker-containerd-shim`은 컨테이너 인스턴스의 수명 주기를 관리하는 docker 데몬과 관련된 ahems vmfhtptm
- PID 네임 스페이스 격리를 사용하면

### Mount Namespace
- 동일한 호스트에 있는 서로 다른 두 컨테이너 인스턴스 내의 파일 시스템
- 컨테이너가 격리되어 있으면 각자의 파일 시스템을 갖고 있기 때문에, 한쪽에서 파일을 수정해도 영향이 없음

### Containers의 쓰기 가능 레이어
- Docker 이미지는 일련의 레이어로 구성
- 각 레이어는 Dockerfile의 지침입니다. 각각은 읽기 전용 파일 시스템을 나타냅니다.
- 컨테이너가 생성되면 새 쓰기 가능 레이어(컨테이너 레이어)가 기본 레리어 위에 추가
- 이러한 모든 계층을

#### Dockerfile, 레이어, 컨테이너
```Dockerfile
FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py
```
- 도커는 레이어 기반으로 쌓이기 때문에 명령어를 실행할 때는 `&`를 사용하여 한 번에 실행하는 것을 권장

#### Union File System
- docker inspect 명령어를 사용하여 파일 시스템의 구조를 확인할 수 있음
- MergeDir: 실제 접속했을 때의 파일 시스템. 도커 호스트의 경로임
   - 워커 노드가 탈취당하면 모든 민감한 정보를 볼 수 있게 되기 때문에 매우 조심해야 한다.

> `netshoot` 이라는 컨테이너가 네트워크 관련 패키지가 모두 설치되어서 범용적으로 쓰기 좋음

#### 컨테이너에서 데이터 지속
- 컨테이너를 제거하면 실제로 MergeDir에 있는 파일도 제거함
- Volume Mount를 하여 별도로 관리해야 함
   - Dockerfile 내의 VOLUME /data
   - /var/lib/docker/volumes/$volumeId

### Network Namespace

#### 네트워크 네임스페이스를 사용한 컨테이너 격리
- ipconfig
   - lo: loof back
   - eth0: Primary interface
   - docker0: Virtual Bridge
   - 13: vethXXXX@if12: Virtual ethernet inerface of `veth` interface
   - 15: vethYYYY@if14: Virtual ethernet inerface of `veth` interface
- 가상 네트워크는 항상 페어로 묶여서 만듬. Host와 컨테이너 네트워크가 쌍으로 있음
- 포트포워딩이 되는 이유는? 호스트의 IP테이블을 사용하여 매핑하기 떄문
   - $ iptables -t nat -S
   - 컨테이너는 가상의 네트워크, 컨테이너 내부의 트래픽도 외부로 나갈 수 있어야 함

#### 컨테이너 네트워킹

### 컨테이너의 장점 #2 - 가벼운 가상화 기술
- VM vs Container
- VM은 커널도 분리되어 있음
- Container는 커널을 공유하지만 가볍게 띄울 수 있음

### 이식성

#### Ubuntu 리눅스 서버에서 어떻게 CentOS 컨테이너가 실행될 수 있을까요?
- 컨테이너는 리눅스 커널에 종속적이다. 배포판에 종속적이지 않다.
- 도커는 커널의 기술을 사용하기 때문에 모든 배포판에서 사용 가능

### 컨테이너의 장점 #3 - 높은 이식성
- 코드, 디펜던시, 런타임을 모두 모아 놓고 실행하기 떄문에 코드와 모든 의존성을 패키징한 소프트웨어 단위

#### 로컬에서 작동, 프로덕션에서는 작동하지 않는 이유는?
- 환경별로 버전이 다를 수 있기떄문에

#### AUFS
- 도커는 우분투에서만 띄워야 하나? 18.06 이전 기준
   - 우분투를 제외한 다른 배포판에서는 aufs를 지원하지 않았었음
- aufs 라는 파일 시스템을 사용했으나, 이후부터는 Overlay2로 바뀜
- Overlay2를 사용하는 리눅스 배포판을 선택해서 사용하는 것을 권장함

### 리소스 관리

#### 물리 서버를 사용하는 경우
- 워커 노드의 자원이 많이 남아도 관리하기가 어려움

#### 컨테이너를 사용하는 경우
- 워커 노드들에 여러 컨테이너를 띄우면서 최대한의 자원 활용을 할 수 있음
- CGroup을 사용하여 자원 리소스 제약을 걸 수 있음

### 생산성
- Dockerfile을 보면 모두가 동일한 이해도를 가질 수 있음
- 컨테이너 기반 서비스 지원 - CaaS (Container as a Service)
- 커뮤니티 지원

### 프로덕션 적용하기
- 부하 증가 시, 서버 확장을 해야 하는데...
- 트래픽을 완화하려면 서버의 확장이 필요

#### 오케스트레이션 도구
- AWS ECS
- AWS EKS
- Redhat OpenShift

#### 컴퓨팅 엔진
- AWS EC2
- AWS Fargate

#### 저장소
- AWS ECR

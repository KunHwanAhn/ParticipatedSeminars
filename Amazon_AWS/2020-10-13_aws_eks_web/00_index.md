# Amazon EKS로 간단한 웹 애플리케이션 구축하기
- Jooyoung Kim / Solutions Architect
- [참고자료](https://master.d3s71i2n51x60t.amplifyapp.com/ko/)

# 목차
- 컨테이너
- 컨테이너 오케이스트레이션 도구
- K8S
- Amazon EKS로 간단한 웹 어플리케이션 구축하기

# 컨테이너

## 컨테이너의 특징
- 신속성: 가벼운 도커 이미지
- 이식성: 이미지 기반 배포
- 효율성: 레이어 저장 방식
- 유연성: MSA 모듈화

# 컨테이너 오케이스트레이션 도구
- 늘어나는 컨테이너를 어떻게 관리할 것인가? -> 컨테이너 오케이스트레이션 도구로 효율적으로 관리하자!
- AWS ECS & AWS EKS
- EC2 or Fargate

## AWS ECS(Elastic Container Service)
- 아마존 자체에서 구현한 오케스트레이션 도구

## AWS EKS(Elastic Kubernetes Service)
- 아마존에서 관리하는 K8S

## EC2 or Fargate
- EC2: 직접 관리해야 함
- Fargate: AWS에서 관리하고, 컨테이너만 동작

# K8S
- 컨테이너 오케이스트레이션 툴 중 하나로, 배포 스케일링 그리고 컨테이너화된 애플리케이션을 자동화하는 오픈 소스 시스템

## Amazon EKS 특징
- Managed K8S control plane sevice
- Tightly integrated with AWS Services
- Built with the Community
- Conformant and Compatible

### Amazon EKS의 contorl Plane
- Amazon EKS의 contorl Plane은 AWS가 관리하고, 고객은 Worker Node에만 집중하면 된다.
- 시간당 0.1$. 한달 기준 75$

### Amazon EKS의 Data Plane
- Managed node group
- EKS에 최적화한 AIM을 사용하여 인스턴스를 생성함

#### Amazon EKS Data Options - Mixed mode
- 컨테이너에서 동작하는 코드에만 집중하고 싶다? -> AWS Fargate
   - 단, 제약사항이 있으니 잘 확인하고 결정해야 함!
- Pod 기준 과금

### 배포 방법
- AWS Web Console
- AWS Cloudformation
- eksctl
- etc...

### Amazon EKS와 사용할 수 있는 서비스
- Networking
   - Amazon-vpc-cni-k8s
   - ALB Ingress Controller
- Storage
  - CSI Driver(Amazon EBS, EFS, FSx for Lustre)
- Cluster management
   - ckd
   - eksctl
- Monitoring
   - CloudWatch Container insights
   - AppMesh
- Security
   - KIAM
   - KMS

# Amazon EKS로 간단한 웹 어플리케이션 구축하기
- BE: flask & node.js
- FE: nginx + react

## Deployments
- Pod와 ReplicaSet에 대한 선언적 업데이트를 제공

## Services
- Deployments와 함께 새로운 Pod를 추가하거나 관리
- K8S의 Service Type
   - ClusterIP
   - NodePort
   - LoadBalancer

## Ingress
- 클러스터 외부에서 쿠버네티스 내부로 접근할 때, 요청을 어떻게 처리할지 젇ㅇ해놓은 규칙이자 리소스 오브젝트

### Amazon ALB Ingress Controller
- InstanceNode(default): Node에 연결
- IP Mode: Pod에 직접 연결

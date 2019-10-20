# 웹서비스에서 MSA 톺아보기
- 김한성, SKT
- DB, Message Queue, Cache 등의 대략적인 설명과 사용/응용 예시를 설명합니다.
- 발표자료 - TBD

> Serverless(Cloud)로 Cloud에서 운영하기

# Monolithic Architecture

# SOA, Service Oriented Architecture
- 대규모 컴퓨터 시슽메을 구춗할 때의 개념
- 업무상 일 처리에 해당하는 소프트웨어 기능을 서비스로 판단하여 그 서비스를 네트워크 상에서 연동하여 서비스를 구축하는 것

# MSA, Micro Service Architechture
- 애플리케이션을 느슨히 결합된 서비스의 모임으로 구조화하는 SOA 스타일의 일종인 소프트웨어 개발 기법
- 작은 여러 개의 서비스로 큰 시스템을 구축하는 방식

## 구성요소
- API Gateway: API의 End-point 통합
- Orchestration: 여러개의 서비스를 묶어서 하나의 서비스로 만듦, 서비스(컨테이너) 배포 관리
- Service Mesh: 서비스간의 통신, 네트워크 관리

> 서비스의 특징에 따라서 적재적소에 맞는 프레임워크, 라이브러리를 선택하는 능동적인 개발

> 정해진 사이트에서만 요청하도록 (CORS)

## MSA의 장점
- 확장의 유연함
- Fault Isolation

## MSA의 단점
- 장애 추적의 복잡성

> https://microservices.io

# On-Premise에서 MSA?
- 물리 서버 관리하는 것부터 일 -> 네트워크, 스토리지 등
- 다양한 프레임워크를 쓰다보면 매번 새로운 장애 발생 -> 라이브러리, 모듈 등
- 관리용 애플리케이션 필요 -> Cron, Monitoring, Batch 등
- Scaling(Up/Down/In/Out) 등에 제약이 있음 -> 서버 구매부터 설치까지

### 매번 새로운 장애
- Mac에서 NodeJS 프로젝트를 빌드해서 배포했더니 Linux에서 실행 안됨
   - 특정 Package에서 OS 의존성 문제가 있었음
- 트래픽 부하 테스트 한다고 사내 개발서버에서 ㅔ스트
   - 회사 전체 인터넷 다운...
- Elastic Search에 넣은 데이터가 검색이 안됨
   - Mapping된 타입과 다르면 데이터가 안들어감
- 유난히 더웠던 여름
   - 개발용 물리서버 죽음

# Cloud & Serverless
- Cloud: 가상화된 컴퓨터의 시스템 리소스를 제공
- Serverless

## 대표적인 Serverless
- AWS Lambda
- 서버에 대한 걱정 없이 코드 실행
- 서버를 프로비저닝하거나 관리할 필요 없음
- 다른 AWS 서비스에서 코드를 자동으로 트리거하도록 설정

### 자판기 카드결제
- Order -> Payment Gateway -> AWS API Gateway -> AWS Lambda -> Native Push

### Lambda & MSA
- CloudFront(with S3) -> API Gateway -> Lambda -> MySQL DB

### Azure & GCP의 경우
- Azure: Functions
- GCP: CLoud Functions

# Cloud의 문제

## 시간은 곧 비용
- 개발기간 / 잘못된 테스트 / 트래픽부하 테스트 / Web Console에서 로그 등 모두다 비용과 관련

## On-Premise -> CLoud Migration
- Cloud에 맞춰서 Costomize 필요
- 잘못 설계시 Rollback의 위험성
- 학습비용 (Learning Curve)

# Multi Cloud
- Cloud 서비스별로 서비스명도 옵션도 모두 다름
- Terraform
- Serverless: 공통기능만 제공, 서비스별 디테일한 기능은 제공 안함

## Multi AZ + Region
- 개인정보 보호법
- 법 때문에 데이터를 타 Region으로 이전 시키기가 어렵다.

## Hybrid Cloud
- Hybrid Cloud = Private Cloud + Public Cloud = on-Premise + Public Cloud

### HCI (Hyper Converged Infrastructure)

# Docker + Kubernetes + Istio = MSA in On-Premise

## Docker
- Application들을 Container 안에 배치시키는 일을 자동화하는 오픈소스 시스템

## Kubernetes
- Container Manager

## Istio
- Service mesh

## 문제점
- 네트워크: Cloud끼리 유기적인 통신이 가능해야 함
- 비용: Cloud 간의 통신 비용
- 권한: Cloud 계정의 권한 + k8s 유저 권한 + 개발 System 권한
- 운영: 장애발생 === 모험, 운영요소 통합 (Monitoring, Alarm 등), 계정 관리
- 표준: 통신 프로토콜 표준 (Restful HTTP, gRPC, TCP...)

# 최적의 조화는?
- 적적한 Cloud Service + k8s Cluster
- k8s Cluster = Application
- Cloud Service = Data store
- Cloud = Region

> Serverless & Terraform을 잘 사용하는 것도 방법

# Free Tier Google with GCP & Serverless

# Serverless
- Serverless != No Server
- 물리적 서버가 없는 아키텍쳐가 아닌, 논리적 서버가 없는 아키텍쳐
- Micro Server Architecture
- Cloud에서 제공하는 기능을 최대한 활용
- 모든 하드웨어 관리 및 유지보수는 GCP에 맡겨라

## Strong point of Serverless
- Auto-Scaling: 존재 자체가 Auto-Scaling
- 비용: 정확히 쓴만큼 낸다.

## 구성은 어떻게?
- 연산 => Google Cloud Functions
- 저장공간 => Google Cloud Storage
- Simple Messaging => Google Cloud Pub/Sub
- Monitoring, Logging => Google Stack Driver

### Sample 시나리오1
- 사용자가 이미지 업로드: Cloud Functions로 연산
- 이미지 파일복사: Cloud Storage
- 이벤트 Noti: Google Cloud Pub/Sub
- Monitoring & Logging: Google Stack Driver

### Sample 시나리오2
- Cloud Source Repository -> git push -> Function -> Slack Noti

## Cloud Functions
- Beta
- AWS - Lambda / Azure - Function에 대응하는 서비스
- Serverless의 핵심
- Auto-Scale: 요청수 만큼 자동 배포
- Node.js v6.9.1 Only & Version 선택이 불가능
- Cloud Pub/Sub, HTTP Trigger, Cloud Storage Bucket
- 과금방식
  - 호출횟수: 100만건당 $0.4
  - 메모리(GB) * 사용시간(s): 40만 GB/second당 $1
  - CPU성능(GHz) * 사용시간(s): 10만 GHz/second당 $1
  - 러프하게는 간단히 말해서 100만건당 $1 정도
- IoT 관련 이야기
  - 사람마다 데이터를 받는 서버가 필요하다.
  - 하지만 항상 데이터가 많은 것이 아니다.
  - 데이터가 몰리는 시간에만 Function을 사용해서 처리를, Function이 Function을 호출해서 복합적인 일을 처리한다.

#### 굳이 많은 요청이 없는데도 Compute Engine을 쓸 필요없이, Serverless를 고려해봐라

# Free Tier
- 12개월동안 $300달러 정도의 Deposit
- Always Free with limits
  - Google Compute Engine
  - Google Cloud Storage
  - Google Cloud Pub/Sub
  - Google AppEngine
  - Google Cloud Datastore
  - Google Stackdriver
  - Google Clud Source Repositories

## Free Tier 제한
- 단순한 개인 포트폴리오 웹페이지 정도는 무난하게 쓸 수 있을 것이다.
- Compute Engine
  - f1-micro: 공유 v1CPU / 0.64GB RAM (`US Region Only`)
  - 30 GB HDD
  - 1GB Network Egress
- Cloud Storage
  - 5GB Storage (`US Only`)
  - 1GB Network Egress
- Cloud Functions
  - 2M Invocations Per Month
  - 400,000 GB-Seconds (RAM)
  - 200,000 GHz-Seconds (CPU)
  - 5GB Network Egress
- Cloud Pub/Sub
  - 10GB Message per Month
- AppEngine
  - 28 Instance hours per day: 1개의 Intance이면 다 못쓰고, Instance * time <= 28
  - 5GB
  - 100 E-mail per day
- Cloud Datastore (No-SQL DB)
  - 1GB Storage
  - 50,000 Read
  - 20,000 Write
- Google Stackdriver
  - Monitoring & Logging Tool
  - 5GB Logs with 7day retention
- Cloud Source Repositories
  - Public Project는 Github, Private은?
  - 1GB Private Hosting

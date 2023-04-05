# Google Cloud Platform Key Updates
- 최명근, Google Cloud Sale Engineer

# Key Udpates
- 100개의 Announcements(!)
  - 이번 발표에서는 100가지 중에서 33개를 선출해서 발표
- Drive에서 이제 개인별로 권한이 아니라, Team base로도 권한을 관리할 수 있는 기능이 추가됨
- Team으로 회의할 때 쓸 수 있는 Online Whiteboard, 젬보드

# GCP Infra Structure

## New Data Center Regions
- 6개 Reigion / 18개 Zone
- Asia: 대만, 도쿄

## Internal load balancing (GA) with private internal IP Addresses
- Private IP를 사용해서 내부의 Instance들을 Load balance

## Cross-Project Networking (Beta)
- GCP는 VPC구조는 없고, Project 단위로 Region & Zone을 선택함
- Project가 다를 경우, 서로 다른 Private IP를 갖고 있어서 통신이 안됐음
- 이제는 XPN을 생성하여 Project간 통신이 가능해짐

## GCE(Google Container Engine) - Managed Nodes
- Managed Kubenetes
- 파드라는 단위로 묶을 수 있음.

## 64 core machines + 416GB of memory per instance
- Machine Core SPEC UP

# Developer platforms

## Google AppEngine Flex (GA)
- Standard Version
  - Sandbox로 제공하다보니 제한적인 부분이 있음.
  - Container Base
- Flex Version
  - Standard에서의 제한적인 부분을 풀어주기 위해서 새로 만들었음.
  -  Native로 제공하는 언어: Java 8 / Servlet 3.1 / Jetty 9 / Python 2.7 & 3.x / Node.js / Ruby / PHP
  - VM Base

## Cloud Functions (Beta)
- Javascript Base
- 전체 로직을 구현하기에는 적합하지 않고, 단순한 로직에 적합함.
- Trigger용도로 사용하는 것이 좋음
- Action이 끝나고나서 메시지를 전송한다던지, Event를 처리하는 정도
- Pub/Sub에서 Topic을 전송 받아서 동작을 시작한다던지...
- AWS Lambda

## Firebase Integration with GCP (GA)

## Cloud Container Builder
- Google Cloud Repository에 저장한 Source를 기반으로 Docker Image를 Build

## Community Tutorials (Beta)
- https://cloud.google.com/community/tutorials/
- 모든 사람들이 올릴 수 있으며, 자신을 경험을 공유하는 장이 되기를..

# Pricing
- GCP는 늘 최대한 저렴한 가격으로 제공할 수 있도록 노력 중...

## Compute Engine Price Cut
- Up to 8% Off

## Committed Use Discounts
- No upfront / Up to 57% Off

## Free trial extended to 12 months
- From 3 months to 12 months
- $300 Credit with 12 months
- https://cloud.google.com/free/

## Engineering Support
- Role based model
  - Development engineering support - 3~4시간 내 응답, $100/user per month
  - Production engineering support - 1시간 내 응답
  - On-call engineering support - 15분 내 응답

# Data Analysis

## BigQuery Data Transfer Service (Private Beta)

## Cloud Dataprep (Private Beta)
- 데이터를 분석할 때 Raw Data의 정리가 필요할 때 사용
- 정리 후 BigQuery에 전송한다던지, 다양하게 사용가능

## New Commercial Dataset
- 기본적으로 제공하는 Dataset

## Python for Cloud Dataflow (GA)
- Java만 가능했던게 Python도 지원한다.

## Stackdriver Monitoring for Cloud Dataflow (Beta)
- 모니터링

## Google Cloud Datalab (GA)

## Cloud Dataproc updates
- Hadoop Base의 Managed Service by Google

# Databaase

## CloudSQL for PostgreSQL (Beta)
- MySQL 말고도 지원한다

## Microsoft SQL Server Enterprise (GA)

## CloudSQL for MySQL improvement
- 메모리 추가 증설 가능 2028GB

## Cloud Spanner
- 손쉬운 확장이 가능한 RDB

## SSD persistent-disk performance improvements
- IOPS 개선

## Federated Query on Google Bigtable
- BigTable(NoSQL)를 사용해서 데이터를 뽑아서 볼 수 있는 기능이 추가됨

# Machine Learning

## Cloud Machine Learning Engine (GA)
- Managed Tensorflow by Google

## Cloud Video Intelligence API (Private Beta)
- 영상을 실시간으로 분석하는 Vision API의 영상 버전

## Cloud Vision API (GA)

## Machine Learning Advanced Solution Lab(ASL)

## Cloud Jobs API

## Machine Learning Startup Competition


























# About GCP
- 발표자: Google Cloud Sales Engineer, 최명근
- [슬라이드](https://www.slideshare.net/secret/42oUfURjxfS7wP)

## Now
- 사용자가 직접 관리
- 유지보수가 필요함

## Next
- 모든 것이 자동화

# Which Cloud vendor?
- 경제적인 부분
- 미래를 보장하는 아키텍쳐
- 실질적인 H/W위에서 구동하는 S/W에 대한 이노베이션이 중요함 -> 얼마나 안정적인 서비스를 운영할 수 있는가
- 개방성

# About Google
- Google은 Cloud를 위해 만들어진 회사가 아니지만, 서비스를 유지하기 위해서 자동적으로 H/W & S/W에 집중해서 개선하려는 노력을 기울였으며, 그 결과 전세계적으로 서비스를 운영할 수 있는 역량을 기를 수 있었음.

# About Cloud
- Compute
 - App Engine: PaaS형태의 서비스, 비지니스 로직만 Deploy만 해주면 운영은 Google이 관리해주는 것
 - Compute Engine: IaaS, 원하는 스펙대로, 원하는 리전을 정해서 사용
 - Container Engine: Docker container를 어떻게 관리할 것인가? Kubernetes based & Managed by Google
- Storage: RDB & NoSQL
- Big Data: 하둡, 스팍 등 다양한 오픈소스 기반 프레임워크를 사용할 것을 고려하고 있을텐데,,, 실직적으로 구축하려면 난관들이 기다리고 있음. => Managed된 서비스를 사용하는 것이 좋다.
 - 이미 만들어져 있는 Big Data 솔루션을 사용하는 것이 고객(우리)에게 이익이다.
- Machine Leanring: TensorFlow...

# 구글 클라우드 차별성
- 빅데이타 분석과 머신러닝
- 가격
- 네트워크 성능

# 빅데이타

## Google의 서비스 스케일
- 유튜브: 분당 400시간..
- Gmail: 9억명
- Search Index: 10 Pb+
- Search Query time: 0.025s

## Big Query (코드명: 드레멜(?))
- Google이 제공하는 데이터 분석툴.
- 기존의 RDB에 비해서 월등한 성능을 갖고 있음.
 - MySQL로 4Tb의 자료를 Query할 경우 1일 정도 소요...Big Query는 30~40초 내로 해결이 가능함
 - 저렴한 비용으로 Google의 Infra를 사용할 수 있음.
- CLI / API / Web UI를 사용해서 Big Query를 사용할 수 있음.
- 이미 완성되어 있는 도구!
 - 직접 작업을 하려면 fluentd, hadoop, spark, casandra 등 다양한 도구들을 직접 구현해야 함
 - Big Query는 이미 구현되어 있기 때문에 러닝커브도 없다.
- Cloud Pub/Sub = Kafca
- 이미 공개했기 때문에 오픈소스 기술임.

## Google Big Data Services
- Dataproc = Hadoop & Spark
- Pub/Sub = 빅데이타 수집용 메시지큐
- Datalab = 데이타 과학자 작업 공간 (파이썬노트)
- Dataflow = 메시지 배치 및 스트리밍 (Spark)
- Datastudio = 데이터 분석 리포팅 생성도구(BI)

## 저장소
- 데이터 분석을 위해서는 분석할 데이터를 저장할 공간이 필요함
- 현재 대부분의 Cloud 벤더들은 저장소 가격을 낮추고 있는 상황임.

# 머신러닝

## 머신러닝이란?
- 데이터를 받아서 특정 알고리즘에 의해서 데이터를 모델링 => 데이터 모델링을 기반으로 예측을 사람 대신 해주는 것
- TensorFlow: manually 작업을 해야 한다면 선택
- Machine Learning APIs: Translate, Speech, Vision, Natural Language
 - 이미 대부분 구성이 되어 있는 서비스
 - Vision: 역시..동일한 자료로 약파는 중..
 - Speech: 역시..동일한 자료로 약파는 중..
- Cloud Machine Leaning

## Deep Learning (Alphago)
- Inbox by Gmail: 메일 내용의 Context를 읽어서 분석한 뒤에 Suggestion

# 가격정책
- 분 당 과금정책: 62분을 사용했다면 62분만큼 과금, 아마존은 62분 사용시 120분
- 사용량 기준 최대 30% 할인...
- 인스턴스 사용량 합산 과금: 최저요금 인스턴스 기준으로 비용을 계산하여 과금함.
- Customizable 인스턴스 제공: UI Drag & Drop으로 인스턴스의 성능을 변경 가능함
- 자동할인으로 별도의 비용 최적화를 위한 비용 절약

## 인스턴스 커스터마이징

## Preemptible VM
- 기존 가격에서 80% 할인 받은, 20% 가격으로 사용
- 생성 후 24시간만 사용(재 생성 가능)
- 배치가 대규모 연산에 사용 가능 (유전자 분석에 56,000 VM 사용 사례)

# Network: 내부망 대역폭 1Pb
- 10만개의 서버에서 1000Gb를 전송해도 무난하게 처리할 수 있을 정도의 대역폭임.
- 따라서, Google의 Network는 전 세계 어디서든 무난하고 빠른 속도로 접속 할 수 있음.

## 내부 네트워크
- 코어당 2GB 네트워크 대역폭으로 제한 (최대 16GB)
- 분산 환경에 유용

## AWS VS GCP
- 리전간 데이터 통신 시, AWS는 인터넷 망을 사용하지만, GCP는 내부 VPN으로 Fiber망으로, ISP의 중계 없이
- 현재 대만의 데이터 센터가 가장 가까움, q4에 일본도 열릴 예정, 만약 대만에서 문제가 발생할 경우, 유럽이나 US쪽으로 사용
- 2017년까지 10개의 데이터센터를 추가로 구축할 예정임. 다만, 한국은 예정에 있다고 말하기 어려움.
- AWS CDN VS GCP Cloud CDN: CDN 전문 업체만큼의 성능은 나오지는 않음. 정말 CDN이 중요하다면 외부 CDN 업체를 사용하는 것을 권장..

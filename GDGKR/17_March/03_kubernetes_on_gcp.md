# Kubernetes on GCP
- 김대근, 레진엔터테인멘트
- https:/geekdani.wordpress.com/

# 레진 데이터팀은 왜 GCP를 선택했나?
- 안정적이고 독립된 Data Infrastructure
- 어느 서비스와 붙여놔도 범용적으로 쓸 수 있는 구조가 목표
- 수집 -> 가공 -> 적재 -> 모델링 -> 분석

## Using Google Cloud Platform in 레진
- AppEngine / Container Engine / Cloud Load Balancing
- Logging
- Cloud Storage
- Cloud Pub/Sub
- Cloud Cloud Dataflow
- Cloud SQL
- Cloud Datastore
- BigQuery

## Analysis Tools
- redash
- presto
- jupyter
- druid
- Elastic Search

## GCP 기능 외에 필요한 것
- 스케쥴러
- 추천 데이터 서빙용 어플리케이션 서버
- 서비스 특화된 지표용 백오피스
- 기타 수 많은 어플리케이션 서버

# 제품 선정에 사용한 Checklist
- https://12factor.net/
- Deployment
- Provisioning
- Automation
- Statless, Statefule
- Scalability
- Monitoring
- Discovering Service

# Deployment
- Provisioning
  - OS, Network..
  - Resource
- Application Code
  - Dependencies
  - Configurations
- Udpate
  - Rolloing Update
  - Blue-Gree Deployment
- Rollback

# Kubernetes Pod
- 위에서 언급한 것을 해결해주는 기본 모델

## Pod
- 배포 최소 단위
  - 하나 이상의 Container (docker / rkt) 포함
    - 함께 포함시켜야 할 것이 있다면 함께 선언
  - Resources
    - Volumes, Port
    - CPU, Memory
      - Request, Limit
    - livenessProbe: 해당 Pod이 정상적으로 동작하고 있는지 확인하는 도구
- Unique IP address

### Creating a Pod

```
$ kubectl create -f xxx.yaml
```

> 이후부터는 Kubernetes와 깊숙하게 관련된 내용이라..따라가지 못했음..ㅜ

## QoS
- Guaranteed
  - Limits OR Limits = Request
- Burstable
  - Limits not set OR Requests != Limits
  - Guaranteed and Best-Effort = Burstable
  - Burstable and Best-Effort = Burstable
- Best-Effort
  - Requests, Limits 모두 설정 안된 경우
- 이를 바탕으로 oom_score_adjust 결정
  - 중요한 것이 먼저 Kill될 수 있으니 반드시 설정

## Expose Pod

# Kubernetes Config Map
- 소스 변경 없이 Configuration으로 제어

# Kubernetes Deployment
- Newer and Higher level concept (since 1.2)
  - ReplicaSet, ReplicationContorller
- Pods, ReplicaSet 등 리소스를 생성하고 기존의 것을 바꾸는 등 일련의 작업을 명시
  - Replica, Autoscaling
  - Rolling Update, Rolling Back
- PodTemplate

# Rolling Update
- 기본적으로도 제공하는 기능이지만 위의 Deployment를 사용하면 보다 효율적으로 관리할 수 있게 해준다.

# Rollback
- $ kubectl rollback
- $ kubectl rollout

# Scalability
- Scale in/out, auto scale
- scale up/down

## Horizontal Pod Autoscaling
- since v1.2
- $ kubectl autoscale

# Node pool

# Preemptible Node Pool
  - GCP지원, 저렴하게 사용할 수 있는 Node Pool

# Label
- 모든 Reousrce에 label 추가/삭제 가능

# Blue-Green Deployment
- GCP, AWS 빈스톡 Immutable과 흡사함

# 하나의 클러스터, 2개 이상의 팀
- Resource Quota
  - Namespace 별로 Resource Quota 설정이 가능

# Google Cloud HTTPS LoadBalancer

# Google Cloud Container Builder
- 코드 변경시 Container 빌드해서 Gogole Container Registry로 자동 배포

# StatefuleSets
- 상태를 가지는 어플리케이션
- Storage Class
- VolumeClaim Templates(PersistentVolumeClaim)

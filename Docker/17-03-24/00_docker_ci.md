# Docker with CI(Continuous Integration)
- 17-03-24

## Pivotal 소개
- Redis, RabbitMQ 등의 Ownership을 보유

## 업무 프로세스
1. 아이디어
  - 세세한 User Story를 기록하는 것이 중요하다.
  - 최대한으로 세세하게 구분해서 만들어야 한다.
  - 아무리 우선수위가 높더라도, 일이 너무 크면 그것은 잘못된 것, 새로 세세하게 만들어야 일로써 할 수 있다.
- Issue Tracker
  - PM이 관리한다.
  - Utility: Pivotal CF BOSH
- Implement
- Test
- Deploy
  - Amazon - apollo, 1초에 1번씩 배포가 되고 있다.
  - Airbnb - Airflow
  - Netflix
- Feedboack

## 배포전에 문제가 발생한 것은 나쁜것이다?
- Nope. 배포 전에 문제가 발생했기에 이를 고칠 수 있으니, 나쁜일이 아니다!

# Concourse CI
- [Webpage](https://concourse.ci/)
- Opensource
- Docker base CI
- 비행기 점검하는 것에서 모티브를 따와서 개발한 것이기에, 비행기와 관련된 용어들이 있다.

## Why Pivota made Concourse?
- 설정이 어렵거나, 의존성이 너무 심하거나, Docker를 지원하지 않거나 등등 원하는게 없었다.
  - 그래서 만들었다.

## How to use?
- [참고 페이지](http://cloud.spring.io/spring-cloud-pipelines/)
- .yml 파일로 설정을 관리함

# ETC, 여담
- AWS S3의 가용성은 2가지의 종류다
  - 99.99999999%로 데이터를 저장한다.
  - 99.999%로 API로 데이터를 가져올 수 있다.
  - 이는 곳 API로 데이터를 가져오지 못하더라도 다시 시도하면 높은 확률로 데이터를 가져올 수 있다.
- [BOSH](http://hosh.io/)
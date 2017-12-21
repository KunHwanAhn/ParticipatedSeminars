# [Istio](https://istio.io/)?
- The Elegant way to implement microservices
- 강인호, 오라클

## 목차
- 마이크로 서비스
- Evolution of MSA
- About Istio
- Istio Demo

## MSA?
- 독립적으로 배포 가능한 서비스들의 묶음으로 소프트웨어 애플리케이션을 설계하는 방법
- 다수의, 더 작아진 최소 기능의 Micro Services 배포

### 장점
- 서비스를 작게 나눔으로써 비용 효율적으로 관리가 가능함
- 변경해야 하는 부분만을 변경할 수 있음
- 여러 서비스 중 1개의 서비스가 다운되더라도 나머지 서비스에 영향이 없음

## Evolution of MSA
- [MSA Patterns](http://microservices.io)

### MSA Concerns
- 서비스 디스커버리
- 로드밸런싱
- 서킷브레이크

### Service Mesh
- Circuit Breaker & Service Discovery => Sidecar
- 애플리케이션 개발과 Circuit Breaker & Service Discovery를 분리
- Sidecar를 잘 구현한 것이 `Istio`

## About Istio
- Sidecar 패턴을 잘 구현한 오픈소스
- Google, IBM, Lyft / May, 2017

### Istio Features

#### Intelligent Routing and Load Balancing
- 다이나믹 로드밸런싱
- A/B 테스팅
- 카나리 릴리즈

#### Resilience Across Langues Platforms

#### Fleet-Wide Policy Enforcement

#### In-Depth Telemetry and Reporting

## Istio Architechture
- 현재(2017-12-16) 쿠버네티스에서만 사용이 가능함

### Sidecar
- 대부분의 일을 처리하고 있음
- envoy(by lyft) 사용

### Pilot
- Kubernetes / Mesos / CloudFoundry 연동 가능
- Rule에 의해 뒷쪽으로 분산시켜줌

### Mixer
- Quota Mgmt

### Request Routing

### Visibility

## Demo
- [Istio BookInfo](https://istio.io/docs/guides/bookinfo.html)







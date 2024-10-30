# 0원으로 클라우드 비용, 장애, 보안까지 한 번에 관리하는 비밀 공개
- 공태호님 / D트랙

## 장기간 빠른 인프라 확장의 연속
- 10, 50, 10000
- 클라우드 운영 10년
- AWS 어카운트 50+개
- EC2 인스턴스 10,000+대

## 관리가 되긴 되는데
- 어디서부터 어디까지 어떻게 되어있는 걸까?

### AWS Quotas 관리
- 전체 AWS 어카운트
- CLoudFormation
- NodeJS Lambda

## 표준화를 하자
- 클라우드 컴플라이언스를 체계적으로
- 또 저번에 그걸로 장애?!
- 이거 관리 어떻게?
- 갑자기 무슨 비용?

## 정책 정의
- 가능한 모든 리소스를 대상으로 100여 개의 정책
- 중요도 - Critical / Major / Minor
- 정책타입 - 보안 / 운영 / 비용
- 정책 예시
  - Minor / 비용 / EBS GP2 타입 GP3 전환 실행
  - Minor / 비용 / S3 Intelligent Tiering 설정 실행
  - Minor / 운영 / ALB WAF Fail Open 설정 실행
    - 기본적으로 비활성화 되어 있음
  - Major / 비용 / ASG 시간대별 인스턴스 수량 조정 실행
  - Major / 운영 / TG Deregistration Delay 설정 실행
  - Minor / 운영 / Service Quotas 자동 상향 요청 실행
    - 하루에 4~5번 이상 수동으로 하던 것을 자동으로 하도록 처리하여 시간을 절약함

## 어떻게 적용할 것인가
- 가장 중요하니 신중하게 검토
- Cloud Custodian / https://github.com/cloud-custodian/cloud-custodian
  - 비용: 3
  - 생산성: 1
  - 확장성: 3
- AWS Config - 생각보다 비용 많음. 월에 수천만원 발생
  - 비용: 1
  - 생산성: 2
  - 확장성: 2
    - GCP나 Azure에 적용하는 것은 어려움
- 상용 솔루션
  - 비용: 0
  - 생산성: 3
  - 확장성: 1
    - 기능 개발 요청 시에는 개발사의 응답을 기다려야 하는 아쉬움이 있음
- Cloud Custodian을 최종 선택함

## Cloud Custodian (c7n)
- 이미 검증된, 정책 통합 적용의 훌륭한 그릇
- CNCF 프로젝트
- Github Star 5,000+
- Filter & Action 단순 구조
- 다중 AWS 어카운트 고려
- 다양한 결과 전송 기능

### 정책 적용법
- yaml에 간단하게 Filter, Action
- 태그는 리소스 관리의 근본
  - 가능한 모든 리소스 적용
  - 정책 필터링 판단 기준
  - Slack DM 알람 목적지
- 계정별, 환경별 분리된 설정값
- 배포 스크립트 별도로 만들어서 사용

#### c7n 정책 예시
```yaml
name: eni-unused-delete
resource: eni
mode: cron(0 6 ? * * *)
filters:
  - type: value
    key: Status
    value: available
  - tag:Exception: absent
actions:
  - delete
  - slack://owner
  - slack://#unused-delete
```

### 정책이 구현되지 않은 것들
- 오픈소스이기 때문에 직접 개발해서 바로바로 적용할수도 있음
- 커스텀 기능의 적용
- 생테계 기여도 하고, 더 많은 것들을 차용하고

## 감사 결과가 잘 안보여서 문제
- 간단하게 구성했을 때
  - 느리고 무겁다
  - 번거롭다
  - 자세하게 보고 싶다
  - 한 눈에 보고 싶다
- 어드민을 새로 하나 만들자
  - Ruley

## Cloud Custodian에서 안되는 것들
- Filter, Action이 구현이 안되어 있는 것
- 인스턴스 안에서 확인해야 하는 것들
- k8s 리소스 대상으로 확인해야 하는 것들

## 다른 플랫폼도 통합
- 한 곳에서 볼 수 있게 하자
- AWS - OS 정보 프로토콜 연결 여부
- Kyverno - k8s pod 정보, k8s image 정보

## 현재는
- 조치, 다음 스텝 고민

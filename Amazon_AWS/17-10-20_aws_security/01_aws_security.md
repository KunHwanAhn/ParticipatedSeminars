# Amazon AWS Security
- 이경수, Solutions Arhcitect

> Security is out #1 priority

```
보안은 AWS의 취우선 순위 과제
- 고객층의 증가와 더불어 더 나음 서비스 제공을 위해 보안, 규제/감사, 거버넌스 관련 다양한 업데이트 진행
- 40% 정도가 보안 관련 기능 추가였음
```

## AWS와 고객이 보안에 대한 책임 분담
- Customers are responsible for their security IN the Cloud
- AWS is responsible for the security OF the Cloud
- EC2 보안 관련 문제가 발생해을 경우?
  - 동작중인 EC2 인스턴스: 고객이 직접 대응해야 한다

> 모든 고객은 동일한 AWS 보안 기초위에...

## 네트워크 구성
- DMZ망, 서버/DB망, 관리망 네트워크 분리

### Amazon VPC - 격리된 사설 네트워크
- 최대 B Class까지 제한 가능 ex) 10.1.0.0/16
- 서로 다른 Avaliability Zone(AZ)은 같은 Subnet으로 묶일 수 없다

#### AWS Virtual Private Cloud
- 논리적으로 분리된 일조으이 가상 사설망을 제공
- VPC 상에서 사설 IP대역 선택
- 적절하게 서브넷(Subnet)팅하고 EC2 인스턴스를 배치
- **완전히 독립적인** 가상 네트워크

##### AWS 방화벽
- SSH Bastion을 통해서 Back-end로 접속 가능하게 하는 방식 고려
- Front-end & Back-end 서브넷을 별도로 구성 고려

###### 보안 그룹(Security Group)
- 인스턴스 단위
- Allow Only
- Statefule: Inbound로 들어왔을 경우, Response는 무조건 열어주겠다.

###### Network ACL(NACL)
- 서브넷 단위
- Allow & Deny
- Stateless: Inbonud로 들어왔더라도, 조건에 따라서 Response를 보내주겠다.

## 보안관제
- 방화벽, 침입 탐지, 웹 방화벽, DDoS 대응

### 방화벽
- VPC 구성요소로 대응
  - Security Group
  - Network ACL
  - 단, 구성요소에서 지원하는 룰셋의 갯수(2~300개)를 넘을 경우 3rd Party Soultion 필요

### 침입탐지

> 기존 UTM Gateway는 HA(High Availability)가 고려되어 있지 않았으나, 이젠 지원 가능함

#### UTM Gateway A-S(Active/Stand-by) 유형

#### UTM Gateway A-A(Active/Active) 유형

#### UTM appliance 활용
- 기존 데이터 센터를 Amazon Internet VPN을 사용하여 연동할 수도 있음

#### Hosted IDS

### 웹 방화벽

#### AWS WAF

##### WAF 사용 목적
- Protect from SQL Injection
- Prevention of Web Site Scraping
- DDoS Proections

##### 장점
- 실용적인 보안을 손쉽게 구성
- 유연한 룰셋 구성
- DevOps 시스템과 통합이 용이
- `Pay as you go` 정책

#### WAF 유형
- Pure Play WAF
- CDN WAF
- Load Balancer WAF
- UTM WAF

#### AWS WAF VS Marketplace WAF

##### AWS WAF
- Amazon CloudFront Edge or ALB 사용 전제
- Self-Service, easy deployment, pay as you go

##### Marketplace WAF
- EC2에서 동작
- Managed Service

### DDoS 대응
- DDoS 대응을 위한 AWS Best Pracices
- AWS Shield (DDoS 관제 서비스)

#### DDoS 트랜드
- 인프라 레벨 공격(L3/L4): 7~80%
- 어플리케이션 레벨 공격(L7): 20%

#### 인프라 레벨 공격(L3/L4)
- TCP SYN Flood: SYN 전송 이후, ACK 처리를 하지 않는 방식
  - Connection Table이 차서 정상적인 대응이 불가능하게 됨
  - Network 트래픽으로 인식이 어려움

#### 반사/증폭 공격(L3/L4)
- UDP(DNS) Amplification Flood

#### 어플리케이션 레벨 공격(L7)
- HTTP GET Flood
- POST Flood
- DNS query Flood
- Cache-busting Attack

> 모든 DDoS를 막아주는 솔루션은 없다, 대신 대안이 나올 때까지 버틸 수 있는 상황을 만들어주는 것

#### AWS Shield & AWS Shield Advanced

## 암호화
- 통신 암호화 / 키관리 및 블럭 암호화 / DB 암호화
- Encryption
  - 전송 중 / 저장시 암호화

### AWS KMS(Key Management Service)
- 암호화키를 안전하게 생성/보관/관리해주는 관리형 서비스
- 중앙 집중 암호화 키 관리

### DB 암호화
- Amazon RDS: TDE 사용가능 / MS SQL, ORACLE
- DBMS on EC2: 각 DBMS별 TDE 사용가능, 3rd Party Solution(ex> E'Amo)
- Application단 암호화: AWS KMS + AWS Cryptography(Encryption SDK)

### 통신 암호화(Client-Server, WAS-DB)
- AWS Certificate Manager: AWS 내부에서 HTTPS 통신을 사용하는 경우, 유료 인증서 대신 사용

## 접근통제
- 사용자 접근 제어 / 서버 접근 제어 / DB 접근 제어

### 사용자 접근 제어

#### AWS IAM(Identity and Access Management): 인증, 인가 그리고 인증 연계
- AWS 사용자, 그룹, 그리고 AWS 리소스에 대한 세부 권한을 생성/관리
  - Command Line Interface
  - API/SDK
  - Web Console
  - 세가지 모두에 대해서 제어를 해야 함

##### IAM Policy
- 명료하게 정리된 형태(JSON)의 문서로 IAM Policy를 정의
- IAM Policy 요소
  - Effect: 해당 요청의 결정 - Allow / Deny
  - Action: AWS 각 서비스에 정의된 수행가능한 기능
  - Resource: Action이 수행되는 AWS 리소스 대상
  - Condition: 추가적인 조건 설정
- Root 계정은 Web Console로 모든 것을 제어할 수 있기에 OTP 같은 인증 수단으로 중요하게 관리해야 함

##### IAM Role
- 정의된 권한을 다른 사용자나 서비스로 위임할 수 있음
- IAM Users 또는 AWS Service는 Role에서 정의된 권한 범위 내 AWS API를 사용할 수 있는 임시 권한을 얻음
- Role Usage
  - EC2 Role
  - Federations
- Credential(Access Key 등) 대신 Role을 이용하면 Credential 관련 보안 문제를 쉽게 해결할 수 있음

> AWS Root 계정 사용은 지양하라

##### AWS Organiztions
- Organization
  - AWS 계정들을 중앙에서 제어할 수 있는 통합된 조직
  - 최대 5단계까지 지원
- AWS Account
  - AWS 리소스를 사용하는 Amazon 계정
  - AWS IAM Principals (Users, Roles)
  - AWS Organizations의 최소 구성 요소
- Master Account
  - 해당 Organization 내 모든...`자료 받으면 정리!!`

### 서버 접근 제어(Bastion Host)
- 서블릭 서브넷 내 위치
- 관리용 SSH(또는 RDP) 접속
- 프라이빗 서브넷 내 인스턴스에 접속하기 위핸 경유 서버

### DB 접근 제어
- Proxy 유형

## 감사(Audit)
- AWS CloudTrail: AWS상의 모든 관리작업에 대한 로깅
- AWS Config: AWS 리소스에 대한 인벤토리 관리와 구성정보 변경관리
  - AWS Config Rule: 구성정보가 변경됐을 경우 알림을 받을 수 있는 기능

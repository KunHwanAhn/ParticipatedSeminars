# 구름 위의 IDC, IaaS 알아보기
- 김세준, Azure MVP

## 오늘 우리가 할 것
- 한시간 반동안 Azure와 투닥투닥...
- 정적 웹사이트를 제공하는 것이 목표.

## Azure Pass 적용하기
- [https://www.microsoftazurepass.com](https://www.microsoftazurepass.com)
- MS Accuont 필요

## Azure 기본 기능

## Azure의 데이터 센터
- Region별로 2개씩 있음.
  - 한국은 서울(중부), 부산(남부)
- BCDR, Main & Backup Region

> 하기 모든 내용은 [Github 참고 페이지](https://github.com/krazure/hands-on-lab)에 모두 설명되어 있음

## Resource Group
- 모든 리소스가 생성될 때 필요한 가장 최상위 단위
- 리소스를 Contents로 본다면, 리소스 그룹은 Directory
- 동일한 Life Cycle을 가진 Resource를 하나의 Group으로 묶는 것이 좋음
- 지역과 관계 없이 모든 Resource는 특정 Group에 속함

## Virtual Network
- Overlay Network
- Azure 데이터 센터에 가상의 네트워크를 만들어 네트워크 기반 통신을 가능하게 해준다.
- Azure 지역에 종속되며, 가상의 네트워크이기에 새성에 제한이 없다.
  - 엄밀히 말해서는 있다 20개
- 가상 네트워크는 모두 격리되어 있으며, 연결하기 위해서는 피어링이라는 기술을 써야 한다.

## CIDR (Classless Inter-Domain Routing)
- IP를 표현할 때 사용하는 표기법으로 Subnet Mask와 비슷한 기능
  - Azure는 14비트를 생성하지 못함.

## 저장소 계정

## 가상 컴퓨터
- IaaS의 대표적인 리소스
- Azure에서 Infra단위까지 관리를 해주고 OS 위의 부분은 전부 사용자가 관리해야 한다.

### 가상 컴퓨터 크기
- 일반사항: CPU와 메모리 비율이 적절한 케이스
- 컴퓨팅 최적화: CPU가 메모리에 비해 높은 비율
- 메모리 최적화: 메모리가 CPU에 비해 높은 비율
- 저장소 최적화
- GPU 최적화

### 가용성 집합
- AWS의 Availability Zone과 비슷
- Fault Domain(FD)은 공통 전원 및 네트워크 스위치를 공유하는 논리적인 그룹.
  - 잠재적인 물리적 오류의 영향을 피할 수 있음
- Update Domain(UD)은 동시에 유지 관리를 진행하거나 재뷩이 될 수 있는 노리적인 그룹.
  - 한 번에 하나의 업데이트 도메인만이 재부팅 됨.

### 가상 컴퓨터 SLA

### 네트워크 보안 그룹
- 네트워크 보안 그룹은 Subnet과 NIC에 연결할 수 있다.
- 현재는 TCP와 UDP만 지원되며, ICMP는 지원하지 않음
- 대상은 NSG이 연결된 리소스이며, 소스는 Any, CIDR, Tag로 구분
- Tag는 Internet, 가상 네트워크, 애저 부하분산
- 허용(Allow)와 거부(Deny)를 설정할 수 있고 우선순위가 있다.

### 관리 디스크
- 관리 디스크를 사용하면 Azure에서 디스크를 직접 관리해줍니다.
- 저장소 계정의 종속을 받지 않습니다.
- 스냅샷 또는 가상 컴퓨터 이미지를 만들 수 있습니다.
- 가상 컴퓨터 크기 집합을 사용할 떄 `최대 10,000개의 가상 컴퓨터 개수를 조절`할 수 있습니다.
  - AWS, GCP는 1,000개 제한

## 부하 분산 장치 (Load Balancer)
- L4기반 Load Balancer
- VM의 가용성 집합을 설정하지 않으면 1:1만 가능
- 특정 VM에 Port Forwarding 설정을 할 수 있음
- Source IP 선호도 모드와 해시 기반 배포 모드 설정
- 유휴 제한시간이 있으며, 기본적으로 4분

## CDN (Contents Delivery Network)란?
- 정적 컨텐츠를 미리 POP(에지 서버)에 전달해 두어 사용자가 요청할 시 원본 서버가 아닌 가까운 POP에서 컨텐츠를 가져갈 수 있도록 해주는 서비스

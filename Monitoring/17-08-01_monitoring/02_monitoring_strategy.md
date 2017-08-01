# 스타트업 서비스 단계에 따른 모니터링 전략
- 용영환, 서울옥션블루 CTO

## 시작 (서버 1대)

### Log 수집
콘솔에서 TOP, TAIL 등으로 가볍게 모니터링
- Web server logs
- System logs
- DBMS logs

## 반응이 좀 있네 (서버 2대)
- Web Server 1대 + DBMS 1대
- 비즈니스의 발전 상황을 맞추기 위해서 모니터링보다는 기능을 추가하는데 집중, 모니터링 툴까지는 필요 없다 생각함.

### DBMS
- DBMS는 CPU, I/O 등 다양하게 사용하기 떄문에 최초의 장애를 만나게 해주는 시작점
- 서비스가 느려지는 것으로 확인하게 됨.
- 모니터링 방법: `watch -d -n 5 w`

## 오호라~ 느낌 좋은데
- 서버 3~7대 (Web Server 5대 + DBMS 2대) => Scale OUT
  - DBMS 중 1대는 Replication Backup용
  - 4:1 정도의 비율이 적절했다.

> 점점 늘어나는 Console 창들...

## 로그는 `수집 + 분석`을 위해 쌓는 데이터
- Logstash / Fluentd etc...로그를 모아서 쌓아주는 TOOL에 대한 고려하기 시작...

## 투자도 받았으니..
- 서버 8~20대 (Web Server 16대 + DBMS 4대)
- 더이상 Console 창으로는 버틸 수 없는 상황이 온다 => 모니터링 툴을 도입해야 하는 시점

> TOP의 숫자의 의미는 숫자 / Core => CPU의 활성량

### 모니터링 도구들
- Nagios
- Zabbix
- Icinga 등...

### 보다 전문적인 모니터링 도구들
- 제니퍼
- 와탭 등..
- ~~ELK는 언급 안하나?~~

### 부하의 순서
- DBMS -> Web Server -> I/O -> Network
- DBMS는 서버의 수를 늘린다
- Web Server는 서버의 수를 늘린다
- I/O는 HDD => SSD로 I/O 개선
- Network

> DBMS의 Backup은 HDD에!

### 잘못된 Query, 필요 없는 Loof를 찾아라
- Error Log는 눈에 분명히 들어오지만, Slow Code에 대한 Log는 없다.

> 의외로 모니터링 툴들은 CPU 리소스를 많이 잡아 먹는다. 가볍게 설치한 모니터링 툴이 서비스의 성능저하 및 장애로 이어질 수 있음을 유의하라!

> 모든 서버에 모니터링 툴을 설치하는 곳이 아니라, Web Server 1대, DBMS 1대 설치하고, 추이를 살펴보면 나머지 서버들의 추이도 유추가 가능하다.

# HTTP/3 시대의 웹 최적화 기술 이해햐기
- 강상진, 빈스마트
- 발표자료 - TBD

> HTTP/3 Faster and Securer

# 최적화(Optimization)
- 최고의 성능(Performance)을 만들 수 있는 최적의 조건(Condition)을 갖추는 것

> 한국은 전세계적으로 1, 2위를 다툴 정도로 네트워크 강국. 하지만 이로 인해서 국내 서비스들은 성능 최적화에 대한 고민이 덜 되어 있다고 볼 수 있다.

# 웹 최적화
- 웹 사이트의 로딩 속도를 최대한 빠르게 만드는 기술
- 백엔드 최적화 - DNS 성능, DB 정규화, DB Query 개선, Scale Out/Up etc..
- 프론트엔드 최적화 - gzip compress, image optimization, code splitting, etc..
- **프로토콜 최적화(오늘의 주제..)**

## 백엔드 최적화
- DNS RTT 가속
- DNS 캐싱
- 네트워크 throughout/bandwidth
- 웹 서버/WAS CPU/RAM 증설
- 웹 서버 프록시 서버
- 웹 서버 컨텐츠 캐싱
- CDN(Content Delivery Network)
- 오브젝트 스토리지
- 데이터베이스 정규화
- 데이터베이스 캐싱 - Query 결과 캐싱 / e.g.) Redis, Cloud Cache
- 로드 밸런스 - 단순 헬스체크로 50:50이 아니라, 각 서버별 성능을 측정하여 가용한 리소스가 많은 쪽으로 유동적으로 제어
- 웹 애플리케이션 로직
- etc...

## 프론트엔드 최적화
- 실제 사용자 환경(네트워크, 디바이스, 브라우저, etc)에 알맞은 최적화 / e.g. Android 사용자가 많다면, Android에 집중
- 스크립트 병합(Script combination) - 코드를 분할하여 개발하면 좋지만 실제로 사용자가 사용할 때는 너무나 많은 수의 데이터를 주고 받는 것을 방지하기 위해서
- 스크립트 최소화(Script Minification) - 주석 등 불필요한 내용을 제거함으로써 용량을 제거
- 스크립트 압축 전달(Gzip Encoding)
- 이미지 형힉 최적화(WebP)
- 이미지 손실 압축(compression)
- 브라우저 캐시 사용(cache-control 헤더)
- DNS 조회 최소화(Domain Sharding)
   - 모던 브라우저들은 TCP/IP Connection을 최대 6개까지 가능하기에, 도메인을 분리하여 여러곳에서 병렬적으로 데이터를 가져오는 것
   - 단, DNS Server가 성능이 충분할 때 사용하는 것을 권장함
- DNS 정보 미리 읽어오기(DNS prefetching)
- CSS/JS 위치 조절 (Top/Botton)
- 페이지 미리 읽어오기(Page Prefetching)
- 서드 파티(3rd Party) 스크립트 조정
- etc...

## 프로토콜 최적화
- 좀 더 Web을 빠르게 요청하고, 빠르게 응답할 수 있는 프로토콜
- 프로토콜을 버전을 올린다면(v1.1 -> v2), 10~20% 정도의 성능 개선 효과를 얻을 수 있다.

# HTTP의 역사

## HTTP의 발전
- HTTP0.9 - 1991
- HTTP1.0 - 1995
- HTTP1.1 - 1997
- SPDY - 2012 - 잠깐 사용하다가 보안적 취약점이 발생되어 사장.. HTTP/2에 녹아들었음
- QUIC - 2013
- HTTP/2 - 2015
- HTTP/3 - 2019
- v1.1 -> v2는 18년, v2 -> v3은 4년

## HTTP/2 돌아보기
- Stream 구조, why? -> 멀티플렉싱(Multiplexing)을 지원하기 위해서!

### 멀티플렉싱(Multiplexing)
- HTTP1.0 -> 한 번에 1개씩
- HTTP1.1 -> 파이프라이닝(Pipelining), 응답을 기다리지 않고 먼저 요청 후 순서대로 받는다. / FIFO
- HTTP/2 -> 멀티플렉싱(Multiplexing) / 용량이 적은 것부터 먼저 응답을 받음!

### 헤더 인덱싱과 압축
- 정적 테이블/동적테이블을 사용한 헤더의 인덱싱
- 인덱싱이 완료된 헤더는 허프만(Huffman)알고리즘으로 압축
- Encoder/Decoder를 사용한 헤더의 해석

## 서버 푸시(Server Push)
- 클라이언트가 요청하지 않은 콘텐츠를 서버가 알아서 내려주기
   - HTTP는 기본이지만 `요청 -> 응답`의 순서이지만, HTML 분석 후 요청할 데이터를 미리 전달하는 것!
- 클라이언트 - 서버 간, RTT(Round Trip Time) 절약
- HTML, CSS는 우선순위가 Highest, Image는 Low, JavaScript는 Medium 정도의 우선순위를 가짐.
- CRP(Critical Rendering Path) - ???

## HTTP3의 등장배경
- HTTP의 HOLB(Head Of Line Blocking)은 해결하였으나, TCP의 HOLB문제는 여전히 남아 있다.
- UDP 프로토콜을 사용하는 QUIC을 사용해보는 것은 어떨까?

### QUIC
- 한 번이라도 접속해봤던 페이지라면, 연결을 최소화한다!
- Zero RTT(0 ~ 100ms)

### HTTP/3 프로토콜 스택
- IP -> TCP -> TLS 1.2+ -> HTTP/2
- IP -> UDP -> TLS 1.3 & QUIC -> HTTP/3

### HTTP/3 신뢰성
- UDP를 믿을 수 있는가? -> 신뢰성 레이어 추가
   - 패킷 재전송
   - 혼잡제어
   - 손실 회복
   - 기타 TCP 기능 추가

### HTTP/3 - QPCK
- 인코더를 사용하여 동적 테이블 업데이트, 압축

# HTTP/3
- 아직 HTTP/3는 현재 Chrome Canary에서 지원

## HTTP/3가 풀어야할 숙제는?
- Google, CloudFlare 등 총 3개 회사 정도만 사용하고 있음.
- 기관이나 보안 관련 업체에서는 UDP 포트를 막아놓는 경우가 많아, 이를 풀어야 한다.
- cURL 이외의 HTTP/3를 지원하는 도구들이 늘어나야 함.

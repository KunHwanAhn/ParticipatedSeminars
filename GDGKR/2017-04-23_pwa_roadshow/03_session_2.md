# Securing the Foundation with HTTPS
- 도창욱, SKplanet, GDE for Web

> 위대한 힘에는 큰 책임이 따른다.

## 왜 HTTPS인가?
- 식별성: 누구와 대화하는가?
- 기밀성: 누가 당신의 데이터를 읽어갈 수 있는가?
- 무결성: 누가 당신의 데이터를 수정할 수 있는가?

### But...
- 불필요
- 성능
- 비용
- 유지보수

#### 불필요
- 중간자 공격(Main-in-the-Middle Attacks)
- HTTPS가 필요한 API들
  - Service Workers
  - getUserMedia
  - Push Notifiations
  - App Cache
- `HTTPS는 사용자 경험의 중요한 부분`

#### 성능
- HTTP: GET & Response
- HTTPS: GET & `TLS Handshake` & Response

##### HTTP Strict Transport Security (HSTS)
- 최초 접속 이후, 다시 접속할 경우에는 기존에 접속했던 곳으로 자동으로 옮겨주는 기능

##### TLS False Start

> HTTP/2는 HTTPS의 한계를 제거하고, 주요한 성능을 향상합니다.

#### 비용
- 인증
- 검색 랭킹

##### 인증
- [sslmate.com](https://sslmate.com)
- [Let's encrypt](https://letsencrypt.org)

##### 검색 랭킹
- <link `rel="canonical"` href="https://foo.bar.com">
- 검색 랭킹 가이드 참조

#### 유지보수
- 작년 말에 있었던 회원 대상 조사에서 회원제 광고 송출 시스테 중 거의 80%가 HTTPS를 지원하고 있음을 확인할 수 있었습니다.

##### 3rd Party 의존성: Referrers
- [Referrer-Policy](https://caniuse.com/#search=referrer-policy)





















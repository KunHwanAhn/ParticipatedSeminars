# Progressive Web Apps: What, Why and How
- 도창욱, GDE for Web, SKplanet Android Deveolper

## Ajax로부터의 변화
- Ajax를 통해서 사용자의 행동을 동적으로 반영할 수 있는 웹앱이 가능해짐

## Desktop & Mobile
- Smart phone의 보급으로 인해서 Desktop보다는 Mobile이 많아지고 있음

## Web App VS Native App
- Mobile web(13%) VS Native App(87%)
- 전체 사용자 중 80%는 사용자의 Top3 앱에서 보낸다.
- 평균적인 사용자들이 월별로 설치하는 App의 갯수: 0
- Web은 서비스 범위는 넓지만, 기능이 제한적임.
- Native App은 범위는 좁지만, 다양한 기능을 제공할 수 있음.

## Progressive Web Apps?
- Web App의 앞으로의 방향성
  - 현재는 좁은 서비스 범위, 한정적인 기능 => 넓은 서비스 범위, 다양한 기능.
- 웹 사용자 경험을 근본적인 관점에서 향상하는 것.

### 올바른 사용자 경험(UX)에 필요한 것
- 서비스의 신뢰성
  - Web은 `연결`을 기반으로 하기에 네트워크가 불가능할 경우 할 수 있는 것이 없음.
  - 사용자에게 Offline을 절대 표시하지 않음을 의미함.
- 고성능
  - Native App은 대부분의 리소스를 내부에 갖고 있다.
  - 시간 = 돈, 첫 페이지에 접속하는 시간이 3초 이상이 소요될 경우 사용자들이 이탈하기 시작한다.
  - 100ms가 지날 때마다 사용자가 떠날 확률은 늘어난다. from Amazon
- 인게이징(Engaging)
  - Native App은 Push를 통해서 접근할 수 있지만, Web App은 방법이 없었다.
  - 홈스크린: 홈 스크린에 사용자가 직접 내 웹앱에 접근할 수 있는 방법이 있다면?
  - 몰임: 사용자가 웹앱에 집중해서 볼 수 있도록, 모바일 장비는 화면이 제한적이기에 웹앱은 브라우저에서 실제로 보여줄 수 있는 화면은 작다.
  - 알림: 사용자에게 지속적으로 웹앱의 사용을 유도할 수 있는 수단이 필요하다.
    - 사용자의 허가를 받은 뒤부터 알림을 사용해야...

## Service Workers: 신뢰성 높은 어플리케이션
- 프록시를 자바스크립트를 통해 클라이언트 상에서 지원
  - Cache를 사용할 수도 있음

## Service Workers: Push 서비스의 토대

> Progressive Web Apps are progressive. 사용자 경험이 중요하다.

## 어떻게 시작해야 하는가?

### 안전하게, HTTPS

### PWA-ifying: 3가지 접근 방법
- 바닥부터 시작
- 가벼운 버전으로 시작: e.g. Twitter Light
- 하나의 기능부터 시작

#### 바닥부터 시작
- Konga.com: 첫 로딩에 피룡한 데이터 중 92% 절감
  - 첫 트랜잭션에 필요한 데이터 중 82% 절감
    - Native App과 비교했을 경우, App을 다운로드 받는 시간 등을 모두 포함해서

#### 가벼운 버전으로 시작
- airberlin.com: 초기 로딩 시간 + 추가 로딩 포함 => 1초 미만

#### 하나의 기능부터 시작
- The Weather Company: An IBM Business: 웹 푸시 알림 제공 및 글로벌 출시 시 지원한 언어 60개 이상

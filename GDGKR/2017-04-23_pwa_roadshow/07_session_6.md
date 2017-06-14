# Web Payments API
- 임동우, 방진호, 상성전자

## Motivation
- 결제는 쇼핑몰, PG사에서 알아서 잘 하면 되는데 왜? Payments API가 있는가?
- 쇼핑카드 단계에서 결제를 취소하는 온라인 쇼핑 사용자가 많다.
  - 60% 이상의 사용자, 모바일 단말에서는 그 비율이 더 크다.
  - 왜 물건은 골랐는데 결제는 하지 않을까?
    - 카드번호 등 입력해야 하는 것이 많은데 너무 복잡하다.
- 다양한 결제 앱이 계속해서 생겨나고 있다.
  - 사용자의 편의성을 증대시킬 수 있는 다양한 결제 앱이 생겨나지만, 온라인 쇼핑몰의 결제 페이지에 모든 결제 앱을 다 넣기는 어렵다.
  - in Korea: 네이버 페이, 페이코, 시럽페이 etc...
  - in US: Paypal, Express, Visa-checkout, MasterPass
- 편리한 온라인 결제 방법에 대한 비표준 시도들
  - Google: requestAutocomplete - take my money, not my time
  - Apple: And now an easier way to pay on the web

## How is the WEB PAYMENT API different?
- 기존 UX
  - Long & complicated Forms
  - Long list of payment apps
  - 입력할 내용은 많고, 화면은 작고, Virtual Keyboard가 공간을 차지하고 => 결제가 너무나 어렵다!
- 브라우저에서 결제 UI를 생성한다.
  - 브라우저에서 UI를 생성하여 사용자 입력을 수집, 쇼핑몰(또는 결제앱)로 전달
  - 브라우저에 저장된 신용카드/결제 앱 중에서, 쇼핑몰에서 지원하는 것만 사용자에게 노출

## The PRESENT and FUTURE of WEB PAYMENT API
- 지원 현황
  - 지원: Samsung Internet(모든 신용카드, 삼성 페이), Chrome(모든 신용카드, 안드로이드 페이)
  - 지원 예정: Edge, Firefox, Opera
- 모든 종류의 결제 앱 지원 예정
  - 웹 기반 결제 앱: Payment Handler API spec (Service Worker based, W3C Standard)
  - 네이티브 기반 결제 앱: de-facto standard among browsers (Suggested)

## Payment Request API
- 기존 결제방식에서 벗아나, 브라우저에서 제공하는 결제 방식

### How To Use PaymentRequest
``` Javascript
var methodData = [
  'basic-card', 'samsungpay'
]; // 결제 방식(예: 신용카드, 모바일결제)
var details = {
  total: {
    ...
  }
};
var options = [...];    // 사용자로부터 수집할 정보(예: 배송주소)

var paymentRequest = new PaymentRequest(methodData, details, options);
```

### Before PaymentRequest
- Manual
- Tedious
- Slow
- N-Taps

### After PaymentRequest
- Automatic
- Simple
- Fast
- 1-Tap

### Process PaymentRequest
- Site calls PaymentRequest
- Browser UI: Collect payment
- Browser passes Response to site
- Site process payment

### How to Support THIRD-PARTY Payment App
- Browser Integration
- Browser Plugin
- Defacto Standard
- `Payment Handler`

## Payment Handler API

### Advantages of THIS APPROACH
- Web App Based(`Service Worker` based)
- Installation Time: < 1sec
- Cross Browser/Platform
- Open Ecosystem

### Why ServicWorker?
- 예를 들어서, naver.com에서 결제를 할 때 삼성페이와 연동하려고 하는 상황일 때 서로 연결할 수 있는 매개체가 필요했음.

### 참고 페이지
- [paytest.github.io](http://paytest.github.io/)

> PaymentRequest는 새로운 결제 도구가 아니다.























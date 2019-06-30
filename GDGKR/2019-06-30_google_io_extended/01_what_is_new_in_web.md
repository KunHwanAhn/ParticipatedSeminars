# What's new in Web
- 장한보람
- 발표자료 - TBD

> Google I/O에서 있었던 Update 내용 정리 / 23 Session * 30 = 690min

```
Building a more helpful for everyone
```

# New in Chrome & Web
- Instant - 신속성: 더 빠른 사용자 경험을 위해
- Poqwerful - 확장성
- Safe - 안정성: Privacy Security

## Instant - 신속성
- V8 Engine 개선

### 모던 웹의 문제점
- 로드할 컨텐츠가 많아서, 초기 렌덩링할 때 느리다.

### 해결법
- image-lazy-loading

#### image-lazy-loading
- Chrome Canary에서 가능한 기능임
```HTML
<image src="fooBar" loading="lazy" ></image>
```

### Portal
- iframe 관련한 기능 개선(?)

### Lighthouse
- Perfomance Beget
- `budget.json`
- http://www.performancebudget.io/

## Poqwerful - 확장성

### Web Perception Toolkit
- Sensing
- Meaning
- Rendering

### Sharing API
- 다른 앱으로 공유하는 기능인 것 같은데...

### Duplex on the web
- Web + Google Assistant
- Google I/O Keynote 25:00
- 올 해 하반기 출시 예정인 Pixel에서는 사용가능

## Safe - 안정성
- HTTPS
- Privacy 제어를 더 쉽게
- Same site Cookie: `sameSite: strict`
- Fingerprinting Protection

### HTTPS

### Privacy 제어를 더 쉽게
- 투명성
- 선택
- 제어

### Same site Cookie
- Firefox도 2018년 4월 부터 해왔음...?

### Fingerprinting Protection

# Web의 한계점
- App Gap: Web VS Native App
  - File System Access
  - Contact Access

## Project Puffer

## Badge API

## Progressive Web & Flutter
- 다양한 장치와 화면의 크기를 지원하기 위하여..

# Service Workers for Instant and Offline Experiences
- 송정기, 삼성전자

## Service Worker?
- 왜 사용해야 하는가? 빠르고 안정적인 웹

## Progressive `Web App`
- 브라우저를 벗어나서 네이티브처럼 하지만, Web App의 정체성을 잃지 않도록
- Web site와 Native App의 적절한, 절묘한 조화
- [pwa.rocks](https://pwa.rocks/)
- [Google Codelab](https://codelabs.developers.google.com/codelabs/your-first-pwapp)

## Mobile Website의 장단점

### 장점
- URL
- 빠른 배포
- 표준기반으로 다양한 / 폭 넓은 기기 지원

### 단점
- Native에 비해 떨어지는 UX ==> `Manifest + Service Worker + Push`으로 개선
- 성능
- 기능들

## In the wild
- 워싱턴 포스트
- Flipkart
- Selio
- Podle for Podcasts
- Wego
- Twitter Light

### Flipkart
- [Link](https://www.flipkart.com/)
- 3X 더 많은 시간을 보내는 사용자들
- 40% 사용자의 재 방문률 증가
- 70% Home Screen에 추가함으로써, 더 많은 사용자의 접근
- 3X 더 적은 데이터 사용량

### 워싱턴 포스트
- [Link](https://www.washingtonpost.com/)
- 5X 방문 당 페이지 뷰 증가

### Selio
- 10X 사용자를 끌어들이는데 사용한 비용이 10배 정도 더 저렴함

### Podle for Podcasts
- [Link](https://podle.audio)
- 삼성에서 만든 팟케스트용 App

### Wego
- [Link](https://www.wego.com/)

### Twitter Light

## Service Worker
- Web App을 위한 Background Service
- Offline에서도 동작하는 Web App
- Push

## Is Service Worker Ready?
- Chrome
- Firefox
- Opera
- Samsung Internet
- Safari: 현재 문제가 있어서 잠시 내려놓은 상태
- Edge

## Progressive enhancement 그대로
``` JavaScript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('foo.js', { scope: './' });
}
```

## Event-based Worker
- 페이지가 요청이 있을 때만 실행하고, 이벤트 처리가 끝나면 Service Worker는 실행을 중단함

## Service Worker 활용을 위한 주요 개념
- Install: Register - Update - Unregister
- Client Matching - Navigation 포함 메인 리소스 fetch 시 Service worker 결정
- Functional event handling
  - fetch, push, notificationclick, sync, etc
- Caching
  - Pre-cache - oninstall 이벤트 처리
  - Dynamic-cache - onfetch에서 활용
- Serve on `HTTPS`
- Fetch API와 Streams API를 주목

## Register

### Service worker lifecycle
``` JavaScript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('foo.js', { scope: './' });
}
```

- installing
- waiting
  - Wait until
    - No Client uses active worker
- active
- update
- unregister

## Client matching

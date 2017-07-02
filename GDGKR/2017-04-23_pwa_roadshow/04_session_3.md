# Deep Engagement: Installable apps and Push Notifications
- 박상현, 삼성전자

## Web App Manifest

### Deploying the manifest
- json 형태의 manifest
- link Tag로 추가해주면 됨.
  - <link rel="manifest" href="foo.json">
``` json
{
  "name": "simple web app demo",
  "short_name": "Demo",
  "icons": [
    {
      "src": "bla.png"
      "sizes": "96x96"
    }
  ],
  "theme_color": "color_code",
  "background_color": "color_code",
  "display": "standalone",
  "orientation": "prtrait",
  "start_url": "/simple-demo/?home=true"
}
```

### Debug
- Chrome 개발자 도구 Application Tab

## Push API
- Service worker로 인해서 Push가 가능해졌다.

## 필수 요소
- Background Service => Service Worker
- Push 등록 / 해지 => Push API
- Notification UI => Web Notification API

## Flow
- App Server에서 Push 기능 알림
- 사용자가 Push 등록 요청, 브라우저에서 Message Server(GCM etc)에 등록
- 사용자 브라우저에서 등록 결과를 App Server에 알림
- Message Server에서 사용자에게 Push 전송

## Define GCM Sender ID in Manifest.json
``` json
{
  "name": "simple web app demo",
  "short_name": "Demo",
  "orientation": "prtrait",
  "start_url": "/simple-demo/?home=true",
  ...

  "gcm_sender_id": "xxxxxxxxxxxxxx" <= 보안 이슈, 내 API Key가 노출된다니!
}
```

## Handle Push
- self.addEventListener('push', event => { ... });

## Notification Action
- self.addEventListener('notificationclick', event => { ... });
- self.addEventListener('notificationclose', event => { ... });

## VAPID
- `gcm_sender_id`에 대한 보안 정책으로 나옴

## Demo
- [Push Codelab](https://web-push-codelab.appspot.com/)

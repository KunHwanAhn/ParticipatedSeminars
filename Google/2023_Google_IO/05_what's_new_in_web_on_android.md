# What's new in Web on Android - updates to WebView, Custom Tabs, and more
- Adriana Jara & Sebastian Benz
- [Youtube](https://youtu.be/sLn3wszcnGU)

## WebView
- 웹 콘텐츠를 Android 앱에 삽입하는 데 가장 많이 사용하는 방법
- 웹 UI와 기본 Andriod 앱 경험을 원활하게 통합할 수 있는 좋은 방법

### Privacy
- 개인 정보 보호

#### Deprecation
- X-Requested-With=<APK NAME>
- 모든 요청에는 사용자가 웹 콘텐츠를 소비하고 앱의 ID를 온라인 서비스에 유출하는 컨텍스트에 대한 특정 정보가 포함됨
- 앱이 X-Requested-With 헤더에 의존한다면? => 헤더를 특정 출처로 선택적으로 보낼 수 있는 새로운 Opt-In API를 사용하는 것
```Java
WebSettingCompat.setRequestedWithHeaderOriginalAllowList(
  demoWebview.getSettings(), Collections.signleton("https://example.com")
);
```

### Test

#### Origin Trials
- [Chrome Origin Trials](https://developer.chrome.com/docs/web-platform/origin-trials)
- Chrome Mobile v110 이후부터는 WebView에서도 사용 가능

#### WebView Beta
- 앞으로 나올 WebView에서 동작을 검증하기 위한 방법
- [WebView Beta](https://play.google.com/apps/testing/com.google.android.webview)

### Drag'n Drop
- Drop images and text from WebViews
- DropDataProvider 활성화만 하면 끝!
```xml
<application>
  <!-- ... -->
  <provider
    android:authorities="com.example.webviewdemo.DropDataProvider"
    android:name="androidx.webkit.DropDataContentProvier"
    android:exproted="false"
    android:grantUriPermissions="true" />
</application>
```

### Stylus support
- Stylus Handwriting for HTML text input fields in Chrome & Webview

### JavaScript
- 웹과 모바일 앱에서 비즈니스 로직을 공유하는 경우, 웹뷰를 띄우지 않고 자체 엔진으로 JavaScript를 실행할 수 있다
- Jetpack JavaScript Engine
   - Evaluate JavaScript and WASM code without creating a WebView instance
```
dependencies {
  implementation "androidx.javascriptengine:javascriptengine:1.0.0-alpha04"
}
```
```Java
ListenableFature<JavaScriptSandbox> jsSandboxFuture = JavaScriptSandbox.createConnectedInstanceAsync(JavaScriptEngineActivity.this);
JavaScriptIsolte jsIsolte = jsSandboxFuture.get().createIsolate();
final String code = "function sum(a, b) { let r = a + b; return r.toString() }; sum(3, 4)";
ListenableFature<String> resultFuture = jsIsolte.evaluateJavaScriptAsync(code);
```

### Custom Tabs
- 앱에서 직접 웹 콘텐츠를 탐색할 수 있도록 한다면? 사용자 정의탭의 훌륭한 사용 사례
- 사용자가 앱에서 웹 콘텐츠를 볼 수 있는 안전하고 사용자 친화적인 방법
- 사용자가 즐겨 찾는 웹사이트에서 재로그인을 할 필요 앖음. 사용자의 기본 브라우저 인스턴스와 쿠키를 공유하기 떄문

### Partial Custom Tabs
- Specity the launch height of the partial Custom Tab to have a partial or full experience
```Java
CustomTabsSession customTabsSession;

// ...

CustomTabIntent customTabIntent = new CustomTabIntent.Builder(customTabsSession)
  .setInitialActivityHeightPx(500)
  .setCloseButtonPostion(CustomTabsIntent.CLOSE_BUTTON_POSTION_END)
  // ...
  build();

customTabIntent.launchUrl(context, Uri.parse(url))
```

### Slide-Sheet
- Slidebyside Cutom Tabs
- Custom Tabs for landscape mode and large screen devices
- 2023 Q3 오픈 예정

### Engagement Signals
- Session specific engagement
- Scroll direction
- Greatest scroll percentage increated
- Session start / end

## PWA
- [Learn PWA](https://web.dev/learn/pwa)
- Tools to build app-like experiences on the web
- Works cross platform
- Based on web standards
- Installable on Android along other platforms app

### Default offline experience
- [Basic offline page for web apps on Chrome Android](https://developer.chrome.com/blog/default-offline)

### Richer Install UI
- Web Manifest
```JSON
{
  "name": "Rowsie",
  "start_url": "/",
  // 생략 ...
  // PWA 설치 시 보여줄 스크린샷
  "screenshots": [
    { "src": "screen-counter.png", "sizes": "320x640", "type": "iamge/png" },
    { "src": "screen-projects.png", "sizes": "320x640", "type": "iamge/png" }
  ],
  // PWA 설치 시 보여줄 설명
  "description": "Rowsie is your perfect knitting companion",
  // 사용자가 앱에서 자주 수행하는 빠른 작업 목록
  "shortcuts": []
}
```

### Share from your app
- [Integrate with the OS sharing UI with the Web Share API](https://web.dev/web-share)
```JavaScript
if (navigator.share) {
  navigator.share({
    title: 'web.dev',
    text: 'Check out web.dev.',
    url: 'https://web.dev/',
  })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
}
```

## TWA(Trusted Web Activity)
- [Integration Guide](https://developer.chrome.com/docs/android/trusted-web-activity/integration-guide)
- Web fullscreen, Paly Store discoverability and more
- Bring your entire web app to the paly store
- Use the web full screen as part of your Android app

### Fullscreen first party content
- URL 표시줄이 표시되지 않는다는 점을 제외하면 사용자가 브라우저에서 보는 것과 똑같은 방식으로 사용자의 브라우저에서 렌더링된다
- 즉, 브라우저에서 지원하는 모든 기능과 API 사용 가능

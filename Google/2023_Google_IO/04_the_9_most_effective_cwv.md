# The 9 most effective Core Web Vitals opportunities of 2023
- Barry Pollard
- [Youtube](https://youtu.be/mdB-J6BRReo)

[Our top Core Web Vitals recommendations for 2023](https://web.dev/top-cwv-2023)

## Largest Contentful Paint recommendations
- CLS 또는 FID 대비 통과하는 사이트가 적기 때문에 대부분의 사이트에서 어려움을 겪는 경향이 있음

### Ensure the LCP resource is discoverable from the HTML source
- 브라우저의 프리로드 스캐너가 찾아서 로드하는 데 도움이 된다
#### 좋지 않은 케이스
```HTML
<!-- Background images are not discoverable -->
<div style="background-image: url(image-url.jpg)">

<!-- img srcs which are loaded using JavaScript are not discoverable -->
<img data-src="image-url.jpg" alg="...">
<img ng-src="{{ imageUrl }}" alg="...">

<!-- Lazy loaded <img> element are ignored by the preload scanner -->
<img src="image-url.jpg" alt="..." loading="lazy">
```
#### 해결책
```HTML
<!-- An <img> element is easily discoverable -->
<img src="image-url.jpg" alt="...">

<!-- Alternatively, preloading the image makes it discoverable -->
<link rel="preload" href="image-url.jpg" as="image">
```
### Ensure the LCP resource is prioritized
- 브라우저는 일반적으로 이미지보다 CSS, JavaScript와 같이 렌더링 차단 콘텐츠를 우선시하는 경향이 있다
- New `fetchpriority` API
```HTML
<!-- Add fetchpriority to import image elemetns -->
<img src="image-url.jpg" alt="..." fetchpriority="high">

<!-- The fetchpriority attribute can also be used on preloads -->
<link rel="preload" href="image-url.jpg" as="image" fetchpriority="high">

<!-- Use fetchpriority="low" for lower priority images that the -->
<!-- browser may otherwise consider in, or near, the viewport -->
<ul class="carousel">
  <img src="image/carousel-1.jpg" fetchpriority="high">
  <img src="image/carousel-2.jpg" fetchpriority="low">
  <img src="image/carousel-3.jpg" fetchpriority="low">
  <img src="image/carousel-4.jpg" fetchpriority="low">
</ul>
```

#### Framework image components
- Nuxt - <nuex-img>
- Next.js - next/image
- Angular - NgOptimizedImage

#### Performance Lab Plugin for WordPress
- Fetchpriority 설정 - Enable Fetchpriority

### Use a CDN to optimize document and resource TTFB(Time To First Byte)
- 브라우저는 초기 HTML 문서 응답의 첫번째 바이트를 수신할 때까지 하위 리소스 로드를 시작할 수 없다
- TTFB를 줄이는 가장 좋은 방법
   - 지리적으로 사용자에게 최대한 가깝게 콘텐츠를 제공하여 사용자와 서버 간의 거리를 줄이는 것
   - 최근 요청한 콘텐츠가 빠르게 다시 제공될 수 있또록 해당 콘텐츠를 캐시하는 것

## Cumulative Layout Shift recommendations
- 2020년 이후의 대부분의 사이트에서 CLS는 개선되었지만, 여전히 1/4은 권장 임계값을 충족하지 못한다

### Set explicit sizes on any content loaded from the page
- 명시적인 높이를 사용해라
- min-height 설정을 쓰는 것도 고려해라
```HTML
<!-- An image without dimensions will cause CLS -->
<img src="image-url.jpg" alt="...">

<!-- Explicitly setting width and height -->
<img src="image-url.jpg" alt="..." width="400" height="200">
```

```CSS
/* Example: deafult vidoes to 16 / 9 aspect ratio */
video {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
}
```

### Ensure pages are eligible for the bfcache(back-forward cache)
- Safari, Firefox는 항동안 이 기능이 있엇다
- 이미지와 광고와 같은 추가 콘텐츠가 로드되면서 초기 로드 시 많은 CLS가 있을 수 있다
- bfcache는 사용자가 다른 곳으로 이동한 후 잠시 동안 완전히 렌더링한 페이지의 전체 스냅샷을 메모리에 저장한다
- 페이지로 돌아가면 스냅샷이 복원된다
- bfcache는 기본적으로 활성화되어 있다
- Use Chrome DevTools to test pages with bfcache
- bfcache가 동작하지 않는 이유
   - bfcache 사용을 차단하는 `cache-control: no-store`
   - unload 핸들러
- NotRestoredReasons API
- Prefetch and prerender can also improve Core Web Vitals

### Avoid animations/transitions that use layout-inducing CSS properties
- CLS를 발생 시킬 수 있는 요소들
   - 쿠키 배너
   - 상단이나 하단에서 나오는 슬라이딩 알림배너
   - 절대 위치 지정 요소
```CSS
.box {
  position: absolute;
  top: 10px;
  left: 10px;
  animation: move 3s ease;
}

@keyframes move {
  /* Do not animation top, left, bottom, or right */
  0% { top: calc(90vh - 160px); }

  /* Instead use transform to move with translate */
  0% { transform: translateY(cacl(90vh - 160px)) }
}
```

#### Animations handled by compoistor
- Position: tranform: translate(`n`px, `n`px);
- Scale: tranform: sacle(`n`);
- Rotation: tranform: rotate(`n`deg);
- Skew: tranform: Skew(X|Y) (`n`deg);
- Matrix: tranform: maxtrix(3d) (...);
- Opacity: opacity: 0...1;

## First Input Delay / Interaction to Next Paint recommendations

### Avoid or break up long tasks
- 50ms 이상 걸리는 작업을 Long Task로 식별한다
- JavaScript는 기본적으로 싱글 스레드이고 탐욕적이다 => 작업이 중단될 때까지 가능한 한 오랫동안 CPU를 점유하려 한다
```JavaScript
// AS-IS
function saveSettings() {
  validateForm();
  showSpinner();
  saveToDatabase();
  updateUI();
  sendAnalytics();
}

// TO-BE
function saveSettings() {
  // Do critical work that is user-visible;
  validateForm();
  showSpinner();
  saveToDatabase();

  // Defer work that isn't user-visible to a separate task
  setTimeout(() => {
    updateUI();
    sendAnalytics();
  }, 0);
}
```

#### New APIs to control task scheduling
- isInputPending()
- scheduler.postTask()
- scheduler.yield()
- [Optimize Long Tasks](https://web.dev/optimize-long-tasks)

### Avoid unnecessary JavaScript
- See the code coverage in Chrome DevTools
- Next.js Script component
```jsx
// Example for beforeInteractive
<Script src="https://example.com/samplescript.js" strategy="beforeInteractive"/>

// Example for afterInteractive (default)
<Script src="https://example.com/samplescript.js"/>

// Example for lazyonload
<Script src="https://example.com/samplescript.js" strategy="lazyOnload"/>
```
- [Best practices for tags and tag managers](https://web.dev/tag-best-practices)

### Avoid large rendering updates
- DOM 사이즈를 최대한 작게 유지하라
- Lighthouse audit to check for large DOM sizes
```CSS
/* The contain CSS container property lets developers limit */
/* the scope of the browser's styles, layout and paint work */
/* https://developer.mozilla.org/ko/docs/Web/CSS/contain */
contain: none; /* strict, content, size, inline-size, layout, style, paint */

/* The contain-visibility CSS contain property allows */
/* Chromium-based browsers to skip layout and rendering */
/* completely */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility */
content-visibility: visible; /* hidden, auto */
```
- Only use requestAnimationFrame for critical visual updates
```JavaScript
// Use requestAnimationFrame callback for
// critical rendering updates
function updaetScreen(time) {
  // Make visual updates here
}
requestAnimationFrame(updaetScreen);

// Do not use requestAnimationFrame callback for
// process-intensive updates
function complexCalculations(time) {
  // Do non-visual updates here
}
requestAnimationFrame(complexCalculations);
```

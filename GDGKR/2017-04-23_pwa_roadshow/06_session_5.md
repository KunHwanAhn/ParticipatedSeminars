# AMP for Progressive Web Apps
- 조은, GDG Korea WebTech

> 53%의 사용자는 3초 이상이 걸리면 떠나간다.

## AMP(Accelerated Mobile Page)
> Start fast, Stay fast

### AMP가 제거하는 것들
- 느린 로딩
- 비반응형 컨텐츠
- 컨텐트 쉬프팅

## AMP 요소
- AMP HTML
- AMP JS
- AMP Cache

### AMP HTML
- Style을 내부에 인라인으로 작어야하므로 50Kb 미만으로 작성해야 함
- Javascript 미지원
``` html
<!DOCTYPE html>
<html AMP>
<head>
  <link rel="canonical" href="hello-world.html">
  ...
  <style amp-boilerplate>...</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
  <div>Hello World!</div>
  <amp-img></amp-img>
</body>
</html>
```

### AMP JS
- Prioritized content loading: 사용자가 바라보는 것만 우선적으로 로딩

### AMP Cache
- 일반 적인 Cache서버이지만, AMP를 위한 것.
- pre-rendering

## AMP에 PWA 적용하기
- <amp-install-serviceworker> Tag 사용
- AMP as PWA
- AMP to PWA
- AMP in PWA

### AMP as PWA
- [AMP by Example](https://ampbyexample.com/)

### AMP to PWA
- Contents 사이트는 AMP로, 하지만 자세한 정보를 보려면 PWA로 이루어진 페이지로 이동
  - [Wego](https://www.wego.com/)

### AMP in PWA
- 단일 AMP 페이지에서 AMP와 PWA를 함께 제공하는 것: <iframe>, but It's slow
  - Without Shadow DOM: 1 window, N AMP Library, N Document
  - Shoadow DOME: 1 window, 1 AMP Library, N Document
    - [Example](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)

## Resources
- [AMP Project](https://www.ampproject.org/)








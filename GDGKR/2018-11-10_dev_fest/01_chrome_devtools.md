# Chrome Devtools를 활용한 성능 측정과 개선
- 한재엽, Line

> 성능이란? UX다.

> If you can't measure it, you can't manage it - 피터 드러커

# RAIL
- Response
- Animaition
- Idle
- Load

# Audits tab, Lighthouse
- Performance
- Accessibility
- Best Practice
- SEO

# Performance

# Accessibility

# Best Practice
- Suggest the JavaScript anti-pattern

# SEO
- Check the Server side rendering

# 성능개선 방법
- Request 갯수 줄이기
- Resource 사이즈 줄이기

## Request 갯수 줄이기
- Merge JS, CSS
- `Lazy Loading`

## Resource 사이즈 줄이기
- With Webpack
  - minify
    - DCE
  - Obfuscation
  - Tree-shaking
  - Cdoe-splitting: 나중에 PWA 관련 발표자료 올라오면, 확인(?)
- `이미지 최적화`

## Rendering 시간 단축
- CRP(Critical Rendering Path) 최적화
  - Script tag with async/defer Keword
- Reflow 최소화
- `부드러운 애니메이션`

# Intersection Observer
- [명세 Link](https://www.w3.org/TR/intersection-observer/)
- [전반적인 설명](http://bit.ly/2z4aV3i)
- Formatting Structure

# Lazy Initialize
- Custom Image Element

# 이미지 최적화
- Data URI scheme, `data:`

## 언제 적용하면 좋을까?
- 캐싱할 필요가 없는 데이터
  - 별도 파일이 아니므로 Caching이 안 된다.
- 작은 용량의 이미지 파일
  - 무채색 파일

## srcset attribute
- Device의 Pixel Ratio 크기에 맞는 이미지 사용

## Remove useless meatadata
- 불필요한 메타데이터를 삭제함으로써 이미지의 용량이 줄어든다.

# 부드러운 애니메이션
- 하드웨어 가속
- 스크롤 이벤트 튜닝

## 하드웨어 가속
- CPU보다 GPU가 잘하는 일을 GPU에게 위임하는 것
- Chrome Devtools - [Layers] tab
- Layout을 3D로도 확인이 가능함

## Scroll Event
- requestAnimationFrame
  - 초당 60회 Rendering 브라우저에 적합
  - Task Queue, Microtask Queue / [참조](http://sculove.github.io/blog/2018/01/18/javascriptflow/)

``` JavaScript
function onScroll() {
  let scheduledAnimationFrame = false;
  let lastScrollY = window.scrollY;

  if (scheduledAnimationFrame) {
    return;
  }

  scheduledAnimationFrame = true;
  requestAnimationFrame(function() {
    console.log(`scroll: ${lastScrollY}`);
    // Do something
    scheduledAnimationFrame = false;
  });
}

document.addEventListener('scroll', onScroll, { passive: true });
// { passive: true }: preventDefault를 호출하지 않을 것임
```
### addEventListener의 3rd 옵션 부가 설명

``` JavaScript
document.addEventListener('scroll', function () { ... }, {
  capture: false, // bubbling vs capturing
  once: false,  // event fire only once
  passive: false, // not prevent event by preventDefault

});
```

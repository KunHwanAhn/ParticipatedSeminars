# The main thread is a bad place to run your code
- 도창욱 / Riot Games
- [발표자료](https://speakerdeck.com/cwdoh/web-worker-101-the-main-thread-is-a-bad-place-to-run-your-code)

> Chrome Dev Summit 2019 Review - Main Thread: Overworked & underpaid
> https://www.youtube.com/watch?v=7Rrv9qFMWNM

# Thread? Main Thread?
- Thread는 어떠한 프로그램 내에서, 특히 프로세스 내에서 실행되는 흐름의 단위
- App 시작 시, 렌더링, 이벤트 등을 처리하는 기본적인 스레드 생성 = **"Main Thread"**

> Main Thread === UI Thread // ture

# 무엇이 문제일까?

## JavaScript는 Single Thread이다?
- 정확히는 Single-threaded **event loop**
- https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf

## **"브라우저의 렌더링"**에 대해 알아보고 갑시다.
- [프론트엔드 개발자를 위한 크롬 렌더링 성능 인자 이해하기](https://medium.com/@cwdoh/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%81%AC%EB%A1%AC-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%84%B1%EB%8A%A5-%EC%9D%B8%EC%9E%90-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-4c9e4d715638)
- [Web Fundamentals - Rendering Performance](https://developers.google.com/web/fundamentals/performance/rendering)

> Chrome 브라우저는 60FPS의 렌더링 성능을 추가합니다. Framerate가 올라갈수록 사용자는 부드러움을 느낀다.

- 1Frame / 16ms & [requestAnimationFrame()](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)
- 자바스크립트는 분명히 렌더링 성능에 영향을 줍니다.

> 아무리 최적화 한다한들, 우리에겐 다양한 Device가 있다...

# JavaScript의 실행은 UI Thread에서 동작한다.
- 가장 좋은 방법은? 최적화? 기능이라 우긴다? => 백그라운드 실행
- [Web Workers](https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API)

## WC3에서 말하는 Web Worker
- 메인페이지와 **병렬로 스크립트를 실행하는 백그라운드 워커**를 생성하는 API
- **메시지 전송 기반**으로 Thread와 유사한 동작을 가능하게 한다.

## Wokrer: Thumb of Rules
- UI스레드에서 분릳뢰어 실행되어야 한다.
- DOM에 대한 직접 접근/조작 불가
- 자체적인 글로벌 스코프
- 일부 속성과 API만 허가

## 3 Types of Worker
- Service Worker
- Shared Worker
- Dedicated Worker

### Service Worker
- https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API
- 브라우저에 설치되는 일종의 시스템 요소 기능
- 페이지/브라우저가 실행 중이지 않더라도 브라우저에 의해 라이프사이클 제어
- 외부 요소 제어를 위한 이벤트 모델
- 원격 푸시 알림이나 백그라운드 동기화의 최초 진입점으로 적합
- 런타임에 생성되는 것이 아니라 설치/해제

### Shared Worker
- https://developer.mozilla.org/ko/docs/Web/API/SharedWorker
- 다수의 브라우징 컨텍스트에서 접근할 수 있는 워커
- 윈도우, iframe, 워커와 같은 다수의 브라우징 컨텍스트에서 접근할 수 있는 특정한 종류의 워커
- 런타임에 코드에서 직접 워커 인스턴스 생성
- 동일한 Origin을 가지는 컨텍스트에서 접근 가능
- SharedWorkerGlobalScope라고 하는 별도의 글로벌 스코프를 가진다

#### 사용 예시
- 로그인 기능이 있는 페이지가 있을 때, 사용자가 다양한 탭을 동시에 띄워놓고 있는 상태로 사용하는 상황에서, SharedWorker의 상태를 변경하면 동시에 모두 로그아웃을 가능하게 할 수 있다.

### Dedicated Worker
- 단일 브라우징 컨텍스트에서 접근할 수 있는 워커

#### 사용 예시
- 아주 오래 걸리는 디코딩 작업이 있을 때, 이 작업을 메인 스레드에서 작업하다면, 웹 페이지는 디코딩 작업동안 화면도 멈춰있고 아무런 동작을 하지 않는다.
- 이런 작업을 Worker에서 실행하면 좋다!

##### decoder.js
```JavaScript
self.addEventListener('message', e => {
  // Decode...
  self.postMessage(decodedResult)
})
```

##### main.js
```JavaScript
fetch('my-encrypted-doc.txt').then(function(res) {
  // spawn worker
  const worker = new Worker('decoder.js')
  worker.onmessage = function(e) {
    console.log(`Decoded ${e.data}`)
  }
  // decode blob data with worker
  worker.postMessage([res.clone().blob()])
})
```

# ComLink
- https://github.com/GoogleChromeLabs/comlink
- 메인 스레드와 워커 사이에서 객체나 값 등을 공유할 수 있도록 인터페이스르 제공합니다.
- 하지만, 액세스는 메시지에 의해 이루어지므로, 비동기임을 주의!!

# 결론
- JavaScript의 성능 이슈는 JavaScript만의 문제는 아니다.
- UI와 관련이 없지만, 부하가 큰 기능을 구현해야 한다면, Worker를 고민할만 합니다.
- ComLink 사용하세요!

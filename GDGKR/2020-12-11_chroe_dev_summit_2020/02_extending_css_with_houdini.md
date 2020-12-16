# Extending CSS with Houdini
- Una Kravets / Developer Advocate
- [Youtube](https://youtu.be/5eBar5TI71M)
- https://houdini.how/about

## What is Houdini
- 브라우저는 DOM Tree를 만들고 CSSOM을 만든 뒤, 둘을 병합하여 렌더트리를 만들고, 배치(layout)하고 그리는(repaint) 과정을 거쳐서 렌더링한다.
- Worklet 기반에서 Semeantic CSS를 가능하게 만드는 것
- CSS Paints API를 활용하여 만들었으며, Blink 엔진(Chrome, Edge, Opera, Samsung Internet), Webkit 엔진(Safari)은 지원하고 있으며, Gecko(Firfox)는 현재 논의 중인 상태
- 하지만, Polyfill 라이브러리를 만들어서 모든 모던 브라우저에서 동작할 수 있도록 만들어두었음

## CSS Painting API
- CSS를 Background, Borders, Masks 등에 개발자가 직접 캔버스에 그리는 것처럼 Painting Function을 정의할 수 있게 해주는 API

## References
- [MDN - Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini)
- [medium - Worklet](https://medium.com/@jihyerish/worklet-5a193167606f)
- [Houdini: Demystifying CSS](https://developers.google.com/web/updates/2016/05/houdini)

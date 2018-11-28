# Chromium/Blink는 어떻게 동작하는가?
- 방진호, 삼성전자

## Chromium
- 소스코드만 13GB
- IMAC 5K 기준 빌드 3시간...

## Chrominum/Blink 내부를 알아서 뭐하나?
- 브라우저 및 웹 플랫폼 개발에 참여
- 웹 표준 개발에 참여
- 프론트엔드 개발시 성능 향상
- 이 밖에도 다양한 소프트웨어 개발 분야에 활용

## Multi-process Architecture

### Process VS Thread
- Process는 `메모리 공간이 독립적`이고, Thread는 `메모리 공간을 공유`한다.

### Why?
- Crash가 발생해도 죽지 않는다.
- Site Isolation (OOPIF)

### Browser Process & Renderer Process
- Renderer는 `웹 컨텐츠`를 담당하고,
- Browser는 `외부와 소통(예: 시스템 콜)`을 한다.

## Blink Rendering
- Rendering Engine: Blink
- Javascript Engine: V8
- Graphics Library: SKIA

### Process
- Parsing
- Style: CSS Parsing
- Layout
- Layerization
- Paint

### Parsing
- DOM(Document Object Model)

``` HTML
<div>
  <p>Hello, </p>
  <p>World</p>
</div>
```

### Style
- CSS Parser
- StyleSheetContents

``` HTML
<link>
<style>
<p style="color:red;">
```

- CSS Parsing은 `DOM을 생성하는 중간`에, Style Update는 `DOM 생성 후`에 일어난다.

#### Style Recalc
- getComputedStyle(element)

### Layout
- 실제로 화면에 표시될 Object를 결정하고 Layout Tree 구성
  - `<head>` Tag, `display:none` 인 Component는 그려지지 않는 것을 처리함
- 어떤 위치에 어떤 사이즈로 배치할지를 결정
- Reflow

### Layerization
- Paint는 DOM의 순서가 아니라, `Stacking Order`를 따른다.
- Paint Layer Tree 생성

#### Stacking Order
- `z-index`

### Paint
- Paint Layer Tree Object가 모든 결정된 데이터를 들고 있기에, `Graphics Library`(=SKIA)가 그린다.

> 지금까지 살펴 본 렌더링은 모두 `Main-Thread`에서 일어난다.

## V-Sync Timeline
- 60Hz 모니터 기준, 16.7ms 안에 처리가 되야 부드러운 애니메이셙으로 보인다.
- DOM, JavaScript, Painting을 모두 16.7ms 이내에...

## Frame-Drop 없이 웹페이지를 그리려면?

### 그림 그리는 것을 미루자
- 다른 Thread에게 넘겨주자
- Recording(Main Thread) <-> Playback(Raster Threads)
- Composite(Compositor)

## Rendering 관련 용어 정리
- Painting: 넓은 의미로 Rendering과정 전체, 좁은 의미로 Recording
- Recording: Blink 관점에서, Painting, 그림 그리는 연산을 기록하는 행위
- Rasterization: Pixel Buffer에 그림을 실제로 그리는 행위
- Compositing: 여러장의 그림을 합성하는 행위
- Drawing: 그림을 사용자가 보ㅓㄹ 수 있는 화면에 출력하는 행위

## GPU Acceleration
- GPU 가속
  - Modern-browser의 대부분은 `GPU가속을 사용`한다.
- OpenGL

### GPU 가속의 장점
- `Graphics Primitive들을 빠르게 그릴 수 있다.`
- 각종 변환(Transformation)을 빠르게 할 수 있다.
- 텍스쳐를 빠르게 합성할 수 있다.

> `GPU Compositing`이란, 이미지를 `GPU 메모리에 Cache`해두었다가 필요할 때 `합성`하는 것

### Texture Upload

### Tiling

> https://csstriggers.com

> GPU Rasterization..?

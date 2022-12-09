# [Scroll Snap](https://drafts.csswg.org/css-scroll-snap)

## History

### 2013
- Edge, Firefox: Point alignment model

### 2016
- Safari, Chrome, Opera: Box alignment model

## Scroll Container
- [Scroll Container](https://drafts.csswg.org/css-overflow-3)
  - overflow-x, overflow-y, overflow: scroll
- Snap이 동작하는 전체적인 정책을 정의하는 것

### scroll-snap-type
- scroll-snap-type: {{ first_param }} {{ second_param }}
  - scroll-snap-type: x mandatory
- First param, `Scroll Snap Axis`
  - x, y: 물리적인 화면의 가로, 세로축
  - block, inline: 언어 설정에 따라 축결정
  - both: 양쪽다
- Sencod param, `Scroll Snap Strictness`
  - mandatory: 스크롤이 없어도 무조건 적용
  - proximity: 스크롤 양에 따라 적절히 적용

### scroll-snap-stop
- normal: 스크롤의 세기에 따라 동작
- always: 무조건 동작

### scroll-padding-TRBL
- scroll-padding-top
- scroll-padding-right
- scroll-padding-bottom
- scroll-padding-light

### scroll-padding-TRBL
- scroll-margin-top
- scroll-margin-right
- scroll-margin-bottom
- scroll-margin-light

## Snap Element
- 어디에 Snap이 적용될 것인가를 결정하는 것

### scroll-snap-align
- Snap이 멈추는 위치
- start, end, center

## Example 1
- 간단한 앨범커버

### HTML
``` HTML
<div class="gallery">
  <img src="1.png">
  <img src="2.png">
  <img src="3.png">
  <img src="4.png">
  <img src="5.png">
  <img src="6.png">
  <img src="7.png">
  <img src="8.png">
  <img src="9.png">
</div>
```

### CSS
``` CSS
.gallery {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.gallery img {
  scroll-snap-align: center;
}
```

## Example 2
커버타입 홈페이지

### HTML
``` HTML
<article>
  <header>Header</header>
  <section style="background: #ffaaaa"> Section 1 </section>
  <section style="background: #aaffaa"> Section 2 </section>
  <section style="background: #aaaaff"> Section 3 </section>
</article>
```

### CSS
``` CSS
html, body {
  height: 100%
}

body {
  margin: 0;
  padding: 0;
}

article {
  overflow-y: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding-top: 30px;
  height: 100%;
}

section {
  scroll-snap-align: start;
  height: calc(100% - 30px);
}

header {
  position: fiexed;
  width: 90%;
  height: 30px;
  top: 0;
  left: 0;
  background: #559955;
}

section:first-of-type {
  margin-top: 30px;
}
```

# Vertical Align(알다가도 모르겠는 너란 녀석)
- 태재영, 지그재그
- 발표자료 - TBD

# 수직 정렬을 맞추는 방법?
- padding
- margin
- position
- transform
- vertical-align

# vertical-align
- Line box 내에 있는 요소들에 영향을 미친다. - w3c
- Container의 크기와는 상관 없이, Line Box의 크기에 따라 결정된다.

## 사용 가능한 옵션
- top
- bottom
- textTop
- textBottom

## Line Box
- vertial-align의 `top`, `bottom`을 사용하여 범위 확인이 가능함
- Line Box의 크기는 네부 inline 요소들의 크기 중 가낭 큰 값으로 결정함

# vertical-align: middle;이 동작하지 않는 이유?
- Container의 크기만 조절하고, Line Box의 크기를 조절하지 않았기 때문

# Strut
- width 0
- font
- line-height

> line-height에 상수값을 준다면, font-size * line-height 값으로 크기를 설정함

> content-area != font-size

> line-height = content-area + leading

# reset.css
- 브라우저마다 CSS의 기본 값이 달라 이를 정리하기 위해서 사용하는 것

> descender 의도치 않은 공간을 차지하는 것

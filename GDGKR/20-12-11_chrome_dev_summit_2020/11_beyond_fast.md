# Beyond fast
- Jake Archiblad / Developer Advocate
- [Youtube](https://youtu.be/Z6wjUOSh9Tk)

## content-visibility & contain-intrinsic-size
```css
.content-area {
  content-visibility: auto;
  contain-intrinsic-size: 500px;
}
```
- Viewport에서 렌더링할 영역을 명시적으로 지정해주고, 나머지 영역은 레이아웃만 처리하고 렌더링하지 않아, 성능이 좋아진다.

### References
- [content-visibility: the new CSS property that boosts your rendering performance](https://web.dev/content-visibility/)
- [content-visibility : 렌더링 성능을 향상시키는 새로운 CSS 속성](https://frontdev.tistory.com/m/entry/content-visibility-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%84%B1%EB%8A%A5%EC%9D%84-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EB%8A%94-%EC%83%88%EB%A1%9C%EC%9A%B4-CSS-%EC%86%8D%EC%84%B1?category=761560)

## font metrics override descriptors
```css
@font-face {
  font-family: some-font; src: ...;
  font-display: swap;
  ascent-override: 73%;
  descent-override: 25%;
  line-gap-override: 2%;
}
```
- 웹폰트를 사용할 때, 폰트가 로드되어서, **swap**하면서 폰트의 설정에 따라서 컨텐츠의 높이가 달라지는 경우가 있는데, 이를 방지할 수 있게 해줌.

### References
- [Explainer: Font Metrics Override Descriptors](https://gist.github.com/xiaochengh/da1fa52648d6184fd8022d7134c168c1)

## <portal src="..."></portal>
- Not **iframe**
- [Portals](https://github.com/WICG/portals/blob/master/README.md)

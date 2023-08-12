# What's new in Web
- Mariko Kosaka
- [Youtube](https://youtu.be/x9rh0Du4Czg)

> 웹은 언제나 진화하고 있다

## Baseline
- https://web.dev/baseline

## Demo Time

### Dialog
- 이미 JavaScript 안에 있는건데?
- HTML을 사용하여 구현한다는 것은, 브라우저의 마법과 함께 한다는 것
- 포커스 관리, 탭 추적, 컨택스트 쌓기 등
- 작성할 코드가 줄어들고 관리가 쉬워진다
```html
<dialog id="d">
  <form method="dialog">
    <p>Hi, I'm a dialog.</p>
    <button>ok</button>
  </form>
</dialog>

<button onclick="d.showModal()">
  Open Dialog
</button>
```
### Animations

#### Complex keyframe animation
- Individual Property for transform
```CSS
/* AS-IS */
.target {
  tarnsform: translateX(50%) rotate(30deg) scale(1.2);
}

/* TO-BE */
.target {
  translate: 50% 0;
  rotate: 30deg;
  scale: 1.2;
}
```

- 복잡한 애니메이션 만들기의 변화
```CSS
/* AS-IS */
@keyframes anim {
  0% { transform: translateX(0%); }
  10% { transform: translateX(10%) rotate(72deg) scale(1.2); }
  25% { transform: translateX(25%) rotate(180deg) scale(1.2); }
  85% { transform: translateX(85%) rotate(180deg) scale(1.2); }
  90% { transform: translateX(90%) rotate(240deg) scale(1.2); }
  100% { transform: translateX(100%) rotate(360deg) scale(1.5); }
}

/* TO-BE */
@keyframes anim2 {
  0% { translate: 0% 0; }
  100% { translate: 100% 0; }

  0% { scale: 1; }
  10% { scale: 1.2; }
  100% { scale: 1.5; }

  0% { rotate: 0deg; }
  25%, 85% { rotate: 180deg; }
  100% { rotate: 360deg; }
}
```

### New Viewport Units
- 모바일의 뷰포트의 크기는 동적 툴바의 유무에 따라 달라진다
- URL 표시줄과 탐색 툴바를 표시하기도 하지만 숨기기도 한다.
   - 표시할 때는 The Small Viewport => 100 svh
      - lvh
      - lvw
      - lvmin
      - lvmax
   - 숨길 때는 The Large Viewport => 100 lvh
      - svh
      - svw
      - svmin
      - svmax
   - 동적(dynamic)
      - dvh
      - dvw
      - dvmin
      - dvmax

### Deep copy in JavaScript
- structuredColne()
```JavaScript
const original = {id: 0, prop: {name: "Tome"}};

// AS-IS
const deepCopy = JSON.parse(JSON.stringify(original));

// TO-BE
const deepCopy = structuredColne(original);
```

### CSS Pseudo-class to check if focus ring is visible
- 키보드로 페이지를 탐색하거나 입력 요소를 클릭하면 나타나는 focus
- focus-visible
```CSS
/* foucs with tab key */
:focus-visible {
  outline: 5px solid pink;
}

/* mouse click */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Transform Stream
- Pipe streams into one another
- writable -> readable
```JavaScript
const response = await fetch(url1);
const { readable, writable } = new TransformStream();

// Compress the data from url1;
response.body
  .pipeThrough(new CompressionStream('gzip'))
  .pipeTo(writable);


// Post to url2
await fetch(url2, { method: 'POST', body: readable });
```

### Import Maps
- Import ES modules in your code
```HTML
<script type="importmap">
  {
    "imports": {
      "lodash": "https://unpkg.com/lodash@4.17.21/lodash.js",
      "util": "./modules/utils.js"
    }
  }
</script>

<script type="module">
  import _ from 'lodash';
  console.log(_.map([1, 2, 3], (n) => n * 2));
</script>

<script src="./main.js" type="module" defer></script>
```

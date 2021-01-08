# Transitioning to modern JavaScript
- Houssein Djirdeh / Developer Relations Engineer
- Jason Miller / Developer Relations Engineer
- [Youtube](https://youtu.be/cLxNdLK--yI)

> 아래 질문들이 모던 자바스크립트인지 아닌지 확인하자!

## Question 1

### Question
```JavaScript
var months = ['January', 'Feburary'];
months.indexOf('March');
```

### Answer
- `var`을 사용하여 변수를 선언했기에 아니다!
- indexOf()는 ES5에서 나온 함수이기에 아니다!

## Question 2

### Question
```JavaScript
var obj1 = { a: 0, b: { c: 0 } };
var obj2 = Object.assign({}, obj1);
```

### Answer
- 모던 자바스크립트에서 나온 문법이 아니니 아니다.

## Question 3

### Question
```JavaScript
var freshPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    const drink = 'juice';
    resolve ('Fresh' + drink);
  }, 250);
})
```

### Answer
- Block Spoce 안에서의 let, const는 IE11에서도 지원했기에 아니다. ~조금의 버그가 있지만~

## What is Modern JavaScript
- Modern JavaScript is not `ES2015` / `ES2017` / `ES2020` syntax
- Modern JavaScript is JavaScript code written in syntax that is supported in **all modern broswers**
- Modern JavaScript is `moving target`

### Classes
```JavaScript
class Profile extends Widget {
  constructor() {
    super();
  }

  static load() {
    return apiCall('/profile');
  }
}
```

### Arrow functions
```JavaScript
const add = (a, b) => a + b;

class Profile {
  update() {
    Profile.load().then(data => {
      this.render(data);
    })
  }
}
```

### Generators
```JavaScript
function* search(node) {
  if (!node) return;
  yield node;
  yield* search(node.firstChild);
  yield* search(node.nextSibling);
}

for (let node of search(document)) {
  if (node.localName === 'title') {
    console.log(node.textContent);
    break;
  }
}
```

- 아이러니하게도, 발표자들도 Generator를 직접 손으로 작성해본적은 없다고함.

### Block Scoping
```JavaScript
const events = {
  click: log,
  mouseup: log
};

for (let type in events) {
  let fn = events[type];
  addEventListener(type, function(e) {
    fn(e);
  })
}
```

### Destructuring
```JavaScript
function add({a, b = 0}) {
  return a + b;
}

const { x, y, z = 0 } = { x: 1, y: 2 };
const [a, ...rest] = 'abc'.split('');
```

### Rest & Spread
```JavaScript
function h(a, b, ...c) { };

Math.max(...[1, 2, 3]);

let unique = [new Set([1, 2, 2, 3])];
```

### Object Shorthand
```JavaScript
let a = 1, b = 2;
const obj = { a, b };

const Myth = {
  randome() { return 42; }
}
```

### Async / Await
```JavaScript
class Profile {
  async update() {
    this.render(await Profile.load());
  }
}

for (const a of document.links) {
  const res = await fetch(a.href);

  if (!res.ok) {
    a.classList.add('gone');
  }
}
```

- `ES2017`에서 소개된 기능이지만 이미 `95% 이상의 브라우저가 지원`하고 있다.

## What is Broswer Support?
- `약 94%`정도의 브라우저가 모던 자바스크립트를 지원하지만, 우리는 브라우저 지원을 위해서 Transpiling을 하고 있다.
- 아래와 같이 개발자가 작성하는 코드는 `21bytes`에 불과하지만, 컴파일한 코드는 `583bytes`에 달한다.
   ```JavaScript
   const foo = async () => 42;
   ```
- 이와 같이 파일 크기가 커지면 커질수록 속도는 점점 느려진다.
- 위에서 모던 자바스크립트의 예시로 들었던 코드들의 총 합은 `780b`이나, Transpile 후에는 `6Kb`. `약 7배` 정도 늘어난다.

## Legacy is the default on npm
- Top 1000 fornt-end modules
- Median and average ES version: ES5
- Less than 25% contain any syntax newer than ES5
- `11%` use the `broswer` field, and `2%` use `jsnext:main`
- Only `9%` use the `moudle` filed

## Why legacy is the default on npm
- 패키지 제공자들은 의존성을 transpile 하기 위해, 브라우저를 지원하기 위해..
- Only `half` of tools transpile dependencies
- Publishing modern code `breaks` broswer support for anyone using these tools
- Module authors must choose: transpile or be buried in modern JS support issues

## A way out: Where we are today
```json
{
  "name": "amaze-js",
  "exports": "./modern.js",
  "main": "./legacy.js"
}
```
- Node.js v12.8+ 부터는 `exports` 라는 항목을 사용하여 Modern JavaScript를 위한 별도 파일을 제공할 수 있다.

### If 95% Broswer support is enough:
- Stick to **ES2017**, ES2017 is the closest to morder syntax today
- Transpile to **ES2017**!

### Need to support IE11? Opera Mini?
- Generate **ES2017** bundles and serve them to modern browsers.
   ```html
   <script type="module" src="app.modern.js"></script>
   <script nomodule src="app.legacy.js"></script>
   ```

#### Two Options
- Option 1: Compile Twice
- Compile to mordern, then transpile output

### IE11 is a TAX you don't have to pay
- If you need to support IE11? BE CAREFUL!

## Optimal bundle configurations
- https://web.dev/publish-modern-javascript
- https://estimator.dev

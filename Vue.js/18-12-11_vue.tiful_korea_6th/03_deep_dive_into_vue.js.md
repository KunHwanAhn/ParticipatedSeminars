# Deep dive into Vue.js
- 이선협, Cobalt. Inc / Vue.js Korea 페이스북 그룹 관리자
- Slack @kciter
- https://github.com/kciter

## Target
- 기초 HTML, CSS, JavaScript를 공부한 후, 첫 프레임워크로 Vue.js를 선택하고 Vue.js 사용에 조금 익숙해진 사람 => 중급자

## 무엇을 하는 세션인가?
- Vue.js는 어떻게 만들어졌는가?
- Data 흐름은 어떻게 흘러 가는가?

## 최종 목표
- 1%의 버그 수정하기

> 혹시라도 생길 수 있는 1%의 버그를 수정하기 위해서는 기술의 깊은 곳까지 다다라야 한다.

## Vue.js의 큰 그림
- Vue.js Architecture
- Observing
- Rendering
- Vue.js Package

## Vue.js Architecture
- Architecture Pattern? **MVVM**을 닮은 무언가... Not equal to MVVM

### MVVM
- View: DOM
- ViewModel: Vue Instance
- Model: Plain JavaScript Objects
- View가 ViewModel을 몰라도 전달이 가능하기에, 의존성이 낮게 개발이 가능함
- Component = View + ViewModel

### MVVM을 닮은 무언가인 이유?
- Virtual DOM이 View와 ViewModel 사이에 존재하기 떄문!
- Data binding from VieModel
- Event from View

## Observing
- **initState** -> $monut -> render -> update -> chang data -> render ...

### initState
- initProps
- initMethod
- initData
- initFooBar...

#### initData
- 컴포넌트의 경우에는 Function이기 때문에 데이터를 가져오는 방법을 다르게 구현
- 만약, methods와 props에 중복된 키가 있다면 경고 로그를 남김
- computed에서 감시할 수 있도록 `shredPropertyDefinition`이라는 오브젝트에 proxy 형태로 키값을 저장
- root data를 감시한다.

##### observe()
- vue/src/core/observer/index.js
- 이미 옵저버가 있으면 있는 것을 리턴, `__ob__`
- 만약 옵저버가 없다면 생성

##### Observe Class
- `__ob__`로 옵저버를 추가
- Array일 경우 각 item에 Observer를 추가
- Reactive property를 추가

##### in initLifecycle
- Watcher를 통해 데이터 변경을 감시, 변경되면 updateComponent를 실행하여 Rerendering

> initState -> initData -> observe(data) -> Observer(data) -> defineReactive(dataObj) -> Watcher(updateComponent) -> vm._update(vm._render())

## Rendering

### $nextTick?
- Vue.js는 데이터가 변경되었다 하더라도, DOM에 바로 적용하지 않는다.

### Virtual DOM
- 메모리에서 가상의 DOM구조체를 들고 있는 것
- DOM 조작 후의 Rendering이 느리기 때문에 Virtual DOM을 도입함, 2~3배 정도의 속도 차이가 발생함

```JavaScript
let VNode = {
  tag: 'div',
  attributes: { id: '#app' },
  children: []
}
```

#### renderMixin

## Vue.js Package
- Core < Platform < vue-cli

### Core
- vue/src/core/
- components: 각 플랫폼에서 공통적으로 사용하는 부분
- global-api: app.use, app.mixin API 정의
- instances: rendering interface
- observer: data 변경 observer, reactive
- vdom: Virtual DOM

### Platform
- vue/src/platforms/web/
- complier: Tag단위 컴파일, v-if, v-on etc... Binding
- runtime: Virtual DOM을 실제 DOM으로 변경, v-show

### vue-cli

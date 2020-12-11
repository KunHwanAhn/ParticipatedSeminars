# What's new in DevTools
- Jecelyn Yeen / Developer Advocate
- [Youtube](https://www.youtube.com/watch?v=QsOF9SJJdAA&list=PLNYkxOF6rcIDzLmWaDwfHVZJl1Q5RFgOR&index=3)

## GREAT for you
- G - Great Tools
- R - Rendering tab and Sensoring Tab
- E - Elements Pannel Enhancements
- A - Accessibility
- T - new Tabs and Pannels

## Great Tools
- CSS Grid를 위해 발전한 Grid를 위한 Dev Tools

## Rendering Tab and Sensoring Tab

### Sensors Tab
- Location을 Emulate할 수 있게 됨
- Emulate Idle Detector State
   - IdleDetector API
   - 실제로 IDLE 상태로 가지 않아도 상태를 선택함으로써 기다리지 않고 사용이 가능함

### Rendering Tab
- 로컬 폰트를 로드하는 것을 비활성화 할 수 있는 기능을 추가함
- `prefers-reduced-data` Media Query를 사용하면, 웹폰트를 로드하지 않고 Fallback 폰트를 테스트 가능함

## Elements Pannel Enhancements
- JS Framework에 의해 생성된 CSS를 기존에는 수정할 수가 없었다.
- 이제 Element Pannel의 Styles 탭에 사이드 뷰로 Computed 탭을 열 수 있는 버튼을 추가함
   - [영상 4:31](https://youtu.be/QsOF9SJJdAA?t=271) 즈음 확인 가능
- Computed 탭에서도 이제 CSS를 비슷한 유형끼리 볼 수 있도록 `Group`이라는 기능을 추가함

## Accessibility
- Element Pannel에서 특정 태그에 마우스를 후버했을 때, 일반적인 속성 뿐만 아니라, 접근성과 관련된 내용을 같이 보여줌
- Rendering Tab에 시각적으로 불편한 사람들이 볼 때의 화면을 가상화할 수 있는 `Emulate vision deficiencies` 기능을 추가함
   - 색약 등 다양한 케이스를 가상화할 수 있게 함
- Element Pannel의 Styles 탭의 `Color Picker`에 접근성을 위해서 적절한 고대비 색상을 찾아서 수정하는 기능을 추가함
- `CSS Overview` Pannel에서 도 색상에 문제가 있는 Element를 찾아서 고칠 수 있도록 표시해줌

## new Tabs and Pannels
- `Issues Tab`을 새로 만들어서 거기서 이슈의 이유와 고칠수 있는 방법을 제안해줌
- `WebAuthn Tab`
- 상단에 있는 Pannel을 하단부로 옮길 수 있도록 만듬
- 동영상 스트리밍 같은 부분을 확인하고 싶을 때는 `Media Tab`내에서 `Timeline`을 확인하면 확인이 가능하고 그외에도 다양한 기능을 추가함

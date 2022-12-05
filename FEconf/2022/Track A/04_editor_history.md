# 텍스트 에디터? 그게 뭘 만드는건데?
- 에디터의 발자취와 새로운 발자국 (React + contenteditable)
- React 기반의 WYSIWYG 에디터로의 도전
- [Youtube](https://youtu.be/xDyUFE1pmmY?t=76)

## 목차
- Intro
   - 에디터? 그게 뭘 만드는 건데?
- 스마트 에디터로 살펴본 에디터의 발전
   - 세대별 에디터
- 새로운 에디터로의 도전
   - 새로운 에디터의 목표
   - 기존 기술과의 충돌
   - 우리가 흐름을 제어하자: Upstream & Downstream

## Intro

### 에디터? 그게 뭘 만드는 건데?
- IDE, VS Code, IntelliJ
- notion, blog

#### 키보드 화살표를 눌러서 이미지에 포커스를 줄 때의 처리 순서
- Event 발생 -> 분석 -> 아래 방향키 -> 현재 위치 확인 -> 이동할 위치 탐색 -> 이미지 존재 여부 확인 -> 이미지 선택 UI 표현 -> 이미지 도구막대 노출 -> 커서 이동 및 저장

## 스마트 에디터로 살펴본 에디터의 발전

### 세대별 에디터

#### 1세대 에디터
- contenteditable 기반
   - HTML 요소들을 직접 수정할 수 있는 속성 (contenteditable="true")
   - 브라우저가 생성될 HTML 요소를 직접 결정
- 문서를 HTML 그대로 저장

```HTML
<div contenteditable="true">글을 입력할 수 있어요.</div>
```

##### 한계
- 문서를 HTML 그대로 저장
- 스타일이 inline style로 추가됨
- => 멀티 디바이스 대응이 어려움

#### 1.5세대 에디터
- 문서 모델링(JSON)
- 블록 단위 편집

##### 한계
- 어색한 Selection 동작: 다른 영역의 텍스트를 함께 선택할 수 없음
- 브라우저마다 다른 contenteditable 처리 방식

#### 2세대 에디터
- 가상커서: 브라우저가 지원하는 커서가 아닌 **직접 만든 커서**
- input buffer: 가상 커서가 위치한 곳이 아닌 **화면 밖 실제 입력 영역**
   - 사용자 입력 -> input buffer에 입력됨 -> 에디터 본문에 렌더링

##### 한계
- 브라우저 네이티브 활용 어려움
   - 다국어 이슈
   - 우클릭 붙여넣기 이슈

#### 다국어 이슈
- input buffer 위치에서 자동완성 관련 UI 위치가 잘못 나옴
- 자동완성 창이 뜨더라도, 유저가 키보드 입력으로 상호작용할 수 없음

#### 우클릭 붙여넣기 이슈
- 우클릭 메뉴에 붙여넣기가 존재하지 않음.
- 브라우저에서는 붙여넣기 권한을 풀어주지 않기 때문에, 확장 프로그램을 설치해야 함

## 새로운 에디터로의 도전

### 사전 지식
- React
   - DOM과 별개로 Virtual DOM을 관리
   - 데이터 변경 시 컴포넌트 단위로 재렌더링
- MobX
   - 상태 관리 라이브러리
   - React와 함께 사용하면 React의 렌더링에 관여
      - observer: 상태 변화를 감지하여 렌더링에 관여할 수 있도록 함 (HOC)
```JavaScript
const count = obervable.box(0);
const App = observer(() => {
  const handleClick = action(() => {
    count.set(count.get() + 1);
  });

  return (
    <>
      <p>{count.get()}</p>
      <button onClick={() => { handleClick(); }}>+</button>
    </>
  );
})
```
- contenteditable

### 새로운 에디터의 목표
- 기존 에디터의 사용성 유지
   - 가상 커서
   - 다양한 지원 기능
- 브라우저 네이티브 활용 어려움 해소
   - 다국어
   - 붙여넣기

### 기존 기술과의 충돌
- React: Store 업데이트에 따라 Virtual DOM을 만들고 DOM 업데이트
- contenteditable: 사용자 입력에 따라 DOM이 변경되고, Store가 업데이트 됨
- => React Virtual DOM과 DOM의 싱크가 깨짐

### 우리가 흐름을 제어하자!
- Dom과 Virtual DOM 싱크가 깨질만한 상황은 나누어 관리하자
- Store <---Upstream--- DOM
- Store ---Downstream---> DOM

#### Upstream
- DOM의 변화에 따라 Store 업데이트
- MobX의 **untracked API**를 이용하여 React 반응을 임시 중단
- 텍스트 입력 시 사용

### Downstream
- Store 업데이트 사항을 DOM에 반영
- 이 때 DOM의 변경사항은 Store에 업데이트 되지 않음

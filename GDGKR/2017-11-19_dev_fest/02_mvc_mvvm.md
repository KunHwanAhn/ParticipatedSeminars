# MVC 부터 MVVM, 단방향 데이터 흐름까지
- 김용욱, Realm

## Forms & Controls
- Screen Layout: Target, Actual, Variance 등의 컨트롤을 구성
- Form Logic: 컨트롤 내에 프로그래밍 하기 어려운 행동을 정의
- SmallTalk 시절부터 전통적인 형태
- 90년대 클라이언트-서버 환경에서 크게 유행
  - 비주얼 베이직

### Form
- 텍스트 필드 Actual에 대해 입력 이벤트를 받습니다.
  - Observer 패턴에 의존

### Controls
- Target
- Actual
- Variance

## Data Binding
- 데이터 바인딩은 MVVM의 전유물이 아니다.
- Forms & Controls, MVC에서든 사용가능.
- 양방향 / 단반향 바인딩
  - 오랫동안 양방향 바인딩은 순환 참조 때문에 선호되지 않았음
  - 보통은 Screen State를 초기 설정 후, Session State 방향으로 동기화 하는 전략이 전통적인 선택
  - 해결방법은 `타임 스탬프`로 변경 시점으로 비교하는 것, 하지만 비교를 위해서 추가정보가 피료하기에, 상태가 많아질수록 메모리, 성능 이슈 발생 가능

## Seperated Presentaion
- 초기 앱들은 GUI와 CLI를 모두 지원했습니다.

## MVC, Model - View - Controller
- Seperated Presentaion + Observer
- `Controller`: 입력을 받아 무엇을 할지 결정
- `Model`
- `View`
- 초기 MVC는 View와 Controller 모두 Observer에 의존, 여러개의 View와 Controller를 만들었음

### MVC: Passive Model
- Controller가 더 많은 책임을 가지는 방식
- View의 역할이 한정적일 때, View가 Model을 구독할 수 없을 때 효과적.
  - HTTP 기반의 웹 프로그래밍 (e.g. MVP Model2)
  - View에 로직을 넣기 힘든 환경(XML로 UI가 생성되는 안드로이드 등)
- Activity/Fragment를 Controller로 잡고 XML로 생성된 뷰 객체들이 제한적인 View로 가정하고 Controller가 다 챙겨주는 형태가 일반적.

## MVP, Model - View - Presenter
- Forms & Controls와 MVP를 합치려는 IBM의 노력
- View는 Forms & Contorls 수준의 Control 수준으로 다루고, View/Controller 구분은 제거한다.
- 실제 상호 작용은 분리된 Presenter 객체에 넘겨 처리한다.
- View가 Model을 다루는 방식에 따라 두가지 스타일이 있다.
  - Supervising Controller: View가 Model에서 옵저버 패턴을 통해 가져간다.
  - Passive View: Presenter가 View의 갱신을 책임진다.
- 안드로이드에서는 주로 Activity와 그 부속 View 객체들을 통채로 MVP의 View로 잡으며 이벤트 등을 등록된 Presenter에게 바로 전달하는 방식으로 구성한다.
- 인터페이스를 상속받는 등의 구성은 MVP의 본질은 아니다.

## Flux
- Facebook에서 React를 만들면서 제안
- Action 이라는 데이터를 보내면 Dispatcher가 Store에게 보내고, View가 Store가 가지고 있는 데이터를 화면에 표시하는 구성
- 단방향(Uni-Driection) Architecture
- Dispatcher를 이벤트 버스로 구현하고, Sotre는 이벤트 Subscriber로 구현해서 Action 처리 결과를 자료형에 담아 View에서 표시

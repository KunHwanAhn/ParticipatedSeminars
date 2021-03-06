# Vue.js를 이용한 백오피스 구현기
- 마광휘, 와인포인트
- [발표자료](https://www.slideshare.net/gwangwhima/vuejs-125681294)

## 목차
- 개발환경 설정
  - 필요한 페이지와 동작 환경에 대한 설정
  - Vue를 적용하는 과정에 대해 설명
- 개발 진행
  - 검증이된 모듈 사용 VS 직접 제작
  - 검증이 되지 않은 모듈 사용 VS 직접 제작
  - 재사용 컴포넌트 정리
- 결론

## 개발환경 설정
- 데이터 어드민 페이지
- 물류(창고) 페이지
- 점포(매장) 페이지

### 기존 개발 스택
- Infra: AWS EC2, S3, RDS...
- DBMS: PostgreSQL
- Backend: Node.js + Express.js
- 빠른 개발을 위해서 JavaScript Framework로 개발

### 프레임워크 설정시 고려한 점
- **러닝 커브**
- 모듈
- 도큐먼트
- 커뮤니티 크기

#### 러닝 커브
- Vue.js < React.js < Angualr
- Single File Component

## 개발 진행

### 검증이된 모듈 사용 VS 직접 제작
- **Vuex**

#### Vuex를 도입하지 않은 이유?
- Vuex를 도입할 만큼 프로젝트가 크지 않음
- Vuex에서 필요한 기능이 없을 경우 -> 구현이 어려울듯?
- 개발 기간에 여유가 있었음.

#### Vuex를 도입하게된 이유
- 개발 진행 중 다른 프론트엔드 페이지 개발로 인한 기능 부재
- Flux레거시 관리, 운영의 어려움
- Vuex는 문서화가 잘되어 있다.

#### 얻은 경험
- 규모에 상관없이 Sotre가 필요할 떄는 Vuex를 사용.
- Store 제작 시, 메모리 누수 확인
- 인원이 적을 수록 관리자가 없을수록 검증된 오픈 소스 사용을 하자.
- 제작 시 필수적으로 모듈화할 수 있는 기능을 만들어 놓기

### 검증이 되지 않은 모듈 사용 VS 직접 제작
- Vue-Table-2

#### 검증이 되었는가?의 기준
- 필요한 기능이 있는가?
- 수치 확인

##### 필요한 기능이 있는가?
- 페이지네이션
- 상세페이지
- 행마다 컨트롤 가능 여부
- 검색 기능
- 이러한 기능들이 잘 구현되어 있는가?

##### 수치 확인
- Numbers at NPM Page
- last publish
- weekly downloads

#### 얻은 경험
- 필요로 하는 정보 기획에 따라 레이아웃이 많이 다르면 **구현하는 것이 빠른 경우**가 있다.
- 오픈소스를 쓰기에는 아직 **Vue 모듈들은 검증이 많이 되지 않았다**.

### 재사용 컴포넌트 정리
- Sidebar
- Modal Manager

#### 재사용 컴포넌트 제작 규칙
- Vue를 제외한 **다른 모듈에 의존적이지 않아야함**
- **컴포넌트 단독으로 Vue로 제작된 다른 프로젝트에서 사용** 가능
- **JSON 포멧**의 간편하고 간단한 설정

#### Sidebar

##### 요구사항
- Nested 구조로 Fold가 가능하고 위상이 분리될 것
- 클릭 영역에 맞게 라우팅이 될 것
- 상단, 하단부의 커스터마이징이 가능할 것
- 이름으로 접근해서 라우팅 상태를 변경 가능하게 할 것
- 권한에 따라, On/Off가 될 것

##### Nested 구조로 Fold가 가능하고 위상이 분리될 것
- JSON 규칙 제작
- 재귀 컴포넌트 구현

##### 상단, 하단부의 커스터마이징이 가능할 것
- Named Slot

#### Modal Manager
- Event Bus
- Component :is 사용

#### 얻은 경험
- Slot과 Component :is를 통해서 재사용성 높은 컴포넌트 작성 가능
- 재사용 가능한 컴포넌트의 경우 Vuex에 의존적인 형태로 작성 X
- 사용자 관점에서 사용을 어떻게 해야 할까 시나리오를 구상한 후 코드 작성
- 모듈을 만들 때 강력한 Type Annotation 사용

## 결론

### HTML, CSS의 분리로 퍼플리셔, 디자이너 등과의 쉽고 빠른 협업
- Single File Component로 JavaScript에 익숙하지 않은 직군과 협업이 가능
- SFC로 관리 효율 증대

### 개발자와의 협업에서 러닝커브 증가 가능성

### 기존 소스와의 훌륭한 통합

### TypeScript 완벽한 지원이 필요
- HTML 코드를 통해 props로 전달하므로 오히려 더 강력한 타입 규제가 필요함
- vue-class-component로 되지만, 프레임워크에 의존적임

### Vuex에서 강력한 Type Annotation이 필요
- Vuex는 아무래도 Store인 만큼 타입이 명시적이어야 하며, 규제가 강력하게 필요
- 맞지 않는 타입이 들어갈 경우에 대한 Validation 코드가 추가됨

### React에 비해 파일 및 코드의 양이 증가
- Template, Style 등의 코드로 인해 한 파일의 양이 증가

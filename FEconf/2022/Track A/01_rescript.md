# ReScript 같이 해요
- [Youtube](https://youtu.be/208ZBisLuXw?t=75)

## 목차
- 가볍게 알아보기
- 작게 좋았던 점
- 크게 좋았던 점
- 아직도 망설인다면
- 아쉬웠던 점

## 가볍게 알아보기

### 읽을 수 있는 JavaScript로 컴파일되는 강력한 타입 언어
- JavaScript 개발자에게 친숙한 구문을 제공
- 모든 JavaScript 라이브러리를 ReScript와 함께 사용 가능
- npm / yarn을 사용하여 패키지 관리 가능
- [rescript playground](https://rescript-lang.org/try)

### ReScript 첫인상
- 프로그래밍 언어 문법은 금방 익힌다는 자신감 Down

#### 달랐던 것들
- let만 있다 => const와 비슷한 불변 변수 선언
- 화살표를 사용한다 => `->` 파이프 연산자, a(b)를 `b->a`
- return이 없다 => 마지막 라인은 암묵적 반환
- import & export가 없다 => 모든 모듈은 내보내진다
- 타입 어노테이션 없이도 타입이 있다 => 타입 추론 시스템

## 작게 좋았던 점

### 빌트인 포매터
- 작은 따옴표 VS 큰 따옴표 / 탭 사이즈 2 VS 4 / 세미콜론 붙이기 VS 말기 => 논쟁할 필요 없다
- 기본적으로 포매터가 내장되어 있어서 위와 같은 고민을 할 필요 없다

### 좌에서 우로, 위에서 아래로 일기
- 파이프 연산자 `->` 책 읽듯이 한 방향으로 읽기
```ReScript
// validateAge(getAge(parseData(person)))

person -> parseData -> getAge -> validateAge

person
-> parseData
-> getAge
-> validateAge
```

### export & import 신경 안쓰기
- 모든 `.res` 파일은 모듈
- 모든 모듈은 내보내진다
- 인터페이스 파일을 사용하면 내보내고 싶은 모듈만 지정할 수도 있다.
- 자동으로 프로젝트 안에서 모듈을 찾는다
- import 파일의 위치를 몰라도, import한 파일의 위치가 바뀌어도 코드를 변경하지 않아도 된다

#### 예시
- TestComponent.res
```ReScript
module Button = {
  @react.component
  let make = () =>  <button> {`click` -> React.string} </button>
}
```
- 트랜스파일한 TestComponent.js
```JavaScript
function Playground$Button(Props) {
  return React.createElement("button", undefined, "click");
}

var Button = { make: Playground$Button };

exports.Button = Button;
```
- TestPage.res
```ReScript
<TestComponent.Button />
```

## 크게 좋았던 점

### 타입 추론
- 타입 어노테이션 없이 모든 표현식의 타입을 힌들리-밀너 타입 추론으로 확인
```ReScript
let add1 = (a, b) => a + b // (int, int) => int
let add2 = (a, b) => a ++ b // (string, string) => string
let add3 = (a, b) => a +.b // (float, float) => float
```
- 값의 형태가 맞는 레코드 타입 선언을 찾는다
```ReScript
type person = {
  age: int,
  name: string,
}

// Some record fields are undefined: name 에러 발생함
let data = {
  age: 27,
}
```
-  타입 검사를 통과한다면 런타임에 잘못 처리되는 값이 없음이 보장된다

### Variant

#### 합타입
- Red 또는 Blue 또는 Yellow 표현한다
```ReScript
type color = Red | Blue | Yellow
let myColor = Red
```
- 배리언트 생성자는 추가 값을 가질 수 있다
```ReScript
type result = Pending | Success | Fail
type result = Pending | Success({ data: string }) | Fail
```

#### 패턴 매칭
- 데이터 형태에 따른 switch 구문
- 구조 분해를 하고, 각가 분해된 결과의 오른 편에 작성된 코드가 실행 된다.
```ReScript
type sns = Facebook(string) | Twitter(string) | None

let name = switch data {
  | Facebook(name) => name
  | Twitter(name) => name
  | None => ""
}
```
- 누락 된 패턴이 있는지 컴파일 시점에 검사한다
```ReScript
let data = (true, false)

// You forgot to handle a possible case here, for example: (false, false) 에러 발생함
let component = switch data {
  | (true, true) => "tt"
  | (true, false) => "tf"
  | (false, true) => "ft"
}
```

#### 패턴 매칭 & 배리언트
- Route 관련하여 Query Params가 추가된다면?

##### AS-IS
```ReScript
type page = Home | Post

let toString = page => {
  switch page {
    | Home => "/"
    | Post => "/post"
  }
}

<button onClick={_ => router->Next.Router.push(Route.toString(Home))}>
  {`Home으로`->React.string}
</button>

<button onClick={_ => router->Next.Router.push(Route.toString(Post))}>
  {`Post로`->React.string}
</button>
```
#### TO-BE
```ReScript
type page = Home | Post({ id: string })

let toString = page => {
  switch page {
    | Home => "/"
    | Post({id}) => {...}
  }
}

<button onClick={_ => router->Next.Router.push(Route.toString(Post{id: 123}))}>
  {`id와 함께 Post로`->React.string}
</button>

// 컴파일 에러 발생, id Query Param을 전달하지 않았기 때문에
<button onClick={_ => router->Next.Router.push(Route.toString(Post))}>
  {`Post로`->React.string}
</button>
```

### Null

#### option
- 타입으로 존재하지 않는 값을 표현한다
- ReScript에 null 또는 undefined에 대한 개념이 없습니다
- option 타입은 배리언트입니다
```ReScript
type option<'a> = None | Some('a)

let 계세요? = 없음 | 사람(정미량)
```


## 아직도 망설인다면

### 점진적 채택
- ReScript를 부분적으로 적용하면서 원활한 통합이 가능
- raw JavaScript 코드를 작성할 수 있다
```ReScript
let add = %raw(`
  function (a, b) {
    console.log("hello from raw JavaScript!");
    return a + b;
  }
`)

Js.log(add(1, 2))
```
- 타입 어노테이션이 없으면 추론이 된다
- 타입 어노테이션을 줘서 타입 안전하게 할 수도 있다

### genType
- ts-belt
- Option.res
```ReScript
%comment("Returns `Some(value)` if the provided value is not falsy, otherwise...")
@gentype
let fromFalsy = value => value ? Some(value) : None
```
- Option.ts
```TypeScript
export declare type ExtractValue<T> = Exclude<T, null | undefined>;
export declare type Option<A> = A | null | undefined;
export declare const Some: <A>(value: NonNullable<A>) => Option<A>;
export declare const None: Option<never>;

export declare function fromFalsy<A>(value: A): Option<ExtractValue<A>>;
```

## 아쉬웠던 점

### 바인딩
- 자바스크립트 함수를 사용하기 위해 바인딩을 해야 한다
- Next.js의 Head컴포넌트 바인딩 코드
```ReScript
// https://github.com/MoOx/rescript-next
module Head = {
  @module("next/head") @react.component
  external make: (~children: React.element) => React.element = "default"
}
```
- Web api의 addEventListener, removeEventLister 바인딩 코드
```ReScript
@val @scope("document")
external addEventListener: (string, t => unit) => unit = "addEventListener"
@val @scope("document")
external removeEventListener: (string, t => unit) => unit = "removeEventListener"
```

### 커뮤니티
- stackoverflow 또는 검색으로는 도움 받기 힘들다 => **ReScript Forum을 이용**

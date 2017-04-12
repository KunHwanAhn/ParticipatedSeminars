# 레진은 왜 코틀린을 선택했는가?
- 김태호(커니), [Blog URL](http://taeho.kim) 

# 이 발표에서 다루는 것
- 레진코믹스 앱에 코틀린을 도입하게 된 계기
- 코틀린 도입 시 수행했던 작업들 및 당시 적용했던 코들린의 기능 소개
- 코틀린 도십 시 유의해야 할 사항들
- 코틀린 도입 후 달라진 것들

# 이 발표에서 다루지 않는 것
- 코틀린을 프로젝트에 적용하는 방법, 기본 문법
  - kotlinlang.org를 참조

## Kotlin?
- 정적 타입의 프로그래밍 언어, JVM, Android the Browser
  - 100% interoperable JAVA

## 새로운 언어를 도입한다?
- 지금까지 짰던 코드들은 못 쓰는건가요?
  - 기능 개선을 원하지 다시 작업하기를 원하지 않는다.
- 정말로 안전한건지?
- 기능 개발하기도 힘든데 그걸 꼭 해야 하나요?
- 배우는데 어렵지 않나요?
  - 새로운 언어이기에 문법, 개발 방식이 다르다.
  - 혼자 작업하지 않는 이상 모든 팀원들이 함께 알아야 한다.
- 조금 시간이 지난 뒤에 적용해도 되지 않나요?

# 레진코믹스 앱에 코틀린을 도입하게 된 계기
- 호기심
- 믿고 쓰는 JetBrains
  - 지원하는 IDE가 있다.
- Null에 대한 Strict Handling
- Morden language
  - 새로운 언어들의 특성을 거의 대부분 갖고 있음.
- 코틀린 100%로 앱 개발하는 곳도 있다는 소식

# 코틀린 도입 시 수행했던 작업들 및 당시 적용했던 코들린의 기능 소개

## 입문 단계

### 자바로 작성한 클래스를 코틀린으로 변환하기
- Java > Kotiln Converter
  - IntelliJ 코틀린 플러그인 제공
- 완벽하진 않습니다.
  - visibility: package-private > internal
  - Nullability (nullable or non-null?)
- 기본 문법이 익숙하지 않을 때, 참고 용도로 사용하기엔 무리가 없음

### Nullability
- Java
``` Java
public String foo() {
  ...
}

// null or non-null?
String f = foo();
```

``` Java
@NonNull
public String foo() {
  ...
}

// non-null
String f = foo();
```

- Kotlin
``` Kotiln
// ok
val foo: String? = "foo"

// compile error
val bar: string = null

```

### equals or ==
- Java
``` Java
String foo = "foo"
String bar = "bar"

val result = foo.equals(bar);
```

- Kotlin
``` Kotlin
val foo = "foo"
val bar = "bar"

val result = foo == bar
```

### package-level functions
- 자바의 static 메서드 대체
- Kotlin
``` Kotlin
package com.sample.package.other

import com.sample.package.foo

fun other {
  foo()
}
```

## 사용 단계

### Kotlin Android Extensions
- findViewById() 대체

### 람다식 지원
- 코드의 양을 많이 줄일 수 있다.

### stream-like api 지원

### mutable / immutable
- val(valiable) & var(value, Java의 final)

## Deep dive

### 컬렉션 생성
- List
```
listOf<String>()
listOf("Seoul", "Busan")
mutableListOf("Seoul", "Busan")
```
- Set
- Pair

### data class
- Kotlin
``` Kotiln
data class Person(val name: String, val address: String)
```

### Extension Function
- 기존의 클래스에 새로운 함수를 확장해서 쓰는 기능
- Kotiln
``` Kotlin
fun Context.toast(message: String) {
  Toast.makeText(this.context, message, Toast.LENGTH_TOAST).show();
}

// Context를 상속받은 모든 클래스에서 사용이 가능함
toast("Message");
```

# 코틀린 도십 시 유의해야 할 사항들
- 코틀린의 새로운 문법에 얽매일 필요는 없다
  - 상황에 따라 코틀린 문법이 불필요한 경우도 있음
- 빌드 툴과의 호환성 확인 필요(Android Studio, build tools)
- Java와 혼용시 예상치 못한 문제가 발생할 수 있음
- 이슈트래커 [Link](https://youtrack.jetbrains.com/issues/KT)
- Method count of stdlib package = 약 6000개
  - Android 개발시 multidex 문제에 유의

# 코틀린 도입 후 달라진 것들
- Nullability, mutable / immutable
  - NPE 현저히 감소, 코드의 명확성 및 안정성 향상
- LOC 감소
  - 코드 라인이 줄어 들어, 코드 리뷰시 중요한 부분에 집중하기 쉬워짐
- Morden Language에 익숙해짐
  - swift, scala 등

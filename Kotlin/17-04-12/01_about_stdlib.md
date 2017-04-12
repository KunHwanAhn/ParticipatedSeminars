# About Standard Kotlin Libraries
- 허재위

> NOTE: Kotlin에 대한 기본적이 지식을 필요함. ~~그래서 이해 못했음..~~

# Array

## Init
```
val array = arrayOf(1,2,"hello");
```

## equals
- Java처럼 `=`연산자는 Object Refrence 비교, 따라서 원하는 결과가 아님.
- array.contentDeepEquals: 2차원 배열이라도 비교가 가능함.

## distinct
- ?

## Primitive type arrays
- booleanArrayOf()
- byteArrayOf()
- charArrayOf()
- ...
- type별 ArrayOf()

### Boxing Overhead
- 일정한 타입만을 사용하는 Array일 경우, Type을 명시한 ArrayOf()를 사용하는 것이 이득이다.

# Text

## Regex
```
val html = "http://kotlinlang.org".get()
```

- "string".toRegex()

# Collections(eager) & Sequences(lazy)

## associate
- 아래는 모두 같은 결과를 만들어 낸다.
```
val users = readUsers().users

val m1 = users.associate { it.id to it }
val m2 = users.associateBy(User::id)
val m3 = hashMapOf<Long, User>()
users.associateByTo(m3, User::id)
```

# Reflect

## Filter

# JVM

## Annotaions
- Java와 함께 동작하면서 커스터마이징이 필요한 작업이 있다면, Annotaion을 사용하면 좋다.
- JvmField
- JvmMultifileClass
- JvmName
```
@file:JvmName("Utils")
@file:JvmMultifileClass
```
- JvmOverloads
- JvmStatic

# IO

## fileWalkDirection
```
fun main(args: Array<String>) {
  File("file_path").fileWalkDirection
}
```

## useLines
```
fun main(args: Array<String>) {
  File("file_path").useLines
}
```

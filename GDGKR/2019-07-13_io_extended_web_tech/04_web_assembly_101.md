#  WebAssembly 101
- 이현섭 / GDG WebTech Organizer

# Emscripten
- C/C++을 JavaScript로 컴파일할 수 있또록 도와주는 SDK
- 구체적으로는 LLVM 바이트코드를 JavaScript로 컴파일
   - 이 JavaScript는 JIT(Just In Time) 컴파일러에 최적화된, 속도가 무척 빠른 코드였음

> C / C++ Code -> Emscripten --compile--> Optimized JavaScript

# asm.js?
- JavaScript에서 고수준 언어 요소들을 뺀다면?
   - 가령 Object, String, Closure 등을 빼고
   - white, if, Number 등 기초적인 요소만 포함하고
   - 동적으로 타입이 바뀌지 않는다고 보장하고
   - 메모리를 직접 제어한다고 보장한다면
   - 거의 C언어와 유사항 JavaScript 코드가 됨
- 이 코드는 Assembly와 유사한 컴퓨팅 방식을 사용가능
- 거의 Native에 준한 성능이 나옴

```JavaScript
function strlen(ptr) {
  ptr = ptr | 0;
  var curr = 0;
  curr = ptr;
  while ((MEM8[curr] | 0) !== 0) {
    curr = (curr + 1) | 0;
  }
  return (curr - ptr) | 0;
}
```

# 차라리 이럴거면
- 사실상 JavaScript를 어셈블리, 혹은 기계어로 쓰는 셈인데,
- 그냥 브라우저에서 쓰일 어셈블리어를 정의하면 어떰?
- Thread와 Shared Memory를 추가하고! => WebAssembly

# WebAssembly
- 어셈블리어: 기계어와 일대일 대응되는 명령어의 집합
- `WebAssembly` is a binary instruction format

> C / C++ Code -> Emscripten --compile--> WebAssembly Binary

## C Origin
```C
#include <stdio.h>

int main() {
  printf("Hello world!\n");
  return 0;
}
```

## Result
- WAT, WebAssembly Text Type

# Why do we need WebAssembly?
- Fast: Native에 준한 속도
   - Image / Video Editting
   - Gaming
- Reusability: 기존 C/C++ 코드 베이스를 재사용 가능
   - Image Compression Algorithm

# Use Case: squoosh.app
- https://squoosh.app
- https://github.com/GoogleChromeLabs/squoosh
- Image Compression Web App
- Preact
- Compression Algorithm in C++ (.cpp)
- Resizing / Rotating Algorithm Rust(.rs)
- WebAssembly

> Rust Code -> Rust Compiler & C / C++ Code -> Emscripten --compile--> WebAssembly Binary

# Use Case: wasmboy
- https://github.com/torch2424/wasmboy
- Gameboy Emulator App
- Written in TypeSfcript
- Powered by AssemblyScript

## AssemblyScript?
- WebAssembly로 컴파일 되는 TyleScript Subset
- Binaryen 사용
   - Compiler, Toolchain Library for WebAssembly

### Differences with TypeScript
- 제한된 타입 사용
   - any, undefined 사용 불가능
   - Union Type 사용 불가능
   - i32, f32등 WebAssembly Type 사용
- No Type Assertion
   - 대신 Type Casting으로 Transform
   - `num as i32` 같은 구문은 `i32(num)`으로 변경됨
- Standard Library 사용 시 다른 동작

> TypeScript Code -> AssemblyScript --compile--> WebAssembly Binary

# What would com next?
- Thread / Shared Memory Support
- ECMASvript Module Integration
- Garbage Collection
- And even more language support!

> Language Support: https://github.com/appcypher/awesome-wasm-langs

# WebAssembly는 만능이 아닙니다.
- JavaScript와 비교하더라도 항상 빠르지는 않음
- 다만, 훨씬 일관적인 성능을 보장
- 가벼운 작업을 하는데 굳이 WebAssembly를 쓸 필요는 없음
   - DOM API, 동적인 View 작업..
- Gaming, 무거운 알고리즘에 유용

# 생각해볼 질문
- WebAssembly는 왜 생겼나요?
   - 성능에 대한 집착과 기술 성숙도의 참으로 시의적절한 융합
- WebAssembly를 쓰려면 C/C++을 배워야 하나요?
   - 아뇨! TypeScript가 이미 지원하고, 다양한 언어 지원 예정
- WebAssembly는 JavaScript를 대체할 수 있나요?
   - Do the right thing! 상황에 맞게 잘 판단! 알맞는 도구를 알맞는 장소에!

# 유용한 페이지들
- https://codelabs.developers.google.com/codelabs/web-assembly-intro/index.html#0
- https://rustwasm.github.io/docs/book/
- https://webassembly.studio/

# Reference
- http://ujinbot.blogsopt.com/2013/07

# Modern WebAssembly
- 지미문, 프로토파이 & GDE
- [발표자료](https://speakerdeck.com/ragingwind/recap-modern-webassembly-in-cds-2019)

# WebAssembly?
- [WebAssembly 101 참조](https://github.com/KunHwanAhn/ParticipatedSeminars/blob/develop/GDGKR/2019-07-13_io_extended_web_tech/04_web_assembly_101.md)
- 웹에서 동작하는 새로운 언어
- 다른 언어로부터 컴파일
- 최적화되고 일관성 있는 성능
- 자바스크립트를 **대체하지 않음!**

## 웹에서 동작하는 새로운 언어
- Chrome, Edge, Firefox, **Safari** love WebAssembly

## 다른 언어로부터 컴파일
- https://mbebenita.github.io/WasmExplorer/
- https://hacks.mozilla.org/2017/07/memory-in-webassembly-and-why-its-safer-than-you-think

## 최적화되고 일관성 있는 성능
- https://www.youtube.com/watch?v=njt-Qzw0mVY
- WASM -> Liftoff(WebAssembly base line compiler) -> Result
- WASM -> Liftoff(WebAssembly base line compiler) -> TurboFan(Optimization Compiler) -> Result Hot Swap
   - 중간 중간 TurboFan에 의해서 최적화한 코드를 Hot Swap 함.

## 자바스크립트를 **대체하지 않음!**

> https://webassembly.studio/

# WebAssembly at Dev Summit 2019
- https://www.youtube.com/watch?v=kZrl91SPSpc
- Implicit Caching
- Thread
   - Chrome Canary 한정 (2019-11 기준)
   - Sample code - https://github.com/ragingwind/wasm-hello-world
   - https://medium.com/google-earth/performance-of-web-assembly-a-thread-on-threading-54f62fd50cf7
- SIMD - Single Instruction, Multiple Data
   - https://github.com/google/mediapipe
- Tooling Update
- Native LLVM Backend
- Asyncify
- WAT Debugging on Chrome Dev Tools
   - Sourcemap, Native Debugging

> https://wasi.dev - 브라우저를 벗어난 WASM

> bytecode allience

> https://hacks.mozilla.org/2019/08/webassembly-interface-types/

# 엣지 컴퓨팅 - 프론트엔드 포텐셜 (다시) 끌어올리기
- [Youtube](https://youtu.be/jZNk-Ncez6E?t=15588)

## 시작하기 전에,
- **Front-end**가 정확히 뭐죠?
- 반댓말은? **Back-end**?
- **Client** & **Server**?

> Client <---Request/Response---> Server

> 서버 개발을 하는 이유? 제품을 개선하고 더 확장하기 위해서!

## Edge Computing?
- from a front-end dev perspective
- [Stanford Seminar - The Future of Edge Computing from an International Perspective](https://www.youtube.com/watch?v=Hhobq4fs87w)
- 프론트엔드 개발자가 가질 수 있는 강력한 무기 중 하나

### Edge Computed 플랫폼 서비스들
- Vercel Edge Middleware & Functions
- Netlify Edge Handlers & Functions
- AWS Lambda@Edge
- Akamai EdgeWorkers
- Fastly Compute@Edge
- Cloudflare Workers
- 등등...

> 엣지 컴퓨팅이란, 컴퓨팅 작업을 가능한 엔드유저와 가까운 곳에서 수행하는 것을 말합니다

## Before the Edge

### CGI
- Common Gateway Interface
- Web users -> HTTP -> CGI(Gateway Program <-> CGI <-> Web Server)

> 모든 문제는 추가적인 간접(추상)화 도입으로 해결할 수 있습니다
> 복잡성을 해결하려면 하나의 레이어를 추가해라

### 엣지 솔루션 = 컨텐츠 캐싱
- 물류 창고(DC)가 너무 멀어서 배송시간(Latency)이 길어진다면, 가까운 곳에(Edge Location)에 하나 더 짓는다. => CDN (Content Delivery Network)

### Advanced Netowrking
- 흔한 웹 서버
   - Handling HTTP-specific
   - Static assets serving
   - Caching
   - Access logging
   - Basic access control
   - Request limiting
   - Load balancing
   - ...
- 네트워크(L4) 관심사인가? => 네트워크는 애플리케이션으로 간주해도 무방하다

## Road to Edge Computing

### Limit 1. Cache Efficiancy
- 캐시 효율성
- CDN은 대부분 정적 파일에 대해서만 지원해왔음
- 일관성이 중요하지 않음

### Limit 2. Global
- 구축 비용. 전세계 서버, 해저 케이블, 중개 서버 등

### Limit 3. Security
- JavaScript에서 eval()을 사용하는 것과 같은 느낌.
- 언제 어디서 이 코드가 실행될지 모르는 두려움

## 거인의 어깨 위에서
- 프로그래밍 모델의 진화
   - 구조적 동시성 (Structured Concurrency)
   - 컨테이너 기술 / 격리 기술 (Containers / Isolation)
   - Web APIs

### 발전한 프로그래밍 모델
- React - Suspense
```jsx
<Suspense fallback="loading from client...">
  <Client>
    <Suspence fallback="loading from network...">
      <Network>
        <Suspence fallback="loading from origin...">
          <Server />
        </Suspence>
      </Network>
    </Suspence>
  </Client>
</Suspense>
```

### 발전한 가상화 기술
- Docker
- Firecracker
   - AWS Lambda의 컨테이너 기술
- Micro-VM
   - v8의 격리 기술 - 탭간 간섭을 막아놓음

### Web APIs
- Web security model
- Service worker
- Fetch API
- Cache API

## 서버리스?
- `엣지 컴퓨팅` === `서버리스 컴퓨팅`?
- 반은 맞고 반은 틀렸다고 생각한다
- 기존의 서버리스 + 더 빠르고 가까운 곳에서 실행되는 곳 => 새로운 변화의 바람

## 현실 세계의 엣지 컴퓨팅

### AWS
- AWS Lambda
- AWS Lambda@Edge?
- AWS CloudFront Functions??

### Cloudflare
- R2
   - Region - Earth만 있음

## 엣지 컴퓨팅의 활용 사례
- 프론트엔드 개발과는 어떤 연관이?

### BFF
- Backend For Frontend
- Edge 서버에 GraphQL 서버를 운용, 클라이언트 코드 감소 => 유저가 받아야 하는 코드의 양도 감소

### Advanced Cache
- 특정 파일에 대한 캐시를 더 복잡한 규칙을 기반으로 하는 규칙을 직접 제어
- e.g. Service Worker Cache API

### Edge Middleware
- [103 Early Hints Worker](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103)
- 웹페이지가 갖고 있는 Assets 중에 서버가 빠르게 전달하면 좋을만한 것들에 대한 힌트를 전달하기 위한 상태

### Others
- OpenGraph API on the Edge
- Image Resizing
- Edge Storages
- AI Models / Hardwares

## 다가오는 미래?

### WinterCG
- [Web-interoperable Runtimes Community Group](https://wintercg.org/)
- [위치 투명성 (Location transparency)](https://en.wikipedia.org/wiki/Location_transparency)

### Open Sources
- [Edge Runtime](https://vercel.com/blog/introducing-the-edge-runtime) by Vercel
- [Roll you own JavaScript runtime](https://deno.com/blog/roll-your-own-javascript-runtime) by Deno

### WebAssembly
- Wasmtime
- Wasmer
- Lunatic
- WasmEdge

### CGI? WASI!
- WASI (WebAssembly System Interface)

### 미래를 대비하는 자세
- Keep eyes on **WebAssembly** & **JavaScript**
- **Zero-trust** security model
   - 보안 관점에서 Access Control이 중요해진다
- Always bet on **Web**

# 웹에 빠른 날개를 달아주는 웹 성능 향상 이야기
- 강상진

## 인터넷 속도의 향상
- 전세계적으로 다운로드 속도가 빨라지고 있다
- 우리나라는 거의 Top 3 안에 들어갈 정도로 빠르다

## 웹의 무게도 지속적으로 증가
- 2012: 803 KB
- 2014: 1,850 KB
- 2022: 2,284 KB

> 빠른 인터넷 속도 !== 빠른 웹

## 빠른 웹이 중요한 이유
- 월마트의 경우
   - 로딩 속도가 1초에서 4초로 늘어나면 Conversion Rate(구매율)가 급격하게 떨어진다
   - 1초가 빨라질 수록 Conversion Rate(구매율)가 구매율이 늘어난다
- Web Performance Impacts
   - Traffic
   - Conversions
   - User Experience
   - Brand Awareness

## 웹 성능 측정 방법
- Google Core Web Vitals (CrUX)
   - LCP (Largest Contentful Paint): 2.5s 이하
   - FID (First Input Delay): 100ms 이하
   - CLS (Cumulative Layout Shift): 0.1 이하
- Google Lighthouse
- Chrome Dev Tools
   - Network waterfall chart
   - Performance Profiling
   - Script Coverage: 사용하지 않는 부분을 포함한 스크립트 커버리지를 볼 수 있음
- https://webpagetest.org

## 어느 구간을 개선할 것인가?
- 백엔드 시간
   - DNS Time
   - TCP 연결
   - TLS 연결
   - TTFB
- 프론트엔드 시간
   - Download
   - Rendering
- 실제 사용자가 웹페이지를 볼 수 있도록 컨테츠들을 로딩하는데 걸리는 시간
- DOM Loading Time / DOM Rendering
- ??
- ??
- FCP -> LCP -> PLT(Page Loading Time)

## 측정 분석의 시작
- RUM
- Synthetic Meta

## 웹 사이트 성능 측정
- 웹 성능 지표
- 비즈니스 지표: Bounce Rate, Add to cart, completeed sessions
- 특정 페이지 그룹이 느림
- 트래픽이 높은 페이지 파악
- 성능 KPI는 무엇으로?

## 기본적인 네가지 최적화
- 요청과 응답이 적어야 한다 - less round-trip
- 작은 번들 사이즈 - smaller size
- 최대한 캐싱 - chache as much as posissble
- 사용자 환경에 최적화된 컨텐츠 - optimize

### 스크립트 최적화
- brotli 압축, gzip 보다 우수한 압축

### 이미지 최적화
- 불필요한 메타데이터 제거
- JPG -> AVIF 변환
   - AVIF 최적의 이미지 형식

### 전송 최적화
- 전달 구반 전반에서 캐싱(Caching) 활용
- API 결과에 대한 CDN 캐싱
   - 변화가 적은 API에 대해서는
- API 응답 가속
- 웹 폰트 최적화
   - 웹 폰트 이름 지정
   - 불필요한 그립 삭제
      - font squirrel - 중복되는 폰트 그립 제거해줌

# RUM으로 본전 뽑아먹기
- 윤창현님 / 미리디
- [발표자료](https://datadogkrug.vercel.app/assets/20250925/%EC%9C%A4%EC%B0%BD%ED%98%84%20-%20Datadog%20RUM%20%EB%B3%B8%EC%A0%84%20%EB%BD%91%EA%B8%B0%20(With%20APM).pdf)

## Client Side Monitoring RUM
- Next.js, Micro Frontend
- datadogRum.init() -> beforeSend(event, context)
- 애플리케이션 > 서비스
  - 세션을 이어서 사용할 수 있음
  - 샘플레이트를 낮게 잡은 경우에는 끊어질 수 있음
  - DD_RUM 변수가 글로벌로 있음
- RUM을 사용하는 이유?
  - 에러 트래킹

## RUM Session Conditional Activation

### RUM Session
- `최대 4시간 세션 유지`
- 유저가 4시간 1초 사용했따면 2개의 세션으로 인식
- 5시간을 이용했다면 마지막 1시간은 세션이 안잡일 수도 있음
- 4시간 유지가 아닌 세션이 시작된 시간으로부터 4시간 기준

> 이 부분에 접속하는 세션은 100% 다 보고 싶은데...

> 이벤트로 인해 갑자기 유저가 많이 들어와서 RUM 예산을 초과할 것 같아

- AWS 파라미터 스토어 사용
- Next.js의 API Route로 사용할수도 있음
  - SSR 서버 상태에서 API를 호출해서 메모리상에서 Config를 가져와서 내려주는 방향

## Sourcemap Upload
- .next 안의 static 뿐만 아니라, server까지 올리면 서버쪽 APM에서도 소스맵을 볼 수 있음

## Browser Profiling
- 데이터독 내 long task 필터링
- 브라우저 프로파일링 설정을 켜면 더 디테일한 것을 볼 수 있음
- Correlate RUM and Profiling
  - 현재 프리뷰 상황이라 신청해야 함
  - Browser SDK 6.12 이상이어야 함
- CDN을 사용해서 도메인이 다르다면, 응답 헤더에 주입해줘야 할 수 있음

## Server Side Monitoring by APM
- Next.js APM
- instrumentation.ts

## Dashboard for Frontend Monitoring
- RUM 메트릭 & APM 메트릭

> Datadog은 모두가 쓸줄 알아야한다.

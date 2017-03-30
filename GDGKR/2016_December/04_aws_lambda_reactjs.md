# AWS Lambda + ReactJS
- 신미르 / Vingle

## 머나먼 과거의 서버
- Web Server === Desktop Server === Mobile Web
- 해괴한 문법(ruby slim + Angular1 템플릿)
- 서버와의 극심한 커플링

## 과거
- Web Server(API Server)
  - S3 static page
  - AWS CloudFront(CDN)

## 현재
- 마이크로 서비스 지향
- Web Server(API Server)
  - AWS Lambda(with Serverless Framework)
  - AWS S3 - CDN(client-side JS)
- Universal rendering으로 초기 렌더링 속도, SEO, meta tag관리 모두 달성

## Universal rendering 후기
- 생각보다 개발공수가 많이 들어간다 (어렵기보다는 복잡한)
- 서버에서 실해오디는 코드와 브라우저에서 실행되는 코드를 철저하게 분리해서 생각해야 함
- bundle target이 무엇인가에 따라서 다르게 실행되는 라이브러리들 때문에 결국에는 이원하함
- SEO 혹은 외ㅜ 사이트와의 컨텐츠 공유가 중요하지 않은 서비스라면 굳이 사용할 필요는 없는 듯

## 팁
- 타입스크립트 좋아요, 정말 좋아요
- API Gateway의 stage variables나 `Lambda 자체의 Environment variables`를 적극 활용
- Lambda Container는 한 번 활성화되면 일정시간동안 살아있으며, `mem-cache를 구현해놓으면 API콜을 더 아낄 수 있다`.
- Serverless Framework 좋습니다. 특히 Cloud Formation을 제대로 구성해놓으면 한번에 Lambda - API gateway - CloudFront - DynamoDB까지 전부 커버 가능
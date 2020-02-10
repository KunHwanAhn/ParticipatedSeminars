# Static Web Hosting with AWS
- 박찬민, Frontend Developer @버드뷰(화해)

# 웹 사이트를 만드는 대략적인 순서
- 웹 사이트를 만든다. - FE 개발자가 잘하는 것
- 서버를 만든다. - FE 개발자가 잘모르는 것
- 서버에 웹서버를 설치한다. - FE 개발자가 잘모르는 것
- 도메인을 연결한다. - FE 개발자가 잘모르는 것

# 웹 서버를 만든다는 것

## 서버를 만든다
- 어디에 만들지?
- 어느정도 성능이 필요하지?
- 서버 비용은 얼마나 들어가는 걸까?
## 서버에 웹서버를 설치한다.
- 톰캣? Express? Nginx?
- 안정적인 웹서버를 만들려면 이중화도 해야 하나?

# With AWS
- S3에 파일들을 올리고 정적 웹 호스팅 기능을 켜준다!
- S3 & Route53 & CloudFront

## HTTPS 지원?
- CloudFront & AWS ACM으로 HTTPS 인증서 무료로 사용 가능!
- S3 버킷 이름이 도메인 형식이면 안됨!
- ACM(AWS Certificate Manager)에서 인증서 생성! 무료!!
   - 단, 버지니아 리전에서 생성해야 CloudFront에서 찾을 수 있음!
- S3와 CloudFront를 연결
- Route53에서 별징을 S3로 하지 않고 CloudFront로 설정

## CloudFront 설정
- Origin Domain Name: S3의 웹 호스팅 기능에서 할당된 도메인 직접 입력
- Viewer Protocol Policy: Rdirect HTTP to HTTPS
- Alternate Domain Names: 사용할 도메인 주소
- SSL Certificate: ACM에서 생성한 인증서 선태ㅔㄱ
- Default Root Object: index.html

## 새로운 빌드를 배포하려면?
- S3에 새로운 빌드파일 업로드
- 하지만 업로드 직후에 CloudFront에는 아직 예전 빌드파일이 남아 있음
- CloudFront에서 새로운 빌드 파일을 가져가게 하려면?
- CloudFront의 Invalidation 기능을 이용! 기존에 저장한 파일을 삭제함!

## S3기반의 웹 호스팅 장점
- 서버 관리 불필요
   - 서버를 프로비저닝하거나, 유지 관리할 필요가 없습니다. 설치, 유지 또는 관리할 소프트웨어나 런타임이 없습니다.
- 사용량만큼 지불
   - 서버 단위가 사용량에 대해 지불합니다.
- 자동화된 고가용성
   - S3는 99.99%의 가용성과 99.999999999%의 내구성을 보장하고 있다.

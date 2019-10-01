# Spring Boot & eXtreme Programming
- MSA Service Meetup
- 설문조사 - https://ko.surveymonkey.com/r/7PTGBZP

# 요 근래 언급하는 주제들
- Agile
- Lean
- 12 factor
- Cloud Native
- DevOps
- Micro Service
- CI / CD

# Spring Projects
- https://spring.io
- Spring Framework
- Spring Boot
- Spring Cloud
- Spring Data Flow

# Spring Boot
- 스프링의 기본 설정값 변경을 쉽고 편리하게 제공
- 강화된 CoC (Convention over Configuiration), XML 없음, 코드 생성 없음, 자동 설정
- 독립 실행 가능한 JAR 페키징
- 자동설정 앱서버를 임베드
- 클라우드 파운드리를 위한 자동 설정
- 실 운영을 위한 스위치를 제공
- [start.spring.io](https://start.spring.io/)를 사용한 프로젝트 생성
- 자바, 스프링, 그루비, 코틀린

## 12-Factor App Support
- Easy to understancd sturcture
- No unpacking or start scripts required
- Typical REST App ~10Mb
- Cloud Foundry Friendly
  - fast to upload
  - ???

## Spring Initializer
- 현존하는 대부분의 IDE에 포함되어 즉시 새로운 프로젝트를 생성 가능
- 스프링의 다양한 프로젝트 사용가능
- 스프링 프레임워크 코어 이외에도 리액티브 웹, 다양한 NoSQL, AWS, MS Azure, Google GCP 지원

# eXtreme Programming
- [eXtreme Programming - wiki](https://en.wikipedia.org/wiki/Extreme_programming)
- The five values of XP are commuication, simplicty, feedback, courage and respect and are described in more detail below

## Communication
- Face to face discussion with the aid of a white borad or other drawing mecanism.

## Simplicity
- 간소화
- What is the simplest thing that will work?
- Don't try to predict the future

## Feedback
- 회고를 통한 활발한 피드백

## Courage
- Effective action in the face of fear
- 테스트 코드를 작성함으로 자신있게 배포 및 수정할 수 있는..

## Respect
- Provide and acept feedback
- 이타심이 중요!

# XP Practices
- **TDD**
- **Pair Programming**
- **Refactoring**
- **Simple Design**
- The Planning Game
- Small Releases
- Metaphor
- etc...

> 업데이트에 무슨 문제가 발생할지 모름...

> 팀에 속해 있지만 개발은 결국 혼자

```
10 lines of code = 10 issues

500 lines of code = looks fine

Code Reivews

- I Am Devloper - Twitter / https://twitter.com/iamdevloper/status/397664295875805184
```

## Trusted & Balanced Team
- 풀스택 개발자는 없지만, 풀스택 팀은 있다.
- Product manager
- Engineer
- ???
- ???

## 핑-퐁 페어
- 핑퐁 페어는 멤버간 키보드 점유 순서를 돌아가며 작업하는 것
- Member A writes a test and ensures it fails are expected
- Member B fixes the test and writes the next failing test
- Member A fixes the test and writes the next failing test
- Repeat

# TDD in Pivotal
- TDD에서의 테스트에 대한 피보탈의 정의는?
   - 코드 동작의 실행 가능한 설명
   - 코드가 어떻게 동작해야 하는지에 대한 설명

- TDD에서 프로덕션 코드에 대한 피보탈의 정의는?
   - 특정 시점에서 모든 테스트를 만족한 코드
   - 테스트들을 충분히 통과한 코드

## Why TDD?
- **오버엔지니어링을 피하기 위해**
- **테스트 불가능한 코드 작성을 원천 봉쇄**
- **오브젝트 인터페이스를 고려하도록 강제**
- etc...

## 왜 테스트를 나중에 작성하지 않는가?
- 그런 방식은 동작하지 않기 때문
   - 지루하고
   - 언제 끝날지 도무지 알 수 가 없으며
   - 일반적으로 많은 테스트 케이스를 놓치게 되며 이로 인해 매우 불량한 커버리지를 가진 상태가 되기 떄문에: 작성한 코드는 테스트를 가져야함

```
"변화하는 환경에 적응하도록 코드를 작성하라"
"즉, 미래에 변경이 쉽도록 코드를 작성해야 한다"
"한줄의 추가 코드는 한줄의 추가 메인터넌스"
```

# 예제 저장소
- Demo Repo: https://github.com/hshin-pivotal/pivotal-bank-demo-kr
- Origin: https://github.com/Pivotal-Field-Engineering/pivotal-bank-demo

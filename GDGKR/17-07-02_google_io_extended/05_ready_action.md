# Ready~ Action!
- 이원제, 레진엔터테인먼트
- [발표자료](https://www.slideshare.net/nurinamu/ready-action-on-google-77449452)
- Let's make Google Assistant actions on Google

> Mobile first to AI first at #madebygoogle 2016 10

## Mobile First
- 모바일 사용자의 확대
  - 멀티터치, 카메라 등을 이용한 서비스들의 사용자 경험의 변화
  - 인증, 결제 등의 새로운 사용자 경험의 탄생

## A.I. First
- 모든 서비스에 대한 ML적용
- AI를 이용한 사용자의 요구사항 해결

> Google.ai

## A.I.? 인공지능!
- 인지
  - 음성인식, 영상인식
- 이해 / 판단
  - 자연어처리, 사물인식 영상인식
- 학습
  - 기계 학습, 강화 학습, 설명 기반 학습, 유추에 의한 학습, 지도 학습, 비지도 학습

### 인지
- Google Voice Search
- Face Detection

### 이해 / 판단

#### N.L.P. Natural Language Processing

#### 사물 인식
- Google Lens

### 학습
- TensorFLow

## Google Assistant
- 인공지능 기능을 제공
  - 음성/문자 인식, 자연어처리, 학습
- Assistant SDK
  - Google Home에서만 가능했던 Assistant기능을 다른 기기로 확장
- 진화중
  - 아직 한국어는 미지원

### Vision
- IoT 장비들이 사람들과 대화를 통해서 Needs를 해결하는 것을 꿈꾼다.

> [Make Your Own AI](https://aiyprojects.withgoogle.com/voice)

> Google Assistant SDK는 IoT, 3rd Party를 위한 것

## [Actions on Google](https://developers.google.com/actions/)
- What?
  - Gogole Assistant에서 수행될 동작을 만드는 것
- How?
  - Assistant SDK 사용
- ???
  - ???

### Actions

#### Intents
- 사용자의 의도
  - Action은 사용자의 입력을 자연어 처리 후 가장 적합한 실행 조건을 가진 Intent를 수행한다.
- Entity 추출
  - Intent가 선택되면
- Fulfillment 연결

##### Fulfillment
- Webhook 실행
- 5초 타임아웃, 64K 제한
- SlotFilling
  - Required Parameter를 Webhook을 통해 채울 수 있는 기능

### [Api.ai](https://api.ai/)
- Action을 설계하고 만들 수 있는 대화형 플랫폼
- 쉬운 사용
- Action의 실시간 테스트

#### 과정
- App 생성
- Intent 등록
- Entity 등록
- Integration
- Test
- App 등록
  - Google의 검수를 통과해야지만 Google Home에 등록이 가능

#### Conversation의 설계
- 같은 App이더라도 사용자의 요구나 반응이 달라질 수 있음
- 다양한 응답방법을 통해서 사용자의 다음 동작을 유도하는 설계가 필요

### Transaction API
- Purchase / Reservation / Appintment
- 아직은 Preview 단계, 권한 요청이 필요함.

### App 만들면서 고려가 필요한 부분
- Query 단어의 정의
  - 발음의 차이로 인한 인식률이 떨어지는 단어(비슷한 음의 다른 단어)를 피해야 한다
- 빨리 등록하자
  - 단어를 선점하면 사용할 수 없게 된다.
- UX 고민

> 앞으로 A.I.와의 음성 대화가 주를 이룰 것이기에, 이제 UX의 진입점은 수십억 사용자의 발음이며, 누구던지 쉽게 발음할 수 있는 단어를 조합이 필요함.

### A.I. Wars
- Google Assistant, Amazon Alexa, Apple Siri, Samsung Bixby
- 한국어는 누가 잘하나?
- IBM Watson, MS Zo
  - 아직 서비스 전

# 구글의 머신러닝 비전: TPU부터 모바일까지
- 신정규, Lablup Inc, GDE(Google Developer Expert) for Machine
- [발표자료](https://www.slideshare.net/inureyes/tpu-google-io-extended-seoul-2017)

> 2017 Google I/O의 전체적인 주제는 머신러닝으로 Google 무엇을 했으며, 무엇을 할 것인가를 말하는 자리같았다.

## 구글의 머신러닝
- Google Search
- Google Android
- Google Gmail
- Google Chrome
- Google Drive
- Google YouTube
- 등 거의 대부분의 제품에 적용

### 음성인식
- 단어 인식 오류율
  - 2016년 7월 8.5%
  - 2017년 4.9%

### Google Home
- 말하는 사람에 따라서 사람별론 Context를 처리하고, 개별적으로 관리가 가능해짐

### Google Vision API
- 사진의 물체만 판독하는 것이 아니라, 행동까지 분석하여 추론할 수 있는 기술까지

### 이미지 인식

## Software / Infrastructure
- Google 다루는 H/W & S/W

### H/W
- CPU, GPU를 넘어 Cloud TPU
- iOS, Android, Android Things

### TensorFlow
- 6주마다 새로 Release
- 2015년 12월 이후 17,500 이상의 커밋
- 상당한 양의 외부 커밋
- 6,400개 이상의 TensorFlow관련 저장소

#### 현재 제공해주는 것
- 완전한 모델 프로토타이핑
- 분산 훈련 지원
- CPU / GPU / TPU / 모바일 환경 지원

#### Keras API
- 추상화를 통한 고급 프로그래밍 API
  - tf.keras

> Deep learing accessible to everyone

#### TensorFlow Serving
- 텐서플로 모델 추론 서비스를 쉽게 해주는 도구

##### C++ 라이브러리
- TensorFlow 모델 저장 / 내보내기 포맷: protocol buffer
  - protocol buffer? Google에서 만든 또 다른 Project
- 일반 코어 플랫폼

##### 바이너리
- 바로쓸 수 있는 예제 포함
- Docker 컨테이너, k8s 예제 제공

##### 호스팅 서비스
- Google Cloud Platform 제공 예정

#### XLA Compiler
- 다양한 환경 지원 및 속도 향상을 위한 개선
- Java, R을 지원하기 위한 중간 Compiler와 비슷

#### 2세대 TPU

##### 1세대 TPU
- 일반 CPU & GPU보다 15~30배 빠름
- 20~30배 전성비
- 추론과정에 특화 (훈련에 쓰지 않음)

##### 2세대 TPU
- 180테라플롭스의 FP성능
  - 1080 Ti 10테라플롭스
- 64GB의 엄청 높은 대역폭의 메모리
- 훈련 / 추론 모두를 위해 디자인
  - 1세대는 훈련이 불가능했기에 대중에 공개하지 않았음

##### 1TPU Pod
- 64 2nd-gen TPUs
- 11.5 Petaflops
- 4TB memory
- 2D torodial mesh network

### TensorFlow 연구 클라우드
- TPU 제공!

### S/W

#### Android O와 TensorFlow

##### TensorFlow 모바일 보급 활성화 방안
- TensorFlow Lite 내장
- XLA기반의 최적화 제공

##### ML + 모바일 적용예
- 이미지 / 글씨 인식
- 음성 - 텍스트 변환
- 번역
- 자연어 처리
- 동작인식
- GPS
- 기타 등등

> 사람은 3초 동안 반응이 없으면 그 제품을 사용하지 않는다.

##### 더 적은 트래픽 & 빠른 응답
- 머신러닝을 이용해 원시데이터에서 의미를 추출할 수 있음
  - 예, 이미지 인식
    - 원시 이미지를 전송 -> 발견한 레이블 전송

#### 휴대성 및 확장성
- 훈련 환경
  - Mac/Windows

#### 모델 압축
- 그래프 프리징
- 그래프 변환 도구
- 가중치 양자화
- 계산 양자화
- 메모리 매핑

##### 양자화
- 수의 범위를 줄이고, 1번 연산에 여러번의 연산을 할 수 있도록
- FP 16 / FP 10 / FP 8
- TensorFlow Quantize
  - DT_QINT8 / DT_QINT8

#### ANdroid Neural Network API
- 뉴럴넷을 위한 새 API cnrk
- Android Framework에 포함
- 하드웨어 가속기 추상화
  - GPU, DSP, ISP 및 기타 등 다양한 하드웨어를 지원하기 위해
  - 가상 Anroid NN Hardware Layer 추가

#### TensorFlow Lite

#### XLA: Tensor Flow의 선형대수 컴파일러

## Service / Product
- 올해 사용자는 실제로 무엇을 만나게 되나?

> 머신 러닝 자체는 방법론, 실제 소비자에게는 와닿지 않는다.

### Google Lens
- 센서 기반의 위치 정보 서비스
  - 이미지 + 지역 정보 + 추천 검색
  - 실시간으로 현재 위치의 정보 파악
  - 이미지 기반의 POV 정보 추적
  - 추천 기능

#### VPS(Visual Positioning Service)
- NOT GPS
- 예1. 벽에 붙어 있는 WiFi정보를 분석해서 자동으로 Connection
- 예2. 길가에서 가게사진을 찍으면 그 가게에 대한 정보를 알려줌

### Google Home
- 다중 사용자 구분 (신경망 기반의 빔포밍 / 유저 인식 기술)
- 더 많은 도구 및 기기들과의 통합 지원
- 중요한 점
  - Google Home은 Google이 보여준 하나의 예
  - 실제로는 Google Assistant API로 구현이 가능하다는 것을 표현하고자 한 것임.

### Android Things
- 임베디드 및 저스펙 환경을 위한 안드로이드 배포판
- H/W 프로토타이핑 업체 제유
  - Adafruit
  - Sparkfun Project Kit
- 개발킷, BSP 등 제공
  - Intel Edison
  - NXP Pico
  - Raspberry Pi 3

### Google Assistant API

#### Hotword 라이브러리
- Hotword
- 타이머
- 알람

#### 하드웨어
- Raspberry Pi 3
- 하나 또는 두개의 마이크
- 스피커
  - 인터넷 연결

#### gRPC API
- 클라이언트/서버 API RPC 콜
  - TCP/IP가 되면 지원
- 거의 모든 플랫폼에서 실행됨
- 오픈소스 샘플코드 제공
  - 플랫폼: Linux, macOS, Windows, Anroid, iOS
  - 언어: C/C++, C#, Go, Python, Java

> [Make Your Own AI](https://aiyprojects.withgoogle.com/voice)

#### 공개 예정 기능
- 개선된 음성 기반 기기 제어

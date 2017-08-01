# Android Things
- 차영호
- [발표자료](https://docs.google.com/presentation/d/11YmOBjMqFTz74lylxqR2agTpfI0RY1D5qi67fNhuOCI/edit#slide=id.p)

## Android Types
- Android Phone
- Android Watch
- Android Auto
- `Android Things`

## 어디에 적용이 가능한가?
- Ideal for powerful, intelligent devices on the edge that need to be secure
- Camera
- POS(Point of Sale)
- Security Syatem
- 자동차 부가 기능

## IoT(Internet of Things)?
- 단순히 인터넷에 접속이 가능한 기기가 아니다.

## Android Things
- SoM(System on Module) Architecture
  - Intel, NSP, Raspberry Pi
- Google Managed BSP(Board Support Package)
  - Google에서 제공하는 환경 위에서 개발자는 개발만!
  - Low level H/W제어는 OS에 맡기고!

### Supported H/W
- Raspberry Pi
- Intel (재품군 단종 예정)
- NSP Boards: Pico

### Android Things Structure

#### Managed by Google
- Linux Kernel
- Hardware Libraries
- Android Framework
  - 단, 몇몇 IoT 장비에 필요 없는 키보드, System UI등과 같은 기능 들은 제외

#### Managed by Developers
- User Drivers
- Apps

### 장점
- Google에서 관리하기에 보안 패치 등 OS관렝서 필요한 부분을 손쉽게 해결이 가능
- Android를 개발해왔다면 그 개발환경 그대로 사용할 수 있음
  - Android SDK
  - Android Studio from v3.0
  - Play Services
  - Firebase
  - Cloud Platform

### 주의할 점
- Display는 있을수도, 없을수도 있음
  - 따라서, 다른 UI(마이크, 방향키 등)에 대한 고려가 필요함
- Android 7.0부터 지원
  - Runtime Permission은 제거되어 있으므로, 예전처럼 Static한 권한관리를 해야 함.
- `android.intent.category.IOT_LAUNCHER`
  - System Boot 후에 자동으로 실행하기 위해서 필요

### Peripheral I/O
- 다양한 시리얼포트 통신을 `Java Library를 사용하여 제어`가 가능함
  - GPIO
  - PWM
  - I2c
  - etc...

### User Drivers
- 추상화된 API를 사용하여 제어가 가능함
  - Input
  - Sensors
  - GPS
  - Audio

### Peripheral Driver Library
- 유명한 제조사들이 제공하는 Library들 역시 사용할 수 있음
  - Pre-built Libraries at Jcenter

## In a nutshell
- H/W & OS관리는 Google이 알아서 해줄테니 개발에만 집중해라
- The Power of Android
- Managed by Google
- Automatic and Secure

## ETC
- [IoT Developer Console](https://developers.google.com/weave/guides/apps-tools/developers-console)
- [Google IoT Cloud](https://cloud.google.com/solutions/iot/)
- [Google's IoT Developers Commnunity](https://g.co/iotdev)
- [Google's IoT Solutions](https://iot.google.com)
- [Adnroid Things SDK](https://developer.android.com/things)

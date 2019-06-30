# Flutter를 소개합니다!
- 김석용
- 발표자료 - TBD

# Legacy Cross, Hybrid Platforms
- Adobe PhoneGap
- Cordova
- React Native
- Ionic
- Xamarin
- Eletron
- Hybrid App (with WebView) Android & iOS
- Kotlin/Native
- etc...

# Native App
- My Apps + Platform => App
- My Apps
   - My Code + XML + Java + Kotlin => Android
   - My Code + Obj-C + Swift => iOS
- Platform

# React Native
- My Apps + JS Bridge + Platform
- My Apps: JS
- JS Bridge: Bottle Neck & Performance
- Platform

# Cross Platform?
- 장점: 하나의 코드로 다양한 OS에서 동작 시킬 수 있다.
- 단점: 유저가 갖고 있는 네이티브 경험을 해침

# Flutter
- 2017년 5월 Google에서 발표한 Platform
- Dart 언어: v2.3
- 2018년 12월 v1.0 발표 / 2019-06-30 기준, v1.75

## Fuchsia
- 2016년 8월 Google에서 갑자기 공개한 OS 오픈소스 프로젝트
- Zircon 마이크로 커널 사용

## Flutter 장점
- 화려한 Animation
- Fast Development
- Expressive And Flexible UI
- Natvie performance

## Flutter 구조
- My Apps + Platform => App
- My Apps: Dart + Skia + ???
- Platform

## 하위 호환성
- Android Jelly Bean, v4.1.x
- iOS 8

## Flutter Components
- Design
- Widgets

### Design
- Material: Google 머테리얼 디자인
- Cupertino: iOS의 디자인

### Widgets
- ???
- ???

## Flutter Code Management
- 복잡한 View를 그릴 수록, 따로 모듈화를 자주 해야 한다.

### 왜 위젯을 사용할까?
- 왜 위젯을 사용할까? 더욱 더 간단한 모습, 구조의 고도화가 가능함

## Flutter State
- createState()
- initState()
- build()
- setState(): 동기호출이기에, 비동기 호출은 사용 불가능
- dispose()

# References
- https://github.com/flutter/flutter
- https://itsallwidgets.com
- https://pub.dev
- https://flutter.dev

# Flutter Roadmap
- Beyond Mobile -> Desktop & Web
- https://github.com/AppleEducate/flutter_everywhere

## Flutter Web
- Hummingbird
- Flutter Web Engine이 JS로 변환

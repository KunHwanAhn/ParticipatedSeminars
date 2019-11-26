# 웹기술로 만드는 동영상 편집기
- 장재화, 보이저엑스
- 발표자료 - 미공개

# 목차
- 영상 편집기 Vrew란?
- 도전 과제들
- 결론

# Vrew: 인공지능 영상 편집기
- https://vrew.voyagerx.com/ko/
- FFmpeg
- Electron
   - OS 독립적
   - CSS 디자인 언어
   - 차고 넘치는 예제, 증명된 성능
   - Sandbox 한계 없음

# 도전 과제들
- 불연속구간 재생
- 오디오 버퍼 관리
- 자막 처리
- 기타 문제들...

## 불연속구간 재생

### 사전 지식
- encoding: 압축
- decoding: 압축해제. Raw한 데이터
- frame: 영상의 기본 단위. 대부분 프레임 단위로 압축되어 있음.
- 10분 영상에 필요한 메모리: 1920 * 1080 * 4 * 10 * 60 * 30 = 139GB!!
- 압축된 프레임의 종류: I-frame, P-frame, B-frame
- 프레임들은 이전 프레임에서 위상이 변화된 것에 대한 정보를 다룸. 따라서 I-frame이 나오기 전까지는 이전 프레임을 압축해제해야 함.

### 믿을 구석은 HTML5
- [Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)
- Ad insertion - 광고 삽입
- Adoptive Steaming - 네트워크 상황에 따른 영상 소스 화질 변경
- Time sifhting - 시간 이동
- 하지만 MSE도 원하는 솔루션은 아니었음.

### 개선방법
- video.playbackRate = 1.2 / 영상 재생을 싱크와 맞을 때까지 빠르게...

## 오디오 버퍼 관리
- [Web Audio API](https://developer.mozilla.org/ko/docs/Web/API/Web_Audio_API)
- 44.1Khz 샘플링 기준 10분 오디오에 필요한 메모리: 44100 * 2 * 4 * 10 * 60 = 200MB

## 자막 처리

### 고려요소
- Font
- Color
- Line Break
- Weight
- Postion
- Style

### 개선 전
- ASS format을 참고하여 도전!
- Preview: libjass(DOM) - WOFF Font
- Output: libass(FFmpeg) - TTF Font

### 개선방법
- libjass 코드 수정했지만 여전히..개선이 필요함
- WebAssembly! [JavascriptSubtitlesOctopus](https://github.com/Dador/JavascriptSubtitlesOctopus)

## 기타 문제들...

### Undo / Redo
- [redux undo/redo](https://github.com/omnidan/redux-undo)

### Filter / Transition
- [WebGL](https://developer.mozilla.org/ko/docs/Web/API/WebGL_API)

### Image Upload
- [Movable](https://github.com/daybrush/moveable)

# 결론

## 영상편집기 관점에서의 Web 기술
- 풍부한 라이브러리 생태계 이용 가능.
- WebAssembly로 외부 라이브러리 점점 더 사용 가능.
- HTML5 / CSS3 라는 강력한 표준으로 UX 구현 비용 절감.
- MediaSourcef Extension으로 비디오 편집은 제약이 많이 있음.
- WebAudio로 오디오 제어는 거의 완벽
- WebGL과 GLSL로 하드웨어 가속 받는 실시간 필터 구현 가능

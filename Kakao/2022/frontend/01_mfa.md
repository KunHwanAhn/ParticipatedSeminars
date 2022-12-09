# MFA 누구냐 너: 공통 플랫폼 파트의 MFA 도입기
- [Youtube](https://www.youtube.com/watch?v=_SkngG2RR3Q&t=28s)
- [발표자료](https://speakerdeck.com/kakao/mfa-nugunya-neo-gongtong-peulraespom-pateuyi-mfa-doibgi)

## 목차
- 우리가 겪었던 불편
- MFA가 무엇일까?
- MFA 구현 방법
- 도입 효과 및 해결과제

## 우리가 겪었던 불편
- 규모가 커진 조직에서 겪게되는 프론트엔드 불편
- 중복 개발의 늪
   - 서로 다른 애플리케이션에서 비슷한 UI를 계속 만듦
   - UI만 살짝 다를 뿐 표현하고자 하는 데이터는 동일한 케이스가 발생
- 업무 결합도 증가
   - 하나의 애플리케이션에 대해서 서로 다른 조직이 같이 운영하는 케이스 발생
   - 이로 인해 기획, 개발, 테스트 등의 일정에 대한 조율이 필요함
- 응집도가 높고, 작은 단위의 애플리케이션 개발로 결합도를 낮추자! => MFA(Micro Frontend Architecture)

## MFA가 무엇일까?
- 독립적으로 작동하는 SPA => Micro App
- 조각이 모여 하나의 App => Container App

### MFA 장점
- **응집력** 있는 코드 베이스를 가질 수 있다
   - 분리된 프론트엔드 애플리케이션의 속성에 응집력있는 코드로 유지가 가능하다
- 유지보수, 배포 등 업무의 **분리**
   - 코드 관리, 배포 등 조직 단위로 이루어지는 업무들이 Micro APp 단위로 분리되므로 앱 마다 자율적이고 확장적 개발이 가능하다
- **점진적** 업데이트
   - 각 조직들은 각자 맡은 애플리케이션에 대해 자율적으로 업데이트할 수 있으므로, Container App의 관점에서 점진적 업데이트가 가능하다

## MFA 구현 방법

### MFA를 구현하는 방법 5가지
- Iframe을 통핱 통합
   - Container App에서 Micro App을 iframe방식으로 표출하는 방식
   - 가장 간단하고 확실하지만, Micro <-> Container 앱간 통신에 제약이 있으며, Micro App이 깔끔하게 붙기 힘들다
- Web Component를 통한 Runtime 통합
   - Micro App을 하나의 Custom element로 만들어 Container App에서 Runtime환경에서 Injection하는 방식
   - Micro App Injection 시, 오브젝트 형식의 많은 데이터를 Attribute를 통한 string 타입으로 데이터를 전달해야 하는 불편함이 있음
- NGINX를 통한 Routing
   - NGINX에서 유입된 URL에 따라 표출할 HTML을 결정
   - 단순한 Routing 정도 수준이지만 각 어플리케이션들이 분리되어 개발, 배포되어 있어야 하기 때문에 MFA의 방식 중 하나라고 할 수 있다
   - Micro App을 완전한 조각으로 이용하고 싶었기에 맞지 않았음
- NPM화를 통한 Build time 통합
   - 각각의 Micro App들을 npm화 하여 Container App에서 install하여 이용하는 방식
   - Build time에 조합이 되기 때문에 각 조직간의 배포를 완전히 분리할 순 없다
- Runtime JS, CSS Injection
   - Build된 Micro App의 JS를 Container App에서 Runtime에 다운로드하여 Injection하는 방식
   - 과도한 페이로드 크기가 단점이 될 수 있다.

### Runtime JS, CSS Injection 구현 방식
- Container App에서 Micro App의 manifest.json 요청
```json
{
  "app.css": "/style.css",
  "app.js": "/app.js",
  "app.js.LICENSE.tst": "/app.js.LICENSE.text",
  "index.html": "/index.html"
}
```
- manifest.json 내부의 js와 css파일 요청
- npm 모듈을 사용하여 둘간의 연결 만들기
```TypeScript
// Micro App 기준
export function makeMicroApp({ appName, renderFunction }: IMakeMicroApp) {
  if (!window[appName]) {
    const microApp: MicroAppProps = {
      /**
       Micro App이 Render될 때 실행하는 함수
       index.tsx에서 실행할 로직이 여기서 실행된다
       */
      render: (props: renderProps) => {
        // ...
        renderFunction(props);
      },
      /**
       Micro App이 unmount될 때 실행되며, JS, CSS파일이 아래 cacheTime 이후에 delete된다
       */
      unmount: (containerId: string) => {
        // ...
        unmountComponentAtNode(unmountElement);
      },
      /**
       Micro App이 unmount되더라도 JS, CSS 파일이 바로 삭제되지 않고 유지되는 시간
       */
      cacheTime: 1000 * 300,
      /**
       Micro App unmount시에 실행되어야 할 logic이 stack으로 저장된다
       */
      unmountCallbackStack: [],
      timeout: undefined,
    };

    if (window[appName] === undefined) {
      window[appName] = microApp;
    }
  }
}
```
```TypeScript
// Micro App 기준
makeMicroApp({
  appName: 'microApp',
  renderFunction: () => {
    // ...
    // {index.tsx logic}
    // ...
  },
});
```
```TypeScript
import React from 'react';

export class MicroAppPage extends React.Component<MicroAppPageProps> {
  async fetchManifest() {
    const { onloadScript } = this.props;
    // ...
    const appData: IManifestType = await getMicroAppInfo(appInfo.url + '/manifest.json');

    injectionScript(/*...*/);
    injectionStyle(/*...*/);

    return appData;
  }

  init() {
    const { onloadScript } = this.props;
    // ...
    const microApp = window[appInfo.appName];

    if (microApp) {
      onloadScript();
    } else {
      this.fetchManifest();
    }
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    const microApp = window[appInfo.appName];
    // ...
    try {
      if (microApp) {
        microApp.unmountCallbackStack.push(() => {
          //...
          scriptEle?.remove();
          styleEle?.remove();
        });
        microApp.unmount(appInfo.containerId);
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // ...
    return <div id={appInfo.containerId}/>
  }
}
```

## 도입 효과 및 해결과제
### 도입 효과
- 업무 결합도 감소
   - 하나의 애플리케이션으로 묶여있어 상호 결합도를 갖고 있던 업무를 분리하여 업무 결합도를 낮출 수 있었다
- 컴포넌트 재사용성 증가
   - SPA를 Micro App으로 이용할 수 있게되어 재사용성이 증가하였고, 큰 조직 단위에서의 효율이 증대되었다

### 해결과제
- 과도한 payload크기
   - 공통적으로 사용하는 library가 bundling된 js마다 존재하므로 payload크기가 과도하게 된다.
   - 코드 스플리팅, 트리 쉐이킹 등을 지원하는 모던 프레임워크에서는 과도한 payload크기는 문제가 될 수 있다
- 운영 복잡도 증가
   - Micro App마다 다른 빌드, 배포 파이프라인을 갖고 있어야 하기 때문에 관리 포인트가 늘어나게 된다
- CSS 오염 문제
   - ShadowDom이나 CSS in JS 같은 방식이 아닌 Micro App의 CSS가 Container App과 다른 MicroApp의 CSS를 오염시킬 수 있다
- Global window 공유
   - Container App과 모든 Micro App이 하나의 window를 공유하므로 Window 하부에 하나로 이용되는 Object가 어떠한 Micro App에서 변경되면 오류사항이 모든 MicroApp으로 퍼질 수 있다

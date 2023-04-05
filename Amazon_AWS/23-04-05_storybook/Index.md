# Storybook을 통한 UI 개발 프로세스 간소화
- Florian Ludot
- Avanssion Inc.
- [발표자료](https://docs.google.com/presentation/d/1t3Hcpeo_DfmhtbEs1JKas-tOlagahEpp/edit#slide=id.g221e1dbd759_0_2)

## Who is this for
- Designers
- Frontend Developers
- Team Leaders & PMs

## Agenda
- What's Storybook?
- Why should you care?
- Prepare the design
- Storybook: implementation
- Storybook: deployment
- Publishing the library
- Integration
- Fianl key takeways

## What's Storybook?
- Storybook is a frontend workshop for building UI components and pages in isolation.

## Why should you care?
- Component-Driven Development
- Component Documentation
- Involve all stakeholders as soon as possible
- Improve testing
- Isolate UI from buisness logic

## Prepare the design
- Atomic Design
- Introduced by Brad Frost in 2013
- Methodology for creating design system

### Atomic Design
- [Demo](https://www.figma.com/file/xzj8gzuhGNqVyGfFNtCglC/Creative-Tokyo-Kit?node-id=13-222)
- Design Tokens
- Atoms
- Molcules
- Organisms
- Templates
- Pages

#### Design Token
- 스스로 사용할 수 없는 것들
- 컬러코드와 인지 가능한 이름 매핑
- 브레이크 포인트
- Elevation

#### Atoms
- 더 이상 쪼게질 수 없는 컴포넌트
- Typography
- Button
- Shape
   - Squre
   - Rounded
- State
   - Pressed
   - Hover
   - Disabled
   - Loading
   - etc...

#### Molcules
- Atom의 조합으로 만들어진 컴포넌트

#### Organisms
- Atom & Molcules의 조합으로 만들어진 컴포넌트

#### Templates
- 목업 데이터로 채워진 중간 결과물

#### Pages
- 실제 데이터로 만들어진 최종 결과물

### Best Practices and Tips
- Don’t forget “easy to forget” component states (disabled, loading, …)
- Document your design as much as possible
- Avoid as much cognitive overhead for developers during the handoff
- Involve stakeholders in your design process

## Storybook: implementation
- [Demo](https://master--63f12fea8a787fc74f71d1b8.chromatic.com/?path=/story/tkcreativekit-introduction--page)
- Provide static and sandbox stories
- Document your storybook as much as possible
- Test accessibility right into your stories
- storybook-addon-designs to embed Figma previews
- Implementing templates and pages don’t suit every projects
- Involve stakeholders in your development process


## Storybook: deployment
- [Chromatic](https://www.chromatic.com)
   - 스토리북을 만든 곳에서 만들어서 여러가지 호환성이 좋음
- [Github Page](https://pages.github.com)
- [AWS S3](https://aws.amazon.com/s3)
- Storybooks are private by default
- 5,000 free snapshots/month
- Sync your Chromatic project with the GitHub repo
- Use Continuous Integration

## Publishing the library
- [참고 저장소](https://github.com/florianldt/tkcreativekit)
- Should you really publish your component library?
- If yes, should it be a public or private one
- Build your library using Typescript or provide types
- Document your library
- Write tests and provide code coverage
- Use a changelog to keep track of changes

## Integration
- [참고 저장소](https://github.com/florianldt/tkcreativekit-integration)
- Use npm link x or npm install /local/path/to/x while testing integrations

## Fianl key takeways
- Study Human Interface Guidelines ([Web](https://m3.material.io/), [Apple platforms](https://developer.apple.com/design/human-interface-guidelines/guidelines/overview/), [Android platforms](https://developer.android.com/design?hl=ko))
- Onboard and communicate with stakeholders early on
- The Storybook is a living document
- Start using Storybook for new projects
- Gradually adopt it for existing projects
- Study top company Storybooks

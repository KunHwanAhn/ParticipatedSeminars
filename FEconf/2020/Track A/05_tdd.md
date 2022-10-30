# 프론트엔드에서 TDD가 가능하다는 것을 보여드립니다.
- [Youtube](https://youtu.be/L1dtkLeIz-M?t=32)
- [발표자료](https://drive.google.com/file/d/1658E_OFq-Iq4f2kCRKxL-afUz3NVmzWL/view)
- [Demo Code](https://github.com/megaptera-kr/frontend-tdd-feconf2020)

## 테스트 코드를 작성하시나요?
- 왜 안하게 되는가?
   - 힘들고 일정에 치이게 되면, 어쩔 수 없다
   - 나중에 하자
   - => 나중은 오지 않은다

## TDD의 궁국적 목표
- Clean code that works
- Test First Programming

## TDD 라이프 사이클
- RED -> GREEN -> REFACTRING

## Testable Code
- 관심사의 분리 (Separation of Concerns)

## Redux
- 왜 쓰는가? 상태 관리?
- React의 관심사 때문에 쓴다 -> State Reflection
   - 상태를 반영하여 UI를 그리는 데에 집중
- 어떤 상태를 사용하느냐에는 관심이 없음

> Single Responsibility Principle (SRP)

## BDD
- Behavior Driven Development
- 테스트를 작성할 때 행위주도로 생각해봐라
- 상황에 따라 다르게 행동
   - describe
   - context
   - it

## Live Coding
- [Live Coding Diff](https://github.com/KunHwanAhn/frontend-tdd-feconf2020/pull/1/files)

## 정리
- 만능이 아니다
- 설계 방법론도 아니다
- 지뢰 탐지기 => 위험 신호 탐지
- 위험을 모두 피할 수 없으니, 피할 방법을 잘 찾아야 한다
- 미래의 고통을 지금으로 가져오는 기술
- 요구사항을 명확하게
   - 요구사항이 명확하지 않으면 테스트 작성이 어려움

## 참고 자료
- [TDD FAQ](https://bit.ly/2HJ6jrg)
- [BDD](https://www.youtube.com/watch?v=gfTsSBRvdqI)
- [TDD를 해야하는 이유](https://www.youtube.com/watch?v=j09W0KSofOk)
- [TDD 핵심](https://www.youtube.com/watch?v=Bogx86KKp5o)
- [코딩을 하기 전에 해야 할 일](https://www.youtube.com/watch?v=N4FV788fNiQ)

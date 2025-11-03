# 디자이너가 알아두면 좋은 접근성 고려 사항
- 오남경, RIDI - Product Designer

> 저시력자를 위한 Dark Theme이 조금씩 나오고 있는 상황

# Accessibility?
- 신체적인 불편함을 갖고 있는 사람들도 정보의 차별을 받지 않도록 하는 것
- 장애뿐만 아니라, 아동, 노인과 같이 노화에 의한 불편함도 있다.
- 순간적인 청력손실(=시끄러운 곳에서 동영상 시청)도 있다.

> Google I/O 2019 Keynote 발표동안 수화 및 발표내용을 텍스트로 전달했음

> https://developers.google.com/web/fundamentals/accessibility

# Microsoft Inclusive Design
- Permanent
- Temporary
- Situtional

# WCAG(Web Content Accessibility Guidelines)
- v1.0 1999년에 제안
- v2.0 2008년
- v2.1 현재

## 주요 4가지 요소, POUR
- 인지 가능(Perceivable): 사용자가 콘텐츠를 인지할 수 있나요? 시각과 같이 어떤 감각으로 인지할 수 있다고 해서 모든 사용자가 인지할 수 있다는 뜻은 아니라는 점을 떠올리는 데 도움이 됩니다.
- 작동 가능(Operable): 사용자가 UI 구성 요소를 사용하고 콘텐츠를 탐색할 수 있나요? 예를 들어 마우스 오버 상호작용은 마우스나 터치스크린을 사용할 수 없는 사람은 작동시킬 수 없습니다.
- 이해 가능(Understandable): 사용자가 콘텐츠를 이해할 수 있나요? 사용자가 인터페이스를 이해할 수 있고 인터페이스는 혼란을 피할 수 있을 만큼 일관적인가요?
- 안정적(Robust): 다양한 사용자 에이전트(브라우저)로 콘텐츠를 사용할 수 있나요? 지원 기술과 호환되나요?

### Perceivable
- 명도 대비는 `4.5:1` 권장
- https://material.io/resources/color/#!/?view.left=0&view.right=0

### Understandable
- 높은 가독성을 위핵서 명쾌하고 단순한 텍스트를 권장
- 부정적인 어조보다는 긍정적인 어조 사용 권장
   - 올바른 전화번호를 입력해주세요. (O)
   - 잘못된 형식의 전화번호를 사용하셨습니다. (X)
- 일관적인 UI 디자인

### Understandable
- Link를 중요한 요소에 걸어서 사용자가 확실하게 인지할 수 있도록 권장
   - `UI디자인`에 대해 자세히 알아보기 (O)
   - UI디자인에 대한 자세한 내용은 `여기`를 클릭하세요 (X)

## 기술 준수 레벨
- A, AA, AAA
- AA 수준이 권장사항

# WCAG v2.1
- `화면 회전`에 대한 대응이 있어야 한다
- 입력 목적 식별: 명쾌한 단어 및 Icon을 사용하라
- 리플로우: 400% 확대를 해도 가로 스크롤이 생기지 말아야 한다.
  - https://www.bbc.co.uk
- 텍스트 간격
  - RIDI Design - https://ridi.design/
- 이미지 대체 텍스트: <img alt="fooBar">

> 장애란? Mismatched Human Interactions, 상호작용하는데 불편이 있다면 일시적이든, 영구적이든 장애라 볼 수 있다.

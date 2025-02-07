# AWS re:Invent Keynote Recap

## re:Invent Keynote Summary
- 글로벌 클라우드 컴퓨팅 커뮤니티를 위해 AWS가 주최하는 `학습` 컨퍼런스, 13회차
- 2,500개의 세션, 3,500명의 스피커
- AWS CEO 교체 후 첫 re:Invent, Matt Garman
- Anthropic과의 협업
  - 슈퍼컴퓨터. Claude 3.5
- 컴퓨트
  - Trn2 GA, Trn3 (25년 내)
  - P6(Blackwell) (25년 초)
- 스토리지
  - S3 Table, S3 Metadata
- Apple과의 협업
  - `10년 이상` 협업
  - Apple Intelligence
    - 자체 LLM, Diffusion 모델 학습에 AWS 활용
- 데이터 분석과 머신러닝을 합침
  - Amazon SageMaker Unified Studio
  - Amazon Bedrock Marketplace
- 시스템이 커질수록 복잡성을 피하기 어려움
- 복잡성을 다루기 위한 관리가 필요함
- 복잡성을 다루기 위한 6가지 교훈
  - 진화 가능성을 요구사항으로 설정
  - 복잡성을 작은 단위로 분해
  - 조직을 아키텍처에 맞췩
  - Cell 기반 아키텍처
  - 예측 가능한 시스템 설계
  - 복잡성의 자동화

## Bullish December & DeepSeek Moment
- GenAI 전국시대
  - Amazon Nova
  - Gemini 2.0
  - OpenAI Sora, o3
  - DeepSeek-V3
- Generative AI
  - How far will this scale
  - How is this useful?

## GenAI - Scale and Useful
- Wll LLMs Keep Scaling?
- So far - More data + more compute = better result
- 계속 많은 데이터와 많은 컴퓨팅이 있으면 좋은 결과가 나오는 것인가?
- LLM에 대한 각자의 시각
  - 6년 동안 잘 해왔으니 계속 잘될거야
  - 과연 앞으로도 계속 잘 될까?
- Model Set을 하나를 학습하는데 $10bn 소요, Anthropic CEO
- Llama4를 개선하기 위해서는 더 많은 비용이 들지 않을까?, Facebook
- Llama 3.1 SOTA(State of The Art) 1회 학습에 56일 소요
- Largest clusters are now using 100,000 GPU
- CAPEX Surge 2024년 들어서 급격하게 늘어남

## Thoughts
- 알파벳 주가 하락, 인력 감원
  - 개발자의 생산성이 올라가서 추가 채용은 없음
  - AI 상품 관련 영업은 추가
- 메타도 인력 감원
  - mid-level 엔지니어 역량을 갖춘 AI 엔지니어로 대체
- 사람을 `덜 쓰는 수준`을 넘어 회사의 핵심 사업 구조를 AI로 개편
- 실리콘 밸리는 기술 관련 핵심 지역이지만, 역설적으로 점점 근무하기 어려워짐
- AI 시대의 리더십
  - 급진적 진솔함을 신철하기
    - 너도 모르고 나도 모르고 다 모른다.
    - 편하게 솔직하게 이야기 하자
  - 모든 팀 회의에 프로토타입 가져오기
    - 말로, 문서로 하지 말고 대충이라도 만들어서 결과물로 이야기하자
  - 벤치마크 활용
    - 측정 기준 설정 후 실험과 검증 결과 도축
  - 트레이드오프 수용하기
    - 중요 기능 중심 개발과 빠른 출시
    - 완벽하게 내놓기 보다는
  - 디자인 중심으로 리드하기
    - 사용자 친화적이고 유쾌한 사용자 경험 제공

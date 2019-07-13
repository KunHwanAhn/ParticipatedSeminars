# About Portal
- 조은, 네이버

# Micro Frontend
- https://micro-frontends.org/

> FE의 새로운 패러다임

> Micro Frontends? MSA into Frontend

## Frontend History
- The Monolith -> Front & Back -> MicroServiced

> 하나의 조직이 하나의 기능을 담당한다! 하나의 팀은 Backend + Frontend + Design + Plan
Q1. 조직이 저런 구성이라면 각 조직별의 특성이 녹아들어서 전체적인 Look & Feel이 다르면?

## End-to-End Team with Micro Frontend
- https://micro-frontends.org/0-model-store/
- 도메인 분리하여 관리

# Portal?
- https://web.dev/hands-on-portals
- https://github.com/WICG/portals/tree/master/demos/portal-embed-demo
- 한페이지에서 다른 도메인의 화면을 가져다가 쓸 수 있는 것
- 페이지간의 이동을 부드럽게 이어주는 `tag`
- 심지어 도메마저도 동일하게 이동됨
- Chrome에서만 지원하는 기능
   - Chrome Canary
   - chrome://flags Enable Portals 조합이 필요함

# Post Message
- 도메인이 다르더라도 데이터를 주고 받을 수 있는 기능

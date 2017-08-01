# 스타트업은 기술 스택을 어떻게 다뤄야 하는가?
- 신현묵, 와탭 CBO

## VRIO
- VRIO? [Wiki](https://en.wikipedia.org/wiki/VRIO)
- Valuable(가치)
- Rare(희소성)
- Inimitable(모방불가)
- Organized

> 초기에 만든 S/W를 과감하게 버릴줄 알아야 한다.

> 기술부채가 전혀 없다는 것은 불가능, 어느 정도의 기술 부채는 가져야 개발 속도가 나온다.

## MSA
- Monolithic Architecture => Micro Service Architechture

### MSA의 Risk
- 성능
- 메모리
- 테스팅
- 서비스간 트랜잭션 등...

## Classic VS Digital

### Classic
- 기업 내부 시스템
- 마켓의 시장 규모가 일정한 시스템
- 비즈니스 규모가 완만하게 동작하는 시스템
- 특정 상황에서 C/S상황 처리가 가능한 시스템
- Scale UP

### Digital
- 모바일 고객 대상
- 마켓의 규모가 산정되지 않는 경우
- 비즈니스 규모가 급변 하는 경우
- 고객과 Connected되야 하는 경우
- Scale OUT

> 회사의 비즈니스 변화의 속도를 측정해서 기록해야 한다.

> 소스를 Commit하면서 리뷰에만 집중하는 것이 아니라, `무엇`을 `왜` `수정`했는가를 집중해야 한다.

> 비즈니스가 매일 매일 변화한다면 최소한 주단위 배포를 통해서 대응을 해야 한다.

# 프로그래밍의 미래, 함수형 프로그래밍
- 서재원, 푸른중학교
- [발표자료](https://docs.google.com/presentation/d/1Y63H6x-OVUMzh25KqX8SNmoK_tDoAm_PpbjAktX3GZY/edit#slide=id.p1)

# 목차
- 프로그래밍의 미래, 함수형 프로그래밍
- 타입스크립트 함수형 프로그래밍 라이브러리, fp-ts
- 함수형 프로그래밍의 주요 개념들

# 세션 목표
- 함수형 프로그래밍이란?
- 함수형 프로그래밍의 장점
- 함수형 프로그래밍의 주요 개념

# 함수형 프로그래밍이란?
- 프로그램을 수학적 함수로 보는 패러다임
- 수학에 기반한 아름다운 프로그래밍

## 기존 패러다임의 문제: 숨겨지는 변이
- 변이와 상태는 다른 코드의 동작에 영향을 주기 때문에 프로그램의 동작을 예측하기 어렵게 만듭니다.

```JavaScript
function trap() {
  document.body.innerHTML = ''
}
```

# 함수형 프로그램의 구성

## 일급 시민인 함수
- 함수 또한 일반적인 값이다.

## 사이드 이펙트(Side Effect)
- 상태를 변이시키는 동작

## 순수함수(Pure Fuction)
- 순수함수 = 수학적인 함수
- 사이드 이펙트를 일으키지 않아야 한다.
- 참조 투명성을 띄어야 한다.

## 고차함수(High-order function)
- 함수를 반환하거나, 전달인자로 받는 함수

## 함수 합성(Function Composition)
- 함수를 합치는 행위로 수학적으로는 ◦(Middle Dot)을 이용해 나타냅니다.

## 커링(Currying)
- 매개변수가 여럿인 함수를 매개변수가 하나인 함수의 연속으로 바꾸는 기술

## 모노이드(Monoid)
- 데이터 타입 중, (x:A, y:A) => A 타입의 함수 (a.k.a mappend)가 정의되어 있는 타입
- Law1: 정의된 함수는 데이터 타입의 값 중 하나를 항등원(a.k.a mempty)으로 삼아야 한다.
- Law2: 결합 법칙을 준수해야 한다.

```TypeScript
function mappend<A>(xs: A[], ys: A[]) {
  return [...xs, ...ys];
} // a.k.a concat

function getMempty<A>(): A[] {
  return [];
}
mappend([1, 2, 3], getMempty()) === mappend(getMempty(), [1, 2, 3]) // Law1
mappend([1], mappend([2], [3])) === mappend(mappend([1], [2]), [3]) // Law2

mappend([1, 2, 3], [4, 5]); // [1, 2, 3, 4, 5]
```

## 펑터(Functor)
- 타입 변수를 갖는 데이터 타입 중, <A, B>(f: (x: A) => B) => (fx: F<A>) => F<B> 타입의 함수(a.k.a fmap)가 정의되어 있는 타입
- Law1: fmap(x => x) ≡ (x => x)
- Law2: fmap(compose(f, g)) ≡ compose(fmap(f), fmap(g))

```TypeScript
function fmap<A, B>(f: (x: A) => B): (xs: Array<A>) => Array<B> {
  return (xs: Array<A>): Array<B> => {
    if (xs.length === 0) return [];
    else return [f(xs[0]), ...fmap(f)(xs.slice(1))];
  }
} // a.k.a map

fmap(x => x) === (x => x) // Law1
fmap(compose(f, g)) === compose(fmap(f), fmap(g)) // Law2

fmap((x: number) => x + 1)([1, 2, 3]) // [2, 3, 4]
```

### 그래서 어디에다 쓰나요?
- A타입을 다루는 함수들을 F<A>타입을 다루는 함수로 변환시키고 싶을 때

```TypeScript
function not(x: boolean): boolean {
  return !x;
}

const notForArray: (xs: Array<boolean>) => Array<boolean> = fmap(not);

notForArray([false, false, true]) // [true, true, false]
```

## 모나드(Monad)
- 펑터인 타입 중, <A>(x: A) => M<A> 타입의 함수(a.k.a return)과 <A>(MMX: M<M<A>>) => M<A> 타입의 함수(a.k.a join)가 정의되어 있는 타입
- Law1: join(fmap(f)(return(a))) ≡ f(a)
- Law2: join(fmap(return)(m)) ≡ m
- Law3: join(fmap(g)(join(fmap(f)(m)))) ≡ join(fmap(x => join(fmap(g)(f(x)))(m)))

```TypeScript
function mreturn<A>(x: A): Array<A> {
  return [x];
} // a.k.a of

function join<A>(max: Array<Array<A>>): Array<A> {
  if (max.length === 0) return [];
  else return [...max[0], ...join(max.slice(1))];
}

join(fmap(f)(mreturn(a))) === f(a)  // Law1
join(fmap(mreturn)(m)) === m  // Law2
join(fmap(g)(join(fmap(f)(m)))) === join(fmap(x => join(fmap(g)(f(x))))(m)) Law3

join([[1], [2], [3]]);  // [1, 2, 3]
```

### 모나드 괴담의 실체
- 모나드는 어렵습니다. ~~여러분들이 수학적으로 이해하시려고 하신다면요.~~
- 모나드는 쉽습니다. ~~여러분들이 그 의미를 중심으로 이해하시려고 하신다면요.~~

## 함수형 프로그래머들의 고민
- 문맥을 어떻게 깔끔하게 표현하지?

```TypeScript
function divide(dividend: number, divisor: number): number {
  if (divisor === 0) throw new Error(`Cant't divide number by zero`);
  else return dividend / divisor;
} // could fail

function add1(x: number): number {
  return x + 1;
}

function divideAndAdd1(x: number): number {
  try {
    return add1(divide(x, x));
  } catch {
    throw new Error('divideAndAdd1 has been failed')
  }
}
```

### 값과 타입으로 표현하기
- 값과 타입을 이용하여 문맥을 수학적으로 모델링하기

```TypeScript
class Nothing {
  public readonly type: 'Nothing' = 'Nothing';
}

class Just<A> {
  public readonly type: 'Just' = 'Just';

  constructor(public readonly value: A) {}
}

type Maybe<A> = Nothing | Just<A>

function divide(dividend: number, divisor: number): Maybe<number> {
  if (divisor === 0) return new Nothing;
  else return new Just(dividen / divisor);
}
```

### 중복 코드의 지옥
- 값과 타입으로 모델링한 문맥에 들어있는 값은 문맥을 해석하는 작업을 필요로 합니다.

```TypeScript
function dvideEachOtherAndSub(x: number, y: number): Maybe<number> {
  const dividedXByY: Maybe<number> = divide(x, y);
  const dividedYByX: Maybe<number> = divide(y, x);

  // messy if-then-else structure :(
  if (dividedXByY.type === 'Nothing') return new Nothing;
  else if (dividedYByX.type === 'Nothing') return new Nothing;
  else return new Just(sub(dividedXByY.value, dividedYByX.value));
}
```

### 수학에서 온 구원자: 모나드
```TypeScript
function fmap<A, B>(f: (x: A) => B): (fx: Maybe<A>) => Maybe<B> {
  return (fx: Maybe<A>): Maybe<B> => {
    if (fx.type === 'Nothing') return new Nothing;
    else return new Just(f(fx.value));
  }
}

function mreturn<A>(x: A): Just<A> {
  return new Just(x);
}

function join<A>(max: Maybe<Maybe<A>>): Maybe<A> {
  if (max.type === 'Nothing' || max.value.type === 'Nothing') return new Nothing;
  else return max.value;
}

function bind<A, B>(mx: Maybe<A>, f: (x: A) => Maybe<B>): Maybe<B> {
  return join(fmap(f)(mx));
}

function divideEachOtherAndSub(x: number, y: number): Maybe<number> {
  return bind(
    divide(x, y),
    (divideXByY: number): Maybe<number> => bind(
      divide(y, x),
      (divideYByX: number): Maybe<number> => mreturn(sub(divideXByY, divideYByX))
    )
  );
}
```

# fp-ts
- 타입스크립트로 작성된 함수형 프로그래밍 라이브러리
- 단순한 유틸리티 제공을 넘어서서 다른 함수형 언어들이 지원하는 기능들을 구현
- 높은 퀄리티의 타이핑
- Maybe, State, Either과 같은 중요한 테이터 타입들을 구현

## Algebraic Data Type(ADT)
- 다른 타입들로 구성되는 타입의 한 부류, 쉽게 말해 구분 가능한 튜플들의 유니온 타입

```TypeScript
interface Nil{
  readonly type: 'Nil';
}

interface Cons {
  readonly type: 'Cons';
  readonly value: number;
  readonly next: NumberList;
}

type NumberList = Nil | Cons

function nil(): NumberList {
  return { type: 'Nil' };
}

function cons(value: number, next: NumberList): NumberList {
  return { type: 'Cons', value, next };
}
```

## 타입 클래스 (Type Class)
- 타입의 클래스
- 함수(연산)를 기준으로 타입을 구별하기 위해 사용

```TypeScript
import { Monoid } from 'fp-ts/lib/Monoid';

const numberList: Monoid<NumberList> = {
  empty: nil(),
  concat(xs: NumberList, ys: NumberList): NumberList {
    if (xs.type === 'Nil') return ys;
    else return cons(xs.value, concat(xs.next, ys));
  }
}
```

## Higher Kinded Type(HKT)
- 쉽게 말하면 제네릭 타입을 타입 생성자로 봤을 때의 생성자
- 타입 변수의 수에 따라 구별

```TypeScript
interface List<A> {
  value: A;
  next: List<A> | null;
} // List is HKT (Type => Type)

interface Pair<A, B> {
  left: A;
  right: B;
} // Pair is HKT (Type => TYpe => Type)
```

### HKT - 하스켈의 경우
- HKT를 다른 타입에게 전달하는 등 직접적으로 다룰 수 있습니다.

```haskell
newtype MaybeT m a = MaybeT { runMybeT :: m (Maybe a) }
```

### HKT - 타입스크립트의 경우
- HKT를 직접적으로 다룰 수 없습니다.

```TypeScript
type Apply<HKT, A> = HKT<A>
type NumberArray = Apply<Array, number>

// 아래와 같은 에러 발생
// Generic type 'Array<T>' requires 1 type argument(s). No quick fixes available.
```

#### fp-ts 식 List HKT
```TypeScript
declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    List: List<A>;
  }
}

const URI: 'List' = 'List'
type URI = typeof URI

interface Nil {
  readonly type: 'Nil';
}

interface Cons<A> {
  readonly type: 'Cons';
  readonly value: A;
  readonly next: List<A>;
}

type List<A> = Nil | Cons<A>

function nil<A>(): URItoKind<A>[URI] {
  return { type: 'Nil' };
}

function cons<A>(value: A, next: List<A>): URItoKind<A>[URI] {
  return { type: 'Cons', value, next };
} // URItoKind<A>[URI] === List<A>
```

### HKT 써보기
```TypeScript
import { FUnctor1 } from 'fp-ts/lib/FUnctor';
import { Kind } from 'fp-ts/lib/HKT';

const list: FUnctor1<URI> = {
  URI,
  map<A, B>(fx: List<A>, f: (x: A) => B): List<B> {
    if (fx.type === 'Nil') return nil();
    else return cons(f(fx.value), list.map(fx.next, f));
  }
}
```

# 함수형 프로그래밍으로 행복해지기

## 첫 번째 문제 상황: 실패할 수 있는 연산
- 실패할 수 있는 연산을 어떻게 깔끔하게 다룰 수 있을까?

```TypeScript
function parseBool(x: string): boolean {
  const isTrue = /^[Tt]rue$/;
  const isFalse = /^[Ff]alse$/;

  if (isTrue.test(x)) return true;
  else if (isFalse.test(x)) return false;
  else throw new Error(`Can't parse ${x}`);
}
```

### Mybe(a.k.a Option) 모나드
- 실패할 수 있다는 문맥을 추상화하는 모나드

```TypeScript
import { Monad1 } from 'fp-ts/lib/Monad';

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    Maybe: Maybe<A>;
  }
}

export const URI = 'Maybe' as const;
export type URI = typeof URI

interface Nothing {
  type: 'Nothing';
}

interface Just<A> {
  type: 'Just';
  value: A;
}

export type Maybe<A> = Nothing | Just<A>

export function nothing<A>(): Maybe<A> {
  return { type: 'Nothing' };
}

export function just<A>(value: A): Maybe<A> {
  return { type: 'Just', value }
}

export const maybe: Monad1<URI> = {
  URI,
  map<A, B>(ma: Maybe<A>, f: (a: A) => B): Maybe<B> {
    if (ma.type === 'Nothing') return nothing();
    else return just(f(ma.value));
  },
  ap<A, B>(mf: Maybe<(a: A) => B>, ma: Maybe<A>): Maybe<B> {
    if (mf.type === 'Nothing') return nothing();
    else return maybe.map(ma, mf.value);
  },
  chain<A, B>(ma: Maybe<A>, f: (a: A) => Maybe<B>): Maybe<B> {
    if (ma.type === 'Nothing') return nothing();
    else return f(ma.value);
  },
  of<A>(a: A): Maybe<A> {
    return just(a);
  }
}
```

### 더 아름다운 실패 처리
```TypeScript
import { some, none, map as fmap } from 'fp-ts/lib/Option';

function parseBool(x: string): Option<Boolean> {
  const isTrue: RegExp = /^[Tt]rue$/;
  const isFalse: RegExp = /^[Ff]alse$/;

  if (isTrue.test(x)) return some(true);
  else if (isFalse.test(x)) return some(false);
  else return none;
}

const parseBoolAndNot: (x: string) => Option<Boolean> = compose(fmap(not), parseBool);

parseBoolAndNot('a'); // { type: 'None' }
parseBoolAndNot('True'); // { type: 'Some', value: false }
```

## 두 번째 문제 상황: 인자가 중복될 때
- 인자가 중복될 때 어떻게 깔끔하게 처리할 수 있을까?

```TypeScript
function length<A>(array: A[]): number {
  return array.length;
}

function sum(nums: number[]): number {
  return nums.reduce((x, acc) => x + acc);
}

function average(nums: number[]): number {
  return sum(nums) / length(nums);  // argument is duplicated!
}
```

### ((->)r) 모나드
- 같은 값을 사용한다는 문맥을 추상화하는 모나드

```TypeScript
import { Monad2 } from 'fp-ts/lib/Monad';

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    ArrowR: ArrowR<E, A>;
  }
}

export const URI = 'ArrowR' as const;
export type URI = typeof URI

export type ArrowR<A, B> = (a: A) => B

export const arrowR: Monad2<URI> = {
  URI,
  map<E, A, B>(ea: ArrowR<E, A>, ab: (a: A) => B): ArrowR<E, B> {
    return (e: E): B => ab(ea(e));
  },
  ap<E, A, B>(eab: ArrowR<E, (a: A) => B>, ea: ArrowR<E, A>): ArrowR<E, B> {
    return (e: E): B => eab(e)(ea(e));
  },
  chain<E, A, B>(ea: ArrowR<E, A>, f: (a: A) => ArrowR<E, B>): ArrowR<E, B> {
    return (e: E): B => f(ea(e))(e);
  },
  of<E, A>(a: A): ArrowR<E, A> {
    return (): A => a;
  }
}
```

### 더 아름다운 평균 구하기
```TypeScript
const average: (nums: number[]) => number = arrowR.chain(sum, sum => arrowR.chain(length, len => arrowR.of(sum / len)));
```

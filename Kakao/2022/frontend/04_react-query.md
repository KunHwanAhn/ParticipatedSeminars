# 눈에 보이지 않는 개선: My구독의 Redux에서 React-Query 전환 경험 공유
- [Youtube](https://www.youtube.com/watch?v=YTDopBR-7Ac)
- [발표자료](https://speakerdeck.com/kakao/nune-boiji-anhneun-gaeseon-mygudogyi-reduxeseo-react-query-jeonhwan-gyeongheom-gongyu)

## 보이지 않는 개선?
- 초기 개발에는 기존 설계에 맞춰서 개발
- 출시 이후에는 새로운 기능, 사용자 경험 개선, 새로운 기능 등으로 인해 점점 복잡해짐
- 완벽한 설계는 없고, 시간은 부족하다
- 리팩토링으로 품질 개선을 해야 한다

## 목차
- React-Query 조금 알아보기
- Redux에서 React-Query로 전환 이유
- React-Query로 전환 과정
- 정리

## React-Query 조금 알아보기
- API 요청 시 필요한 기능
   - Data fetching
   - Cache
   - Data Sync

### React로만 구현하기
- Context API, useState, useCallback, useEffect 등 많은 요소를 사용해서 구현

#### Data fetching
```JavaScript
const [data, setData] = useState(null);
const fetch = useCallback(() => {}, []);
useEffect(() => { fetch(); }, []);
return { data, refetch: fetch }
```

#### Cache
```JavaScript
const CacheContext = React.createContext(null);
const { Provider } = CacheContext;
function CacheProvider({ children }) {
  const [cache, setCache] = useState({});
  // ...
  return <Provider value={value}>{children}</Provider>
}
```

#### Data Sync
```JavaScript
useEffect(() => {
  const interval = setInterval(handleFocus, cacheTime);
  window.addEventListener('focus', handleFocus, false);
  // ...

  return () => {
    clearInterval(interval);
    window.removeEventListener('focus', handleFocus, false);
    // ...
  };
}, []);
```

### Reqct-Query를 사용했을 때
- QueryClient(Context), useQuery, useMutation으로 해결 가능

### React-Query 없이 React 자체만으로는 불가능하나요?
- React에서 제공하는 기본 Hook으로도 충분히 멋진 비동기 커스텀 훅을 만들 수 있습니다
- 필요한 기능만 구현할 수 있으며 별도의 라이브러리 설치가 필요 없습니다
- 대신, 기본 Hook으로 만들기 위해서는 시간과 노력이 필요합니다
- React-Query 대비 안정성을 확보하기 어렵습니다

## Redux에서 React-Query로 전환 이유
- 구조
- 데이터
- 에러

### 구조
- Redux + Redux-Saga
- Redux 자체는 비동기 처리를 목적으로 나온 라이브러리가 아님
- Redux-Saga를 사용하여 비동기 처리를 하고 데이터를 전달해야 함
- Redux-Saga로 비동기 처리를 하는 경우에는 로드 상태 관리를 하는 모듈을 만들어야 함
- React-Query 내부에서 로드 상태를 관리하고 있음

#### Redux
```JavaScript
export function useData({ ...state }) {
  useEffect(() => {
    actions.fetch구독정보API();
  }, []);
  const { 구독정보 } = state;

  return 구독정보;
};
```

#### React-Query
```JavaScript
export function useData() {
  const { data, isLoading } = useQuery('KEY1', fetch상품정보API);
  const { data: 구독정보 } = useQuery(
    'KEY2',
    fetch구독정보API(data),
    { enabled: !isLoading },
  );

  return 구독정보;
};
```

### 데이터
- 클라이언트 데이터와 서버 데이터의 구분
- 클라이언트 데이터는 Context API
- 서버 데이터는 React-Query

### 에러

#### Redux에서의 에러 핸들링
- 결제정보 API -> 에러발생 -> loadStatus -> re-render -> 컴포넌트 -> onError 실행
```JavaScript
useEffect(() => {
  actions.fetch결제정보();
}, []);

useEffect(() => {
  if (loadStatus?.fetch결제정보?.error) {
    actions.fetching('fetch결제정보');
    history.replace('/');
  }
}, [loadStatus?.fetch결제정보?.error]);
```

#### React-Query에서의 에러 핸들링
- 결제정보 API Query -> 에러발생 -> onError 실행

### Why? 다른 라이브러리 대신 React-Query를 사용하는 이유가 있나요?
- RTK-Query
   - Redux 구조를 그대로 사용해야 합니다
- Apollo
   - 스키마를 정의해야 합니다
- SWR
   - enabled 옵션을 제공하지 않습니다
- Redux에서 API 상태에 따라 화면을 구성하기 위해서는 **별도의 도구나 상태가 필요**합니다
- Redux-Saga는 **의존성이 깊은 구조**를 만들어 낼 수도 있습니다
- Redux는 간단한 API 추가에도 **장황한 Bolierplate가 필요**합니다
- Redux는 API 에러 핸들링 과정에서 다소 불필요한 작업**이 발생할 수 있습니다
- 우수한 비동기 처리 라이브러리가 많이 있습니다
- 사용하는 **방식, 구조, 기능**에서 React-Query가 더 적합하다고 판단하여 사용하게 되었습니다.

## React-Query로 전환 과정

### 기존 My 구독
- Redux 고차 컴포넌트
- Props drilling
- Production

### 전환 과정
- Redux 고차 컴포넌트 -> Redux Hook
- Redux Hook -> React-Query
- React 16 -> React 18

#### Redux 고차 컴포넌트 -> Redux Hook
- 불필요한 re-render 발생할 수 있음
- 전체적인 코드 구조 변경 - API & 로직 누락 발생할 수 있음

##### Redux 고차 컴포넌트 예시
```JavaScript
function 상품상세페이지({ 액션, ...상태 }) {
  useEffect(() => {
    액션.fetch구독데이터({ productGroupId });
  }, [productGroupId]);

  useEffect(() => {
    if (loadStatus?.fetch구독데이터?.error) {
      error();
    }
  }, [loadStatus?.fetch구독데이터?.error]);

  const [ 구독데이터, loadStatus ] = 상태;
  const fetched = isFetched(deps, loadStatus);

  return fetched && <Layout 구독데이터={구독데이터} />;
}

export default connectStore(상품상세페이지);
```

##### Redux Hook 예시
```JavaScript
export default function 상품상세페이지() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(액션.fetch구독데이터({ productGroupId }));
  }, [productGroupId]);

  useEffect(() => {
    if (loadStatus?.fetch구독데이터?.error) {
      error();
    }
  }, [loadStatus?.fetch구독데이터?.error]);

  const 구독데이터 = useSelector(({ 구독데이터 }) => 구독데이터);
  const loadStatus = useSelector(({ loadStatus }) => loadStatus);
  const fetched = isFetched(deps, loadStatus);

  return fetched && <Layout 구독데이터={구독데이터} />;
}
```

##### Redux Hook 최적화
- loadStatus 변경에 따라 의도하지 않은 re-render가 발생하는 컴포넌트가 있음
- Redux Hook을 최적화 하는 이유
   - 전체적인 구조가 변경됨에 따라 언제 작업이 마무리될지 모릅니다
   - 작업 도중 다른 작업이 발생할 수 있습니다
   - 해결할 수 있는 부분을 놔두기가 애매합니다
```JavaScript
export default function useLoadStatus(deps = []) {
  return useSelector(
    ({ loadStatus }) => deps.reduce((status, key) => ({
      ...status,
      [key]: loadStatus[key],
    }), {}),
    isEqual,
  );
};
```
```JavaScript
const loadStatus = useLoadStatus(['fetch사용자데이터', 'fetch매대데이터', 'fetch상품데이터']);
```

#### Redux Hook -> React-Query

##### React-Query 예시
```JavaScript
export default function 상품상세페이지() {
  const { data: 구독데이터, isLoading } = useQuery(
    ['구독데이터'],
    () => fetch구독데이터(productGroupId),
    {
      enabled: productGroupId,
      onError: () => {
        error();
      },
    },
  );

  // ...
  if (!매대Success || !상품Success || (!이용권Idle && !이용권Success) || 일시중지상품Loading) {
    return null;
  }

  return !isLoading && <Layout 구독데이터={구독데이터} />;
}
```

##### React-Query 개선 - useQueriesLoading
```JavaScript
export function useQueriesLoading() {
  const client = useQueryClient();
  const queries = cleint.getQueryCache().findAll();

  const [queryChangedCount, setQueryChangedCount] = useState(0);

  useEffect(() => {
    if (queries) {
      setQueryChangedCount(queries.length)
    }
  }, [queries]);

  useEffect(() => {
    if (queries.every(({ state }) => state.status !== 'loading') && queryChangedCount >= 0) {
      setQueryChangedCount((prevState) => prevState - 1);
    }
  });

  return queryChangedCount >= 0;
}
```
```JavaScript
export default function 상품상세페이지() {
  const { data: 구독데이터, isLoading } = useQuery(
    ['구독데이터'],
    () => fetch구독데이터(productGroupId),
    {
      enabled: productGroupId,
      onError: () => {
        error();
      },
    },
  );

  // ...
  const isQueriesLoading = useQueriesLoading();

  if (isQueriesLoading) {
    return null;
  }

  return !isLoading && <Layout 구독데이터={구독데이터} />;
}
```

##### 개선 중에 먼저 나와버린 새로운 기능
- 충돌을 해결하기 위해 5가지를 고민했습니다
- Query 작성 방식
- Query Mutation 네이밍
- 폴더 구조 개선
- 프로젝트 기본 옵션
- Query key 작성 규칙

> Query 작성 방식과 폴더 구조 개선만 발표에서 다룰 예정

###### Query 작성 방식
- 각각 컴포넌트 내에서 다양한 API를 호출하며 페이지마다 API 호출 조건이 다름
   - 이로 인해서 API 변경이 있을 경우 사용하느 모든 컴포넌트를 수정해야 함
- 기본 Query 개념 도입, API와 1:1 관계
- 페이지 단위 Key값 추가 => 페이지 단위 쿼리 초기화 가능
- Select에서 실질적인 데이터가 있는 값만 반환 => 쿼리를 사용할 때 중복 Select 방지
- onError 옵션이 있어야 useErrorBoundary를 설정하도록 처리 => 에러 핸들링 누락 방지
```JavaScript
import { useQuery as useQueryOrigin } from 'react-query';

export default useQuery(queryKey, queryFn, options = {}) {
  const { /*...*/ } = options;

  return useQueryOrigin(queryKey, queryFn, { /* ... */ });
}
```

###### 폴더 구조 개선
- 목적에 따른 폴더 분류
- GET => queries
- POST, PUT, DELETE => mutations

#### React 16 -> React 18
- IE 지원을 위해서 React 18을 올리지 않고 있었음
- IE 지원 중단으로 인하여 React 18로 올리면서 최신 버전의 라이브러리들을 사용할 수 있게 됨

##### React 16 예시
```JavaScript
function 상품상세페이지() {
  // ...
  const { isSuccess } = useQuery(/* ... */);
  const { isSuccess: 구독정보Success } = useQuery(/* ... */);
  const isRender = isSuccess && 구독정보Success;

  return isRender && <상품상세레이아웃 />;
}
```
```JavaScript
function 상품상세레이아웃() {
  // ...
  const { data } = useQuery(/* ... */);
  return <Component data={data} />;
}
```

##### React 18 예시
```JavaScript
function Route() {
  // ...
  return <Suspense><상품상세페이지 /></Suspense>;
}
```
```JavaScript
function 상품상세페이지() {
  // ...
  const { data } = useQuery(/* ... */);
  return <Component data={data} />;
}
```

### 전환 과정 정리
- **My구독 특성과 상황 덕분에** 총 3단계로 나누어 전환작업을 진행했습니다
- 과정마다 그 상황에 맞춰 최대한 더 좋은 방향으로 진행할 수 있도록 여러 도전을 진행했습니다
   - Redux Hook 기반으로 전환할 때 **select를 좀 더 최적화** 하는 방법에 대해 공유했습니다
   - React-Query로 전환하는 과정에서 React 16에서 **상태 지옥에서 벗어나는 방법**에 대해 공유했습니다
   - React-Query를 **어떻게, 어떤 구조로 사용하는지 공유**했습니다
   - React 18로 전환하면서 **어떤 이점이 발생하는지 공유**했습니다

## 정리
- 그래서 써보니 어떤가요?

### 이런 점에서는 좋았습니다
- **Hook 기반**을 제공하고 **캐싱을 지원**합니다
- 비동기 처리를 위한 **유용한 도구**를 제공합니다
   - 비동기 처리 상태: isLoading, isFetching, isSuccess 등
   - Infinite Queries
- **백그라운드 패칭**을 지원합니다
   - 서버 데이터가 자주 변경되더라도 지속적으로 업데이트가 가능합니다
   - focus, mount, interval 등

### 이런 상황에서는 고민을 해보세요
- 서버 사이드 데이터가 거의 없는 경우 => **서버 사이드 데이터가 더 많아질 때 적용**
   - recoil, redux
- React 18에서 비동기 처리 상태때문에 도입하는 경우 => Suspense 사용

### 이런 아쉬운 점이 있습니다
- Mutation은 한 번만 호출하기 위해 **Wrapper 함수가 필요**합니다
   - Redux Saga의 takeLatest
```JavaScript
function useExcuetionOnce(func, delay) {
  // ...

  return async (...args) => {
    if (!comleteRef.current) {
      return;
    }

    comleteRef.current = false;
    try {
      await func(...args);
      await waitMutating(); // useIsMutating 기반 mutation 작업 대기
    } catch (e) {
      throw e;
    }
  };
}
```
- UI 테스트를 진행하게 될 떄 **Mock API**가 필요할 수 있습니다
   - Storybook 기반 E2E Test와 Snapshot Test 진행 중
   - Mock Service Worker를 사용하여 해결 중
- 항상 서버 데이터와 같은 데이터를 바라보는 것이 좋은 것은 아닙니다
   - 구독 완료 페이지는 1회성 페이지, 재요청이 발생 시 데이터가 빈값이 오기에 에러가 발생함
   - `refetchOnWindowFocus: false`, `retry: 0`과 같이 옵션을 해제해야 함
- 전체적인 데이터 흐름을 파악하기 어렵다는 느낌을 받기도 합니다
   - Pure 컴포넌트와 상태 컴포넌트를 잘 구분하는 것이 중요
   - Pure 컴포넌트: API 데이터 중 하나만 필요
   - 상태 컴포넌트: Props drilling

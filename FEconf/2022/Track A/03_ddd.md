# 프론트엔드 DDD를 만나다
- [Youtube](https://youtu.be/jZNk-Ncez6E?t=8711)

## 목차
- DDD란 무엇일까?
- 어떻게 DDD를 적용할 수 있을까?
- 코드 레벨에서의 이야기
- 마무리

## DDD란 무엇일까?
- Complexity
- Communications
- Similarity

### Complexity
- DDD는 복잡한 현실 세계의 요구사항이나 기능을 단순하게 만들어서, 이를 개발하는 이에게 하여금  정교하게 만들 수 있게 도와주는 것

### Communications
- Different Language
   - 디자이너의 Class = CSS Class
   - 개발자의 Class = JavaScript Class
- Same Language
   - 사용하는 용어의 통일, 유비쿼터스 랭기지
   - 사전을 만들어서 **같은 언어**로 함께 일할 수 있게 도와준다

### Similarity
- Redux VS DDD's CQRS Pattern
   - 상태를 변경하는 Command를 위한 model
   - 상태를 제공하는 Query를 위한 model
- Redux
   - Client -> UI ---create---> Action ---dispatch---> Reducer ---update---> Store -> UI
- CQRS Pattern
   - Client -> UI -> Command -> Write DB
   - Client -> UI -> Query -> Read DB
   - Write DB ---Event Bus---> Read DB

#### CQRS Pattern & Redux
- CQRS Pattern Commands & Redux Action
- CQRS Pattern Qeury & Redux Selector
- CQRS Pattern Domain Events & Redux Action after reducer process
- CQRS Pattern Aggregate & Redux reducer

## 어떻게 DDD를 적용할 수 있을까?

### 미리 짚고 넘어가는 개념들
- Software: 실제 세상의 Product
- Strategic Design
   - 유비쿼터스 랭기지
   - 바운디드 컨텍스트
- Tactical Design: 시스템 구현에 집중
- Hexagonal Architecture

#### Strategic Design

##### Bounded Context
- 범위를 정하고 중복되는 부분에 대한 문제를 정리
- 고객이 바라보는 제품과, 직원이 바라보는 제품에는 차이가 있을 수 있다
- 각각의 도메인에 맞게 모델을 만들어야 한다

##### Ubiquitos Language
- 개발자, 기획자, 디자이너 사이에서 사용하는 공통적인 언어를 정리
- 커뮤니케이션에서 발생할 수 있는 비용등의 문제를 처리하는데 집중

#### Tactical Design
- 도메인 모델을 구성하기 위한 리소스의 집합
- Entity
- Value Object
- Aggregate
- Services
- Domain Events

##### Entity
- 유일한 식별자
- mutable Object

##### Value Object
- Immutable
   - 이전 값을 변경하려면 새로운 것을 만들어서 바꾼다
- 식별자가 없다

##### Aggregate
- 가장 중요하고 복잡한 패턴
- 하나 이상의 엔티티의 클러스터이고 밸류 오브젝트를 포함할 수 있다

##### Services
- 상태를 유지하지 않고 일부 로직을 구현하는 객체
- Domain Service: 비즈니스 로직과 도메인 동작 캡슐화
- Application Service: 어플리케이션 로직, 외부의 컨슈머가 통신하여 시스템과 커뮤니케이션하는 곳
   - 유저 인증, 유저 정보 조회, 비밀번호 변경 등

##### Domain Events
- 변경이 있을 때, 시스템의 다른 부분에 이를 알려주는데 사용
- Aggregate가 이벤트를 트리거

### Layered 구조
- User Interface
- Application
- Domain
- Infrastructure

### Hexagonal 구조
- 컴퓨터에 비교했을 때, 모니터, 키보드, 마우스와 같은 것. 본체는 바뀌지 않지만 외부 모습은 계속 바뀔 수 있다.
- Domain
- Use cases
- Infrastructure
- Adapter
- User Interface
- 프레임워크에 독립적: Domain, Use cases, Infrastructure
- 프레임워크: Adapter, User Interface
   - Vue, React, Angular, Svelte, etc...

## 코드 레벨에서의 이야기
```bash
└─src
    ├─ui
    ├─adapter
    ├─infrastructure
    ├─application
    ├─domain
    ├─common-ui
    └─utils
```

### UI Layer
- 일반적으로 생각하는 UI
- 도메인에 따라서 구분하여 폴더 구조를 가져감
- 어댑터를 통해서 도메인에서 사용할 데이터를 전달 받음

#### Container Component
```JavaScript
export const CustomerScreen = () => {
  const info = useSelector(state => state.info);
  const dispatch = useDispatch();

  return (
    <CustomerInfo
      info={info}
      onUpdate={(data) => dispatch(action.updateInfo(data))}
    />
  );
}
```

#### Presentational Component
```JavaScript
export const CustomerInfo = ({ info, onUpdate }) => {
  const [data, setData] = useState(info);

  const update = () => {
    onUpdate(data);
  }

  return (
    <>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={data}
          onChange={(e) => { setData(e.target.value); }}
        />
      </div>
      <button onClick={() => { update() }}>Update</button>
    <>
  );
}
```

### Adapter Layer
- UI에서 사용하는 도메인의 Entity를 UI에 맞춰서 정리
- UI에서 이벤트를 받아서 Application의 Use Case에 맞춰서 처리
- 도메인 별로 존재
```JavaScript
const initialState = { info: '' }

export const updateInfo = createAsyncThunk(
  'customer/updateInfo',
  aysnc (data, thunkApi) => {
    return (await updateUserInformation(data)).data;
  },
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: {
    [updateInfo.fulfilled.type]: (state, action) => {
      state.info = action.payload;
    },
  },
});

export default customerSlice.reducer;
```

### Infrastructure Layer
- 레이어 간의 통신 책임
- repository, service
```JavaScript
export class CustomerRepository extends ICustomerRepository {
  async function getUserInformation(uid) {
    const info = await axios.get(`/user/${uid}`);

    return UserInformation.fromDto(info);
  }

  async function updateCustomer(uid, name) {
    const info = await axios.post(`/user/${uid}`, { name });

    return UserInformation.fromDto(info);
  }
}
```

### Application Layer
- 비즈니스 로직이 들어있는 Use Case
- Service, DTO, Transformer

### Domain Layer
- 비즈니스 도메인을 지원하는 책임
- 각각의 도메인은 비즈니스에서 사용하는 엔티디, 밸류 오브젝트 포함

```TypeScript
export type Customer = {
  id: string;
  name: string;
  address: ShippingAddress[];
}
// Customer 1 <-> N ShippingAddress
export type ShippingAddress = {
  addressName: string;
  reciepent: string;
  address1: string;
  address2?: string;
  postalCode: number;
  phoneNumber: string;
  addNumber?: string;
  note?: string;
}
```

## DDD 적용을 하면서 마주칠 수 있는 문제점들

### 여러 도메인이 동일한 프레젠테이션 컴포넌트를 필요로 할 경우
- 공통 구성 요소를 Common-UI Layer로 이동

### 여러 도메인이 동일한 컨테이너 컴포넌트를 필요로 할 경우
- Fetching Data + Presentation
- 도메인 내에 컴포넌트가 너무 많은 책임을 갖고 있다 볼 수 있음
- 컴포넌트의 복잡도의 증가 -> 이로 인한 잠재적인 문제 원인이 될 수 있음
- Application Layer의 useCase 추가
- 이를 핸들링하는 Common-UI

### 여러 도메인이 동일한 API 호출
-  Account Domain -> fetchUserInformation() <- Order Domain
- 도메인에서 직접적인 API 호출을 지양, Infrastructure Layer를 두고 관리

### 여러 도메인이 동일한 hook이나 helper function을 사용
- useCustomHook(), isEmpty(), isReadyToShip()
- Utils와 같은 최상위 공통 폴더에서 관리

## 마무리
- DDD는 복잡한 비즈니스 상황을 단순화하여 관리할 수 있는 도구
- 단순한 CRUD 액션만 존재한다면 => DDD는 필요 없다

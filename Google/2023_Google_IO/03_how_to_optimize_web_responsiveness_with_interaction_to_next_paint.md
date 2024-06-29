# How to optimize web responsiveness with Interaction to Next Paint
- Annie Sullivan & Michal Mocny
- [Youtube](https://youtu.be/KZ1kxzsJZ5g)

## Interaction to Next Paint(INP) will become a Core Web Vital
- FID(First Input Delay) -> INP(Interaction to Next Paint)

## Recap from last time

### Core Web Vitals
- Lagest Contentful Paint
- Cumulative Layout Shift
- First Input Delay

### Gaps in First Input Delay
- Only the first interaction
- Only until the browser starts processing the interaction
- 웹 페이지 사용자 시간의 90%는 초기로드 이후에 소비된다
- 브라우저가 상호작용 처리를 시작할 때가지만 측정

### Interaction to Next Paint
- Measures from
   - Tab
   - Click
   - Keypress
   - To next screen update
- FID 대비 웹페이지 사용자 경험을 훨씬 더 잘 캡쳐한다

### Rage Click
- 분노 클릭, 유저가 연속으로 같은 지점을 연속으로 클릭하는 것
- 사용자 좌절의 신호

## Debugging deep dive
- INP Snippet
- INP의 임계값: 200ms

### AS-IS
```jsx
function filterResults(sailBoadData, searchTerm) {
  const ret = [];

  for (let sailBoat of sailBoadData) {
    const reuslt = scoreMatch(sailBoat, searchTerm);
    ret.push(result);
  }

  return ret.sort((a, b) => a.score - b.score);
}

function AutoComplete({ searchTerm }) {
  // 생략
  const reuslt = filterResults(sailBoadData, searchTerm);

  return (
    <>
      {reuslt.map(() => {
        return <Reuslt result={}>
      })}
    </>
  );
}

function SailingAppComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const onInput = (e) => setSearchTerm(e.target.value);

  return (
    <main>
      <SearchBar searchTerm={searchTerm} onInput={onInput} />
      <AutoComplete searchTerm={searchTerm} />
    </main>
  );
}
```

### TO-BE
```jsx
async function filterResults(sailBoadData, searchTerm, signal) {
  const ret = [];

  for (let sailBoat of sailBoadData) {
    // scheduler.yield API or Polyfill
    await yieldToMain();
    if (signal.aborted) return [];

    const reuslt = scoreMatch(sailBoat, searchTerm);
    ret.push(result);
  }

  return ret.sort((a, b) => a.score - b.score);
}

function AutoComplete({ searchTerm, abortSignal}) {
  // 생략
  const reuslt = filterResults(sailBoadData, searchTerm, abortSignal);

  return (
    <>
      {reuslt.map(() => {
        return <Reuslt result={}>
      })}
    </>
  );
}

function SailingAppComponent() {
  const [isPending, startSpecialTransition, abortSignal] = useAbortSignallingTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [autoCompleteTerm, setAutoCompleteTerm] = useState(searchTerm);
  const isPending = searchTerm !== autoCompleteTerm;

  const onInput = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    await startSpecialTransition(() => {
      setAutoCompleteTerm(newSearchTerm);
    });
  };

  return (
    <main className={isPending ? "blurred" : ""}>
      <SearchBar searchTerm={searchTerm} onInput={onInput} />
      <Suspense>
        <AutoComplete searchTerm={autoCompleteTerm} abortSignal={abortSignal} />
      </Suspense>
    </main>
  );
}
```

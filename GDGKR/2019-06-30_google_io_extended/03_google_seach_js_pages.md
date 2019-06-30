# Google Search and JavaScript Sites
- 조은
- 발표자료 - TBD

# 검색이란?
- 데이터를 모아서 필요한 데이터만 정제한 후 유용한 것만 다시 검색 결과에 노출시키는 것

## 데이터를 모으자
- Googlebot: Google에서 웹 페이지를 수집하기 위해 사용하는 크롤러

### 전통적인 웹 사이트
- 콘텐츠는 서버에서 만들어내서 내려주고, JS는 User Interaction만을 위해서 사용

### 현대의 웹 사이트
- 서버에서는 API만 만들어서 내려주고, 웹사이트 내에서는 AJAX를 이용해서 데이터를 주고 받음
- 콘텐츠를 JS로 생성한다!

> JS 실행 없이는 콘텐츠를 이해하는 것이 어려움! 따라서 Gogolebot도 진화한다!

### 진화 첫 번째. Googlebot + Chrome
- 수집한 사이트를 Rendering하기 위해서 Chrome(v41)을 사용
- Chrome Version의 상태가?(...)

### 진화 두 번째. Googlebot + Puppeteer
- Puppeteer: Headless Chrome을 더 잘 구동하기 위해서 사용하는 Node.js Library, 최신 Chrome Version을 사용함
- https://pptr.dev
- https://github.com/GoogleChrome/puppeteer

> 띠라서, SPA라고 해서 안되는 것이 아니다!
> 구글 검색에 상위 노출되기 위해서는 SEO를 고려해야 한다!

# SEO(Search Engine Optimization)
- 검색 엔진 최적화
- 아마, 직원들도 모를거다.. 수많은 알고리즘이 쌓이고 쌓인 구조

## Robots.txt
- 딱히 막을 것이 없다면, 굳이 Robots.tst를 추가할 필요는 없음!

### Bad Case 1
Robot.txt를 이용해 도메인 전체의 검색을 막는 경우

```
User-agent: *
Disallow: /
```

### Bad Case 2
일부를 막았지만 도메인(admin, internal)이 노출된 케이스

```
User-agent: *
Disallow: /admin/
Disallow: /internal/
```

### SEO 권장사항

#### 검색이 안되어야 한다면?
1. 도메인을 아예 분리한 후, 해당 도메인을 통째로 차단합니다.
2. 검색되지 않아야 하는 내부 페이지 등은 인증을 거쳐야지만 볼 수 있도록 합니다.

#### <title>을 적절하게 사용
적절하게 콘텐츠를 설명하는 제목을 사용하면서도, 사이트를 잘 설명하고 있는 경우

```HTML
<title>치킨 Recipe - 홍길동's Recipe</title>
<title>맥주 Recipe - 홍길동's Recipe</title>
<title>곱창전골 Recipe - 홍길동's Recipe</title>
<title>냉면 Recipe - 홍길동's Recipe</title>
```

#### 올바른 Description 사용
`<meta name="description" content="어쩌고 저쩌고">`

##### Bad Case 1
선언을 안한 경우, 이 경우 페이지에서 불러온 내용을 보여줌

##### Bad Case 2
<og:description>만 선언해놓고 설명도 대충 쓴 경우

#### 올바른 HTML 요소 사용

##### 페이지 이동

```HTML
<a href="page">페이지 이동</a> (O)
<a href="page" onClick="beforeMove()">페이지 이동</a> (O)
<button onClick="move('page')">페이지 이동</button> (X)
<div onClick="move('page')">페이지 이동</div> (X)
```

##### 제목

```HTML
<h1>제목 1</h1> (O)
<div class="h1">제목 1</div> (X)
<div class="title">제목 1</div> (X)
```

##### 반응형 웹 디자인
모바일을 지원하는 페이지를 우선적으로 노출하도록 개발

##### Structured Data
- HTML을 넘어서 이 콘텐츠가 어떤 데이터를 나타내는지 설명하는 요소
- https://schema.org
- itemscope
- itemtype
- itemprop
- Google Seach에서 지원하는 목록
   - https://developers.google.com/search/docs/data-types/article
- Lighthouse

```HTML
<div class="recipe" itemscope itemtype="http://schema.org/Recipe">
  <h1 class="recipe-title" itemprop="name">Chicken</h1>
  <p><meta itemprop="cookTime" content="PT40M">40분정도 소요됩니다</p>
  <ol class="list" itemprop="recipeInstructions">
    <li class="item">어쩌구 저쩌구</li>
    <li class="item">어쩌구 저쩌구</li>
    <li class="item">어쩌구 저쩌구</li>
  </ol>
</div>
```

##### 그 외에
- 속도가 빨라야 합니다.
- 모바일을 지원해야 합니다.
- 기타등등

> 나무위키, 망고플레이트가 SEO가 잘 정리되어 있는 예제로 쓸만하다

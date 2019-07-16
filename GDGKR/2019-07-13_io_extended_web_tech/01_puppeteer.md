# Puppeteer:Getting Started
- 이현섭 / GDG WebTech Organizer
- [발표자료](https://www.slideshare.net/hyunseoblee7/puppeteer-getting-started?fbclid=IwAR14_jWTmmGq_O6rK48ECQ5qkCrtDU2m-pOfxQInDWdLqdo3HbFia2eTxcQ)
- https://github.com/HyunSeob/puppeteer-getting-started

# What is Pupperteer?
- https://github.com/GoogleChrome/puppeteer
- Chrome/Chromium을 제어할 수 있는 API Library
- Node.js
- Chrome으로 할 수 있는 일을 자동화할 수 있음
   - E2E Testing
   - SPA Prerendering
   - Web Site Crawling / 기존 Python으로 하던 것처럼 동일하게 동작 가능
   - Generating PDF
- Maintained by Google

# Possibly Replace
- phantomJS
- prerender.io: SPA Prerendering
- Selenium Dirver: E2E
- Cheerio: Crawling

# Sample Code

## ScreenShot
```JavaScript
const puppeteer = require('puppeteer')

async function doScreenShot() {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()

  await page.setViewport({
    width: 1200,
    height: 800,
  })

  await page.goto('https://github.com/GoogleChrome/puppeteer')
  await page.screenshot({ path: 'puppeteer.jpg' })

  await browser.close()
}

doScreenShot()
```

## PDF Generation
```JavaScript
const puppeteer = require('puppeteer')

async function generatePdf() {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()

  await page.setViewport({
    width: 1200,
    height: 800,
  })

  await page.goto('https://github.com/GoogleChrome/puppeteer')
  await page.pdf({
    path: 'puppeteer_home.pdf',
    format: 'A4',
  })

  await browser.close()
}

generatePdf()
```

## 자주쓰는 함수목록
```JavaScript
await page.type('#identifierId', myAccount.email)
await page.click('#identifierId')
await page.mouse.move(200, 400)
await page.keboard.press('Backspace')

await page.waitForNavigation()
await page.waitForSelector('input[type=password]')

await page.evalueate(
  ({email}) => {
    // 아래 코드는 Browser Runtime
    const emailInput = document.getElementById('idenditiferId')
    emailInput.value = email
  },
  myAccount
)

const buttonTitle = await page.$eval( // page.$$eval() 은 복수의 Elements callback으로 array가 전달됨
  'a[title^=Gogole 계정]',
  button => button.title
)
// 위와 아래는 기능적으로 완전히 동일함
const buttonTitle = await page.evaluate(() => {
  const button = document.querySelector('a[title^=Gogole 계정]')
  return button.title
})
```

## With Jest
- [Sample](https://github.com/HyunSeob/puppeteer-getting-started/blob/master/__tests__/google.js)
- jest-puppeteer

## Crawling
```JavaScript
async function doCrawling() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let allPosts = [];

  await page.goto("https://hyunseob.github.io");

  while (1) {
    try {
      const postTitles = await page.$$eval(".post-list__item__title", posts =>
        posts.map(v => v.textContent)
      );
      allPosts = [...allPosts, ...postTitles];

      const nextUrl = await page.$eval(".extend.next", button => button.href);

      await page.goto(nextUrl);
    } catch {
      break;
    }
  }

  console.log(allPosts.join("\n"));
  await browser.close();
}

doCrawling()
```

## Prerendering: react-snap
- https://web.dev/prerender-with-react-snap
- SPA를 위한 Prerenderer
- SEO / Meta Tag Pre-renderer
- React는 물론 Vue, Preact에도 사용 가능
- 내부적으로 Puppeteer 사용

> https://web.dev

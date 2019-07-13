const puppeteer = require('puppeteer')

async function doCrawling() {
  const browser = await puppeteer.launch({ headless: false });
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

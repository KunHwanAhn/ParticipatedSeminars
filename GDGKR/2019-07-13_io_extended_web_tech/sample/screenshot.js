const puppeteer = require('puppeteer')

async function doScreenShot() {
  const browser = await puppeteer.launch({ headless: false })
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

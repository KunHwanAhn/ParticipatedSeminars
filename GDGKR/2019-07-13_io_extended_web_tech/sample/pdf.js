const puppeteer = require('puppeteer')

async function generatePdf() {
  const browser = await puppeteer.launch({ headless: true })
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

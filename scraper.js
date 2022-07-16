const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.google.com';

console.log("EMPEZANDO");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({path: 'example.png'});
  let content = await page.content;
  console.log(content);

  await browser.close();
})();
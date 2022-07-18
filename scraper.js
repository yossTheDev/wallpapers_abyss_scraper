const cheerio = require("cheerio");
const puppeteer = require('puppeteer');


//TODO Convert project to TypeScript
//TODO Set Category Enum
//TODO Get Random Wallpapes by Category


//Wallpaper Object
function Wallpaper (id,wallpaperName,link) {
  this.id = id;
  this.wallpaperName = wallpaperName
  this.link = link;
}


//Get All Wallpapers of a Page
async function getWallpaper (url) {
  //Config Puppeteer Browser
  const browser = await puppeteer.launch({headless:true,args:['--no-sandbox']});
  const page = await browser.newPage();

  //Go to Page
  await page.goto(url)

  //Await for load all images
  await page.waitForSelector('div .item');

  //Get Body html to scrap
  const bodyHandle = await page.$('body');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);

  //Now load html data in cheerio
  const $ = cheerio.load(html);

  //Define the list with all wallpapers
  let wallpaperList = [];

  //Get all wallpapers => Note: In wallpapers abyss, wallpapers is a div with .thumb-element class
  $('div .item').map((i,el)=>{

     let wallpaper = new Wallpaper(
      el.attribs['id'], //ID Ej:wallpaper_934952
      el.childNodes[1].childNodes[1].attribs['title'], //wallpaper Name Ej: GTA V wallpaper 
      el.childNodes[1].attribs['href'], //Link
     )
     
     //Add to the list
     wallpaperList.push(wallpaper);
    });

  //Close the Browser  
  await browser.close();

  return wallpaperList;
  
};

//Get Wallpaper Download Link
async function getWallpaperImg(url){
  //Config Puppeteer Browser
  const browser = await puppeteer.launch({headless:true,args:['--no-sandbox']});
  const page = await browser.newPage();
 
  //Go to Page
  await page.goto(url)

  //Await for load all images
  //await page.waitForTimeout(4000);
  await page.waitForSelector('img .img-full-size')


  //Get Body html to scrap
  const bodyHandle = await page.$('body');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);

  //Now load html data in cheerio
  const $ = cheerio.load(html);

  console.log(html);

  //The result url
  let wallpaperUrl;

  //Extract all img and t the download link
  $('img').map((i,el)=>{
    //console.log(el);

    if(el.attribs['class'] === 'img-full-size')
    wallpaperUrl = el.attribs['src'];
  })

  //Close the Browser  
  await browser.close();

  return wallpaperUrl;
}


module.exports = getWallpaper, getWallpaperImg

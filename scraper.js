const cheerio = require("cheerio");
const puppeteer = require('puppeteer');

//Wallpaper Object
function Wallpaper (id,wallpaperName,link) {
  this.id = id;
  this.wallpaperName = wallpaperName
  this.link = link;
}

async function getWall () {
  //Config Puppeteer Browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //Go to Page
  await page.goto('http://localhost/wallpapersCollection.html')

  //Await for load all images
  await page.waitForSelector('img').then(()=> console.log("YA SE ENCONTRO"));

  //Get Body html to scrap
  const bodyHandle = await page.$('body');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);

  //Now load html data in cheerio
  const $ = cheerio.load(html);

  //Define the list with all wallpapers
  let wallpaperList = [];

  //Get all wallpapers => Note: In wallpapers abyss, wallpapers is a div with .thumb-element class
  $('div .thumb-element').map((i,el)=>{

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

//Get All Wallpepers in provided url
async function getWallpapers (url) {

  //Initialize Puppeteer Brwoser
  const browser = await puppeteer.launch({headless:false, args:['--no-sandbox']});
  const page = await browser.newPage();

  //Go to the url
  await page.goto(url)

  console.log("Empezando")

  await page.waitForSelector('.large-12 columns')

  console.log(document.querySelector('.large-12 columns'))

  //Scraping Data
  await page.evaluate(()=>{

    console.log("Evaluando")
    var a = document.querySelector('.large-12 columns');


    return console.log(a);

    //List of all Extracted Wallpapers
    let allWallpapers = []

    let wallpapers = document.querySelectorAll('.thumb-element')
    console.log(wallpapers[1]);

    wallpapers.forEach(element => {
      //Get wallpaper elements
      let wallpaperItem = new wallpaper(
        id = element.getAttribute('id'),
        link = element.children[0].getAttribute('href'),
        wallpaperName = element.children[0].children[0].getAttribute('title')
      )

      console.log(wallpaperItem.id);

      //Add to wallpaper list
      allWallpapers.push(wallpaperItem);
      
    });

    //Return wallpapers list
    return allWallpapers;
  })

}

//getWallpapers('https://mobile.alphacoders.com/by-category/32')

//getWallpapers('http://localhost/dashboard/')

async function start () {
  var a = await getWall();
  console.log(a);
}

start();

//console.log(getWallpapers('https://mobile.alphacoders.com/by-category/32'));

module.exports = getWallpapers

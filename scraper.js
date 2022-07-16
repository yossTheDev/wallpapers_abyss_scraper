const puppeteer = require('puppeteer');

//Wallpaper Object
function wallpaper (id,wallpaperName,link) {
  this.id = id;
  this.wallpaperName = wallpaperName
  this.link = link;
}

//Get All Wallpepers in provided url
async function getWallpapers (url) {

  //Initialize Puppeteer Brwoser
  const browser = await puppeteer.launch({headless:true, args:['--no-sandbox']});
  const page = await browser.newPage();

  //Go to the url
  await page.goto(url)

  //List of all Extracted Wallpapers
  let allWallpapers = []

  //Scraping Data
  await page.evaluate(()=>{
    let wallpapers = document.querySelectorAll('.thumb-element')

    wallpapers.forEach(element => {
      //Get wallpaper elements
      let wallpaperItem = new wallpaper(
        id = element.getAttribute('id'),
        link = element.children[0].getAttribute('href'),
        wallpaperName = element.children[0].children[0].getAttribute('title')
      )

      //Add to wallpaper list
      allWallpapers.push(wallpaperItem);
      
    });

    //Return wallpapers list
    return allWallpapers;
  })
}

console.log(getWallpapers('https://mobile.alphacoders.com/by-category/32'));

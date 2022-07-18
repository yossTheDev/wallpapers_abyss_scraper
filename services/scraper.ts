import * as cheerio from 'cheerio'; 
import * as puppeteer from 'puppeteer'

interface Wallpaper{
    id:string,
    wallpaperName: string,
    link: string

}
  
//Get All Wallpapers of a Page
async function getWallpaper (url : string) {
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
    let wallpaperList = new Array();
  
    //Get all wallpapers => Note: In wallpapers abyss, wallpapers is a div with .thumb-element class
    $('div .item').map((i,el)=>{

        let wallpaper: Wallpaper =
        {
            id : el.attribs['id'],
            wallpaperName: ((((el.childNodes[1]) as unknown as cheerio.Element).childNodes[1]) as unknown as cheerio.Element).attribs['title'],
            link: ((el.childNodes[1]) as unknown as cheerio.Element).attribs['href']
        };   
  
       //console.log(wallpaper);

       //Add to the list
       wallpaperList.push(wallpaper);
      });
  
    //Close the Browser  
    await browser.close();
  
    return wallpaperList;
    
};
  
//Get Wallpaper Download Link
async function getWallpaperImg(url : string){
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

export default getWallpaper
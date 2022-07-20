import * as cheerio from 'cheerio'; 
import * as puppeteer from 'puppeteer'
import axios from 'axios'

//#region Enums and Interfaces
//Wallpaper Object
interface Wallpaper{
    id:string,
    wallpaperName: string,
    link: string

}

//Resolution Mobile or Desktop
enum Resolution{
    Mobile = 'Mobile',
    Desktop = 'Desktop'
}

//Categories Category = number
enum Categories{
    Abstract = 1,
    Animal = 2,
    Anime = 3,
    Artistics = 4,
    Celebrity = 7,
    Comics = 8,
    Dark = 9,
    Earth = 10,
    Fantasy = 11,
    Food = 12,
    Game = 14,
    Holiday = 15,
    Humor = 13,
    ManMade = 16,
    Men = 17,
    Military = 18,
    Misc = 19,
    Movies =  20,
    Music = 22,
    Photography = 24,
    Products = 25,
    Religious = 26,
    SciFi = 27,
    Sport = 28,
    Technology = 30,
    TVshows = 29,
    Vehicles = 31,
    VideoGames = 32,
    Weapons = 34,
    Women = 33
}
//#endregion

//#region  Handy Tools
//Inclusive min exlusive max
function randomNumber(max: number, min:number): number{
    return Math.floor(Math.random() * (max - min)) + min
};

//Make the link based on resolution(mobile or desktop) and categories
function makeLink(resolution : Resolution, categories: Categories): string{

    if(resolution === Resolution.Mobile){
        return `https://mobile.alphacoders.com/by-category/${categories}`
    }else{
        return `https://wall.alphacoders.com/by_category.php?id=${categories}`
    }
};
//#endregion

//Scraper Object
let Scraper = {
   
    //Get Random Wallpaper based in the category
    async getRandomWallpaper(resolution : Resolution, categories: Categories){
        //Get All wallpapers in the defined category page
        let wallpapers = await this.getWallpaper(makeLink(resolution,categories) + `?page=${randomNumber(0,100)}`)

        //Return Random Wallpaper
        return wallpapers[randomNumber(0,wallpapers.length)]
    },
      
    //Get All Wallpapers of a Page
    async getWallpaper (url : string) {
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
        
    },
      
    //Get Wallpaper Download Link
    async getWallpaperImg(url : string){
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
    },

    //Get Download Link
    async getWallpaperLink(url: string){
        //Load url and get response
        const resp = await axios.get(url)

        //Now load html data in cheerio
        const $ = cheerio.load(resp.data);

        //The result url
        let wallpaperUrl : string;
      
        //Extract all img and get the the download link
        $('img').map((i,el)=>{
          //console.log(el);
      
          if(el.attribs['class'] === 'img-full-size')
          wallpaperUrl = el.attribs['src'];
        })

        //Retur Donload Link
        return wallpaperUrl;
    }
    
};


export default {Scraper, Resolution, Categories}
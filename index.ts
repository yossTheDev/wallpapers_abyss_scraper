import express, { Express, Request, Response } from 'express';
import scraper from './services/scraper';
import url from 'url'

//#region configuration
const app: Express = express();
const port = process.env.PORT || 4000;

//Configs
app.set("port",port);
app.set("json spaces",2);

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//#endregion


//#region Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

//Ger Random Wallpaper parameters => category(see the readme for all category codes) , resolution (mobile or desktop)
//Example request .../api/getWallpaper?category=1&resolution=mobile
app.get("/api/getWallpaper",async (req, res) => {

  //Get Category and Resolution Parameter => Category is a numer and resolution can be Mobile Or Desktop
  const category = url.parse(req.url,true).query["category"];
  const resol = url.parse(req.url,true).query["resolution"];

  if(category && resol){
    //Set Resolution
     let resolution = scraper.Resolution.Desktop;

    if(resol === 'desktop'){
      resolution = scraper.Resolution.Desktop
    }else{
      resolution = scraper.Resolution.Mobile
    }

    //Get Random Wallpaper for the defined category and resolutions
    //scraper.Scraper.getRandomWallpaper(resolution,category)

    //console.log('http://'  + urls);
    res.status(200).json(await scraper.Scraper.getRandomWallpaper(resolution,((category as unknown) as string)))
    //res.status(200).json(await scraper.Scraper.getWallpaper('http://localhost/wallpapersCollection.html'))

    //res.status(200).send(`The category is ${category} and the resolution is ${resolution} => ${scraper.Categories.Animal}`);
  }else{
    res.status(403).send('Error incorrect parameters!')
  }
})

//Get wallpaper download link
//Example request .../api/getwallpaperLink?url=https://wall.alphacoders.com/big.php?i=20658
app.get("/api/getWallpaperLink/",async (req, res) => {

  //Get link in urls parameters
  const link = url.parse(req.url,true).query["url"];

  console.log(link)

  //Verify is provided valid link
  if(link){
    res.status(200).json(await scraper.Scraper.getWallpaperLink('https://' + (link as unknown)as string))
  }else{
    res.status(400).send('Error incorrect parameters!')
  }
})

//#endregion

//App Inicialization
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
import express, { Express, Request, Response } from 'express';
import { getRandomWallpaper, getRandomWallpaperCollection, getWallpaperDesktopLink, getWallpaperMobileLink, Resolution } from './services/scraper';
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
  res.send('Wallpaper Abyss Scraper is running...');
});

/*Ger Random Wallpaper parameters => category(see the readme for all category codes) , resolution (mobile or desktop)
Example request .../api/getWallpaper?category=1&resolution=mobile
parameters => category(see the readme for all category codes) , resolution (mobile or desktop)
*/
app.get("/api/getRandomWallpaper",async (req, res) => {

  //Get Category and Resolution Parameter => Category is a numer and resolution can be Mobile Or Desktop
  const category = url.parse(req.url,true).query["category"];
  const resol = url.parse(req.url,true).query["resolution"];

  if(category && resol){
    //Set Resolution
     let resolution = Resolution.Desktop;

    if(resol === 'desktop'){
      resolution = Resolution.Desktop
    }else{
      resolution = Resolution.Mobile
    }

    //Try to get Wallpapers
    try{
      let wallpapers = await getRandomWallpaper(resolution,((category as unknown) as string))
      getRandomWallpaper
      res.status(200).json(wallpapers);
    }catch(ex){
      res.status(403).send('Error processing request')
    }
    res.status(200).json()

  }else{
    res.status(403).send('Error incorrect parameters!')
  }
})


/*
Ger Random Wallpaper Collection 
parameters => category(see the readme for all category codes) , resolution (mobile or desktop)
Example request .../api/getRandomWallpaperCollection?category=1&resolution=mobile
*/
app.get("/api/getRandomWallpaperCollection",async (req, res) => {

  //Get Category and Resolution Parameter => Category is a numer and resolution can be Mobile Or Desktop
  const category = url.parse(req.url,true).query["category"];
  const resol = url.parse(req.url,true).query["resolution"];

  if(category && resol){
    //Set Resolution
     let resolution = Resolution.Desktop;

    if(resol === 'desktop'){
      resolution = Resolution.Desktop
    }else{
      resolution = Resolution.Mobile
    }

    //Try to get Wallpapers
    try{
      let wallpapers = await getRandomWallpaperCollection(resolution,((category as unknown) as string))
      res.status(200).json(wallpapers);
    }catch(ex){
      res.status(403).send('Error processing request')
    }
    res.status(200).json()

  }else{
    res.status(403).send('Error incorrect parameters!')
  }
})

/*Get Wallpaper Download Link
parameters => category(see the readme for all category codes) , resolution (mobile or desktop)
Example request .../api/getwallpaperLink?url=https://wall.alphacoders.com/big.php?i=20658&resolution=desktop
*/
app.get("/api/getWallpaperLink/",async (req, res) => {

  //Get link in urls parameters
  const link = url.parse(req.url,true).query["url"];
  const resol = url.parse(req.url,true).query["resolution"];

  //console.log(link)

  //Verify is provided a valid link and wallpaper resolution
  if(link && resol){
    if(resol === 'desktop'){
      //Get Wallpaper for Desktop Resolution
      res.status(200).json(await getWallpaperDesktopLink('https://' + (link as unknown)as string))
    }else{
      //Get Wallpaper for Mobile Resolution
      res.status(200).json(await getWallpaperMobileLink('https://' + (link as unknown)as string))
    }

  }else{
    res.status(400).send('Error incorrect parameters!')
  }
})

//#endregion

//App Inicialization
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
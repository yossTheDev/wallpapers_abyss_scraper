import express, { Express, Request, Response } from 'express';
import scraper from './services/scraper';
import url from 'url'

const app: Express = express();
const port = process.env.PORT || 4000;

//Configs
app.set("port",port);
app.set("json spaces",2);

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

/*app.get('/get', async (req: Request, res: Response) => {
  res.send(await scraper.Scraper.getWallpaper('https://mobile.alphacoders.com/by-category/32?page=2'));
});*/


//Ger Random Wallpaper parameters => category , resolution
app.get("/api/getWallpaper",async (req, res) => {

  //Get Url Parameter
  const category = url.parse(req.url,true).query["category"];
  const resolution = url.parse(req.url,true).query["resolution"];


  //scraper.Scraper.getRandomWallpaper(category,resolution)

  //console.log('http://'  + urls);

  res.send(`The category is ${category} and the resolution is ${resolution} => ${scraper.Categories.Animal}`);

  //Respond
  //res.json({'urls': getWallpaperImg('https://' + urls)});
})


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
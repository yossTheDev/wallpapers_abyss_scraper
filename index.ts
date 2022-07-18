import express, { Express, Request, Response } from 'express';
import getWallpaper from './services/scraper'

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

app.get('/get', async (req: Request, res: Response) => {
  res.send(await getWallpaper('https://mobile.alphacoders.com/by-category/32?page=2'));
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scraper_1 = __importDefault(require("./services/scraper"));
const url_1 = __importDefault(require("url"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
//Configs
app.set("port", port);
app.set("json spaces", 2);
//Middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
/*app.get('/get', async (req: Request, res: Response) => {
  res.send(await scraper.Scraper.getWallpaper('https://mobile.alphacoders.com/by-category/32?page=2'));
});*/
//Ger Random Wallpaper parameters => category , resolution
app.get("/api/getWallpaper", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get Url Parameter
    const category = url_1.default.parse(req.url, true).query["category"];
    const resolution = url_1.default.parse(req.url, true).query["resolution"];
    //scraper.Scraper.getRandomWallpaper(category,resolution)
    //console.log('http://'  + urls);
    res.send(`The category is ${category} and the resolution is ${resolution} => ${scraper_1.default.Categories.Animal}`);
    //Respond
    //res.json({'urls': getWallpaperImg('https://' + urls)});
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

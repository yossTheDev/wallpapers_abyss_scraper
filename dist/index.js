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
//#region configuration
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
//Configs
app.set("port", port);
app.set("json spaces", 2);
//Middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//#endregion
//#region Routes
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
//Ger Random Wallpaper parameters => category(see the readme for all category codes) , resolution (mobile or desktop)
//Example request .../api/getWallpaper?category=1&resolution=mobile
app.get("/api/getWallpaper", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get Category and Resolution Parameter => Category is a numer and resolution can be Mobile Or Desktop
    const category = url_1.default.parse(req.url, true).query["category"];
    const resol = url_1.default.parse(req.url, true).query["resolution"];
    if (category && resol) {
        //Set Resolution
        let resolution = scraper_1.default.Resolution.Desktop;
        if (resol === 'desktop') {
            resolution = scraper_1.default.Resolution.Desktop;
        }
        else {
            resolution = scraper_1.default.Resolution.Mobile;
        }
        //Get Random Wallpaper for the defined category and resolutions
        //scraper.Scraper.getRandomWallpaper(resolution,category)
        //console.log('http://'  + urls);
        res.status(200).json(yield scraper_1.default.Scraper.getRandomWallpaper(resolution, category));
        //res.status(200).json(await scraper.Scraper.getWallpaper('http://localhost/wallpapersCollection.html'))
        //res.status(200).send(`The category is ${category} and the resolution is ${resolution} => ${scraper.Categories.Animal}`);
    }
    else {
        res.status(403).send('Error incorrect parameters!');
    }
}));
//Get wallpaper download link
//Example request .../api/getwallpaperLink?url=https://wall.alphacoders.com/big.php?i=20658
app.get("/api/getWallpaperLink/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get link in urls parameters
    const link = url_1.default.parse(req.url, true).query["url"];
    console.log(link);
    //Verify is provided valid link
    if (link) {
        res.status(200).json(yield scraper_1.default.Scraper.getWallpaperLink('https://' + link));
    }
    else {
        res.status(400).send('Error incorrect parameters!');
    }
}));
//#endregion
//App Inicialization
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

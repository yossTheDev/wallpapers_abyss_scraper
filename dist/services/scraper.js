"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cheerio = __importStar(require("cheerio"));
const puppeteer = __importStar(require("puppeteer"));
const axios_1 = __importDefault(require("axios"));
//Resolution Mobile or Desktop
var Resolution;
(function (Resolution) {
    Resolution["Mobile"] = "Mobile";
    Resolution["Desktop"] = "Desktop";
})(Resolution || (Resolution = {}));
//Categories Category = number
var Categories;
(function (Categories) {
    Categories[Categories["Abstract"] = 1] = "Abstract";
    Categories[Categories["Animal"] = 2] = "Animal";
    Categories[Categories["Anime"] = 3] = "Anime";
    Categories[Categories["Artistics"] = 4] = "Artistics";
    Categories[Categories["Celebrity"] = 7] = "Celebrity";
    Categories[Categories["Comics"] = 8] = "Comics";
    Categories[Categories["Dark"] = 9] = "Dark";
    Categories[Categories["Earth"] = 10] = "Earth";
    Categories[Categories["Fantasy"] = 11] = "Fantasy";
    Categories[Categories["Food"] = 12] = "Food";
    Categories[Categories["Game"] = 14] = "Game";
    Categories[Categories["Holiday"] = 15] = "Holiday";
    Categories[Categories["Humor"] = 13] = "Humor";
    Categories[Categories["ManMade"] = 16] = "ManMade";
    Categories[Categories["Men"] = 17] = "Men";
    Categories[Categories["Military"] = 18] = "Military";
    Categories[Categories["Misc"] = 19] = "Misc";
    Categories[Categories["Movies"] = 20] = "Movies";
    Categories[Categories["Music"] = 22] = "Music";
    Categories[Categories["Photography"] = 24] = "Photography";
    Categories[Categories["Products"] = 25] = "Products";
    Categories[Categories["Religious"] = 26] = "Religious";
    Categories[Categories["SciFi"] = 27] = "SciFi";
    Categories[Categories["Sport"] = 28] = "Sport";
    Categories[Categories["Technology"] = 30] = "Technology";
    Categories[Categories["TVshows"] = 29] = "TVshows";
    Categories[Categories["Vehicles"] = 31] = "Vehicles";
    Categories[Categories["VideoGames"] = 32] = "VideoGames";
    Categories[Categories["Weapons"] = 34] = "Weapons";
    Categories[Categories["Women"] = 33] = "Women";
})(Categories || (Categories = {}));
//#endregion
//#region  Handy Tools
//Inclusive min exlusive max
function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}
;
//Make the link based on resolution(mobile or desktop) and categories
function makeLink(resolution, categories) {
    if (resolution === Resolution.Mobile) {
        return `https://mobile.alphacoders.com/by-category/${categories}`;
    }
    else {
        return `https://wall.alphacoders.com/by_category.php?id=${categories}`;
    }
}
;
//#endregion
//Scraper Object
let Scraper = {
    //Get Random Wallpaper based in the category
    getRandomWallpaper(resolution, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallpapers = [];
            if (resolution === Resolution.Desktop) {
                //Get All wallpapers in the defined category page
                wallpapers = yield this.getDesktopWallpaper(makeLink(resolution, categories) + `?page=${randomNumber(0, 100)}`);
            }
            else {
                //Get All wallpapers in the defined category page
                wallpapers = yield this.getMobileWallpaper(makeLink(resolution, categories) + `?page=${randomNumber(0, 100)}`);
            }
            //Return Random Wallpaper
            return wallpapers[randomNumber(0, wallpapers.length)];
        });
    },
    //Get All Mobile Wallpapers of a Page
    getMobileWallpaper(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            //Config Puppeteer Browser
            const browser = yield puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
            const page = yield browser.newPage();
            //Go to Page
            yield page.goto(url);
            //Await for load all images
            yield page.waitForSelector('div .item');
            //Get Body html to scrap
            const bodyHandle = yield page.$('body');
            const html = yield page.evaluate(body => body.innerHTML, bodyHandle);
            //Now load html data in cheerio
            const $ = cheerio.load(html);
            //Define the list with all wallpapers
            let wallpaperList = new Array();
            //Get all wallpapers => Note: In wallpapers abyss, wallpapers is a div with .thumb-element class
            $('div .item').map((i, el) => {
                let wallpaper = {
                    id: el.attribs['id'],
                    wallpaperName: ((el.childNodes[1]).childNodes[1]).attribs['title'],
                    link: 'mobile.alphacoders.com' + (el.childNodes[1]).attribs['href']
                };
                //console.log(wallpaper);
                //Add to the list
                wallpaperList.push(wallpaper);
            });
            //Close the Browser  
            yield browser.close();
            return wallpaperList;
        });
    },
    //Get All Desktop Wallpapers of a Page
    getDesktopWallpaper(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            //Config Puppeteer Browser
            const browser = yield puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
            const page = yield browser.newPage();
            //Go to Page
            yield page.goto(url);
            //Await for load all images
            yield page.waitForSelector('div .thumb-container');
            //Get Body html to scrap
            const bodyHandle = yield page.$('body');
            const html = yield page.evaluate(body => body.innerHTML, bodyHandle);
            //Now load html data in cheerio
            const $ = cheerio.load(html);
            //Define the list with all wallpapers
            let wallpaperList = new Array();
            //Get all wallpapers => Note: In wallpapers abyss, wallpapers is a div with .thumb-element class
            $('div .thumb-container').map((i, el) => {
                let wallpaper = {
                    id: Math.random().toString(),
                    wallpaperName: el.childNodes[1].childNodes[1].attribs['title'],
                    link: 'wall.alphacoders.com' + el.childNodes[1].childNodes[1].attribs['href']
                };
                //console.log(wallpaper);
                //Add to the list
                wallpaperList.push(wallpaper);
            });
            //Close the Browser  
            yield browser.close();
            console.log(wallpaperList);
            return wallpaperList;
        });
    },
    //Get Wallpaper Download => Link Unused Puppeteer Version
    getWallpaperImg(url) {
        return __awaiter(this, void 0, void 0, function* () {
            //Config Puppeteer Browser
            const browser = yield puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
            const page = yield browser.newPage();
            //Go to Page
            yield page.goto(url);
            //Await for load all images
            //await page.waitForTimeout(4000);
            yield page.waitForSelector('img .img-full-size');
            //Get Body html to scrap
            const bodyHandle = yield page.$('body');
            const html = yield page.evaluate(body => body.innerHTML, bodyHandle);
            //Now load html data in cheerio
            const $ = cheerio.load(html);
            console.log(html);
            //The result url
            let wallpaperUrl;
            //Extract all img and t the download link
            $('img').map((i, el) => {
                //console.log(el);
                if (el.attribs['class'] === 'img-full-size')
                    wallpaperUrl = el.attribs['src'];
            });
            //Close the Browser  
            yield browser.close();
            return wallpaperUrl;
        });
    },
    //Get Download Link
    getWallpaperLink(url) {
        return __awaiter(this, void 0, void 0, function* () {
            //Load url and get response
            const resp = yield axios_1.default.get(url);
            //Now load html data in cheerio
            const $ = cheerio.load(resp.data);
            //The result url
            let wallpaperUrl;
            //Extract all img and get the the download link
            $('img').map((i, el) => {
                //console.log(el);
                if (el.attribs['class'] === 'img-full-size')
                    wallpaperUrl = el.attribs['src'];
            });
            //Retur Donload Link
            return wallpaperUrl;
        });
    }
};
exports.default = { Scraper, Resolution, Categories };

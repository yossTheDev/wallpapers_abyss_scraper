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
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const puppeteer = __importStar(require("puppeteer"));
//Get All Wallpapers of a Page
function getWallpaper(url) {
    return __awaiter(this, void 0, void 0, function* () {
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
                link: (el.childNodes[1]).attribs['href']
            };
            //console.log(wallpaper);
            //Add to the list
            wallpaperList.push(wallpaper);
        });
        //Close the Browser  
        yield browser.close();
        return wallpaperList;
    });
}
;
//Get Wallpaper Download Link
function getWallpaperImg(url) {
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
}
exports.default = getWallpaper;

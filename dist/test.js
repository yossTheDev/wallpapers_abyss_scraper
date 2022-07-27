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
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./services/scraper");
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        //var a = await Scraper.getWallpaperLink('http://localhost/wallpaperPage.html');
        let a = randomNumber(20, 50);
        let b = yield (0, scraper_1.getWallpaperImg)('https://wall.alphacoders.com/big.php?i=718222');
        console.log(b);
    });
}
//Inclusive min exlusive max
function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}
;
test();

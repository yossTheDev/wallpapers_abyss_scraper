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
const express_1 = require("express");
const url_1 = __importDefault(require("url"));
const router = (0, express_1.Router)();
router.get("/api/getWallpaper", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get Url Parameter
    const urls = url_1.default.parse(req.url, true).query["url"];
    console.log('http://' + urls);
    //Respond
    //res.json({'urls': getWallpaperImg('https://' + urls)});
}));
exports.default = router;

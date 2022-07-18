const {Router} = require('express');
const getWallpaperImg = require('../scraper');
const url = require("url");
const router = Router();

router.get("/api/getWallpaper",async (req, res) => {

    //Get Url Parameter
    const urls = url.parse(req.url,true).query["url"];
    console.log('http://'  + urls);

    //Respond
    res.json({'urls': getWallpaperImg('https://' + urls)});

})

module.exports = router
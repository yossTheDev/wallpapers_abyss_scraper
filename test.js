const getWallpaperImg = require('./scraper');

async function start () {
    //var a = await getWallpaper('http://localhost/wallpapersCollection.html');
    //var a = await getWallpaperImg('http://localhost/wallpaperPage.html');
  
    //var a = await getWallpaper('https://mobile.alphacoders.com/by-category/32?page=2');
    var a = await getWallpaperImg('https://mobile.alphacoders.com/wallpapers/view/976057/TV-Show-Moon-Knight-Phone-Wallpaper')
  
    console.log(a);
  }
  
  start();
  
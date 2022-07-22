# Wallpaper Scraper

Simple and usefull scraper for Wallpaper Abyss and Mobile Abyss pages. I use Puppeteer and cheerio to load and parse data respectively. I also includes full funtional API. Writted in TypeScript

## 💡 How To Use

## Get Random Wallpaper

Get Random Wallpaper for the defined resolution and category

Example Request

``` http
.../api/getWallpaper?category=2&resolution=mobile
```

Example Response

```json

{
  "id": "wallpaper_938159",
  "wallpaperName": "Animal Cat & Dog Phone Wallpaper",
  "link": "mobile.alphacoders.com/wallpapers/view/938159/Animal-Cat-%26-Dog-Phone-Wallpaper"
}

```

## Get Wallpaper Download Link

Get download link for the provided url (Mobile Abyss or Wallpaper Abyss)

Example Request

``` code
.../api/getwallpaperLink?url=wall.alphacoders.com/big.php?i=20658
```

Example Response

``` json

{
    https://mfiles.alphacoders.com/744/thumb-1920-744461.jpg
}
```

## Available Pages to Download Wallpapers

<https://mobile.alphacoders.com/>

<https://wall.alphacoders.com/>

## Categories for Wallpaper Abyss and Mobile Abyss

```` typescript
enum Categories
{
    Abstract = 1,
    Animal = 2,
    Anime = 3,
    Artistics = 4,
    Celebrity = 7,
    Comics = 8,
    Dark = 9,
    Earth = 10,
    Fantasy = 11,
    Food = 12,
    Game = 14,
    Holiday = 15,
    Humor = 13,
    ManMade = 16,
    Men = 17,
    Military = 18,
    Misc = 19,
    Movies =  20,
    Music = 22,
    Photography = 24,
    Products = 25,
    Religious = 26,
    SciFi = 27,
    Sport = 28,
    Technology = 30,
    TVshows = 29,
    Vehicles = 31,
    VideoGames = 32,
    Weapons = 34,
    Women = 33
}
````

## 📝📌 TO DO

Add other sources to download wallpapers

CODED BY YOSS THE DEV

✌️ CODE 4EVER ✌️

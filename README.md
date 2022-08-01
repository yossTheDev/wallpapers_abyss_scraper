# Wallpaper Scraper

Simple and usefull scraper for Wallpaper Abyss and Mobile Abyss pages. I use ``Puppeteer`` and ``cheerio`` to load and parse data respectively. I also includes full funtional API. Writted in TypeScript

## Endpoints

``Get Random Wallpaper``

``Get Random Wallpaper Collection``

``Get Wallpaper Download Link``

### Get Random Wallpaper

Get Random Wallpaper for the defined resolution and category

``Example Request``

``` http
.../api/getWallpaper?category=2&resolution=mobile
```

``Example Response``

```json

{
  "id": "wallpaper_938159",
  "wallpaperName": "Animal Cat & Dog Phone Wallpaper",
  "link": "mobile.alphacoders.com/wallpapers/view/938159/Animal-Cat-%26-Dog-Phone-Wallpaper"
}

```

### Get Random Wallpaper Collection

``Example Request``

``` http
.../api/getRandomWallpaperCollection?category=2&resolution=mobile
```

``Example Response``

```json

{
    "id": "0.6933746935077301",
    "wallpaperName": "Video Game Final Fantasy XIII HD Wallpaper | Background Image",
    "link": "wall.alphacoders.com/big.php?i=86350",
    "thumb": "https://images2.alphacoders.com/863/thumb-350-86350.jpg"
  },
  {
    "id": "0.9816691247325329",
    "wallpaperName": "Video Game EVE Online HD Wallpaper | Background Image",
    "link": "wall.alphacoders.com/big.php?i=77078",
    "thumb": "https://images4.alphacoders.com/770/thumb-350-77078.jpg"
  },
  {
    "id": "0.5496456355215082",
    "wallpaperName": "Video Game Resident Evil 5 HD Wallpaper | Background Image",
    "link": "wall.alphacoders.com/big.php?i=59391",
    "thumb": "https://images.alphacoders.com/593/thumb-350-59391.jpg"
  },
  {
    "id": "0.4378857649322374",
    "wallpaperName": "Video Game Unreal Tournament HD Wallpaper | Background Image",
    "link": "wall.alphacoders.com/big.php?i=23447",
    "thumb": "https://images3.alphacoders.com/234/thumb-350-23447.jpg"
  }

```

### Get Wallpaper Download Link

Get download link for the provided url (Mobile Abyss or Wallpaper Abyss)

``Example Request``

``` code
.../api/getwallpaperLink?url=wall.alphacoders.com/big.php?i=20658
```

``Example Response``

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

-Get Random Wallpaper Without Category

-Get Wallpapers by Subcategory

 ©️ Made by Yoss The Dev ©️

✌️ CODE 4EVER ✌️

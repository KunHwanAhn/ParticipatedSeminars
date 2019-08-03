# Going Big - PWA
- 장한보람 / GDG WebTech Organizer
- [발표자료](https://www.slideshare.net/HanboramRobinJang/io-extended-2019-webtech-going-bigpwa?fbclid=IwAR0aj1VF2ClUN7tdvkTBSelWAv4JNAR3EvY-aTHLyhtqAGU04lj4nq2CVDg)

# What is PWA?
- Progressive Web App
- Web의 진화된 형태..(?)
- Native App 같은 경험을 제공
- After Chrome v76, Desktop Support

## Web VS App / App Gap
- Can run on any device VS Usaully ecosystem-specific
- Quick to open an use VS Donwload & Install
- Open from the browser VS Open from the launcher/files
- Always runs in the browser VS [Feels like it] runs on its own
- Always runs in a tab VS Has its own window
- Probably won't work offline VS Usually works fine offline
- Not Optimized for the device VS Powerful capabilities / system access
- Linkable VS Not linkable
- I use this VS I own this

### PWAs: toward a universal application platform
- Can run on any device
- Quick to open and use & Can be installed
- Open from the Brwoser & Open from the launcher/files
- Likable
- Has its own window
- works offline
- Integrates with the OS
- Powerful capabilities / system access
- I use this & I own this

```
- High quality UI
- Launcher Icon
- System Integration

`PWA Mobile and Desktop same code`
```


# PWA Ingredients
- Web App Manifest
- Service worker

## Web App Manifest
- App에 대해 설명을 적어놓은 JSON File
- Title, App Name, Theme, etc...
- Chrome Dev Tools -> Application Tab -> Manifest

```HTML
<link rel="manifest" href="/manifest.json" crossOrigin="foobar">
```

``` JSON
{
  "name": "The Air Horner",
  "start_url": "/?homescreen=1",
  "display": "standalone", // fullscreen
  "icons": [
    {
      "src": "images/icon-16.png",
      "size": "16x16"
    }
  ],
  "theme_color": "#2196f3",
  "background_color": "#2196f3"
}
```

## Service worker
- Offline first

```JavaScript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
  })
}

//service-worker.js
self.addEventListener('install', event => {
  console.log('Inside the install handler:', event)
})
self.addEventListener('fetch', event => {
  // Fetch data from server
})
```
### Workbox
- https://developers.google.com/web/tools/workbox


# Introduce Examples
- https://www.hulu.com - ??? 웹페이지는 PWA가 아닌데?
- Mobile Twitter

> Write once, Run everywhere

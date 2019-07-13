# New Capabilities For The Web / 웹의 확장성
- 장한보람 / GDG WebTech Organizer

> `브라우저`랑 `인터넷`만 있으면 어디든 갈 수 있어

# What is App Gap
- Web VS Native App
- File System Access
- Contact Access

# Introduce Project Fugu
- App Gap을 줄기이 위해 나온 Project
- Fugu === `복어`, 잘 먹으면 맛있지만 잘못 먹으면 매우 위험
- https://twitter.com/chromiumdev/status/1128306472893517824

> Identify the need -> (Write Explainer -> Solicit Feedback)(Iterate) -> Formal Spec -> Ship It!

# New Capabilities

## Sharing Content and Receiving Shares

### Web Share API
- HHTPS
- 사용자의 액션 필요
   - e.g. Click Share button

#### Link
- Shiped
```JavaScript
if ('share' in navigator) {
  const shareOpts= {
    title: 'title',
    text: 'text',
    url: 'https://www.google.com'
  }

  navigator.share(shareOpts).then().catch()
}
```

#### File
- In Development
- After Chrome v76
```JavaScript
if ('share' in navigator) {
  const shareOpts= {
    file: [...]
  }

  navigator.share(shareOpts).then().catch()
}
```

#### Web App Manifest
```JSON
{
  "share_target": {
    "action": "/share-target/",
    "method": "GET",
    "enctype": "application/x-www-form-urlencoded",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url"
    }
  }
}
```

## Media Session
- Shipped

```JavaScript
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetaData({
    title: 'Never Gonna Give Up',
    artist: 'Rick Astley',
    album: 'Whenever You Need Somebo...',
    artwork: [
      {
        src: 'url',
        type: 'image/png',
      },
      {
        src: 'url',
        type: 'image/png',
      }
    ]
  })

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    // User hit 'Previous Track' Key
  })
  navigator.mediaSession.setActionHandler('nexttrack', () => {
    // User hit 'Next Track' Key
  })
  navigator.mediaSession.setActionHandler('play', () => {
    // User hit 'Play' Key
  })
  navigator.mediaSession.setActionHandler('pause', () => {
    // User hit 'Pause Track' Key
  })
}
```

## Detecting Barcodes and Face

### Shape Detection API
- Type
   - Face Detector
   - Barcode Detector
   - Text Detector

```HTML
<script type="application/ld+json">
{
  "arTarget": {
    "@type": "Barcode",
    "text": "Some value"
  },
  "arContent": {
    "@type": "WebPage",
    "url": "http://example.com",
    "name": "Result Name",
    "description": "Result Description",
    "image": "http://example.com/result.jpg"
  }
}
</script>
```

```JavaScript
if ('FaceDetector' in window) {
  cosnt faces = await new FaceDetector().detect(img)
} else {
  // Use fallback
}

if ('BarcodeDetector' in window) {
  cosnt faces = await new BarcodeDetector().detect(img)
} else {
  // Use fallback
}
```

### Perception Toolkit
- https://perceptiontoolkit.dev/getting-started/
- npm install perception-toolkit

1. Sensing
2. Meaning
3. UX

## System Wake Lock and Screen Wake Lock
- In Development
- Chrome v76 or v77

### Keeping an App Alive

### System Wake Lock
- App은 계속 실행하는데 화면만 꺼짐
- e.g. 안보기

### Screen Wake Lock
- 화면도 꺼지는 것을 막음
- e.g. Netflix, Driving navigation

### Example
```JavaScript
let wakeLock = await navigator.getWakeLock('screen')
wakeLock.addEventListener('activeChage', e => {
  console.log(e.target)
})

let wakeLockRequest = wakeLock.createRequest()

setTimeout(() => {
  wakeLockRequest.cancel()
  wakeLockRequest = null
}, 60 * 1000)
```

## Badge API
```JavaScript
window.Badge.set(42)
window.Badge.clear()
```

### Example
- https://airhorner.com
- PWA 설치
- chrome://flags / #enable-experimental-web-platform-features 허용
- Console에 아래 코드 붙여넣기
```JavaScript
let hornCounter = 0;
const horn = document.querySelector('.horn')
horn.addEventListener('click', () => {
  ExperimentalBadge.set(++hornCounter)
})
```

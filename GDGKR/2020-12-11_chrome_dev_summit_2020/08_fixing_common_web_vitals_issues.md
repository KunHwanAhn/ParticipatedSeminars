# Fixing common Web Vitals issues
- Katie Hempenius / Front End Software Engineer
- [Youtuve](https://youtu.be/IB3e8SAdBaE)

## Agenda
- Cumulative Layout Shift(CLS)
- Third-party scripts
- Real User Monitoring (RUM)

## Cumulative Layout Shift(CLS)

### Calculating CLS
```JavaScript
let cls = 0;

function onLayoutShiftEntry(entry) {
  if (!entry.hadRecentInput) {
    cls += entry.value;
  }
}

const po = new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach(onLayoutShiftEntry);
})

po.observe({ type: 'layout-shift', buffered: true });
```

### Reporting CLS
```JavaScript
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    const records = po.takeRecords(); // pending records not yet dispatched
    records.forEach(onLayoutShiftEntry);
    sendToAnalytics({ cls });
  }
})
```

### Tool for debugging Layout Shift
- Dev Tools > Settings > Rendering > Layout Shift Regieons
- This feature highlights page element that have shifted as the ar shifting

### Add debugging info
```JavaScript
const connection = navigator.connection.effectiveType;
const { width, height } = window.screen;
const debugInfo = { connection, width, height };

sendToAnalytics({ cls, debugInfo });

// Other sources of info:
// window.scrollY
// LayoutSHiftAttribution (part of the Layout Instability API)
// Debugging info specific to your app (e.g. tokens)
```

> Layout shifts that occur within 500ms of user input do not count towards CLS.

### User inputs with or without CLS
- https://wicg.github.io/layout-instability/#sec-input-exclusion

#### DO NOT count towards CLS
- Clicks & tabs
- Keypresses
- Viewport resizing

#### DO ocunt towards CLS
- Scroll

> NOTE: Test tools like Lighthouse, WebPageTest don NOT scroll down your page. This can be a blind spot when it comes to measuring and identifying CLS

### CLS Between Desktop and Mobile
- There are no correlation between the CLS of a mobile and desktop site
- Because they often use different layouts, UX patterns, etc...

### How to fix CLS
- Add `width` and `height` attributes to images, videos and iframes
   ```HTML
   <img src="cat.jpg" width="960" height="480" />
   ```
- [Improve UX Patterns Optimized for Core Web Vitals](./09_improve_ux_patterns_optimized_for_core_web_vitals.md)

## Third-party scripts
- Lazy loading can also be used to load third-party scripts,

### Way to lazy-loading 3P scripts
- Defer
- Loading State
   - readyStateChange, DOMEContentLoaded, Load
- Time
   - setTimeout
   - setTimeout does not represent a guarantee as to when the callback function will execute. Because callback function cannot be executed when the main thread is busy.
- User interaction
   - IntersectionObserver
   - If you want to trigger lazy loading based on user scrolling, you should use IntersectionObserver to do that rather than listening for the scroll event.
- Performance events
   - PerformanceObserver
   - Not usual, but first paint or First Contentfull Paint and then triggering script loading

> Sometimes, the marketing team just keep adding more scripts to your page

### Google Tag Manager
- Allow or restrict particular tags or types of tags
   - https://goo.gle/gtm-restrict-tags
- Require 2-step verification
   - https://goo.gle/gtm-2-step-verification
- Turn on container notifications
   - https://goo.gle/gtm-notifications
- Set user permissions
   - https://goo.gle/gtm-user-permissions

## Real User Monitoring

### Differences between tools

#### Search Console
- Data Rage: Past 28 days
- Granularity: URL Groups

#### PageSpeed Insights
- Data Rage: Past 28 days
- Granularity: Page-level, origin-level

#### CrUX
- Data Rage: Calendar-month
- Granularity: Page-level, origin-level

### Collect your own RUM
- https://github.com/GoogleChrome/web-vitals
- Thrid-party RUM
   - Cloudflare Browser Insights (free)
   - Akamai mPulse
   - New Relic
   - SpeedCurve

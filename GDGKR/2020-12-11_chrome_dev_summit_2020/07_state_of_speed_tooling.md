# State of speed tooling
- Elizabeth Sweeny / Product Manager
- Paul Irish / Software Engineer
- [Youtube](https://youtu.be/_G3X_IsozKk)

## What are the goals of the Lighthouse score?
- Setting yo up for success
- A Balanced signal about how well your page is likely to deliver a good experience in real-world conditions with your users.
- The closer you are to that 100 score, the less you're leaving up to chance for what can go wrong in the field.
- You need to distinguish between `Field` FCP data and `Lab` FCP data

## What is your Lighthouse score telling you?
- First Contentfull Paint
- Speed Index
- Largest Contentful Paint
- Time to Interactive
- Total Blocking Time
- Cumulative Layout Shift

### For Speed
- First Contentfull Paint
- Speed Index
- Largest Contentful Paint

### For Interactivity
- Time to Interactive
- Total Blocking Time

### For Stability
- Cumulative Layout Shift

## How does Core Web Vitals fit into the Lighthouse socre?
- First Contentfull Paint
- Total Blocking Time
- Cumulative Layout Shift

> [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)

## Thrid Party Audits
- Thrid-party services can deliver a lot of value, but they can also come with `performance consts`
- Thrid party attribution, Minimize third-party usage of Lighthouse metric

### Thrid Party facades
- Once the user engages with a action button, then we can load in the full fat embed behind it.
- Some third-party resources can be lazy loaded with a facade of Lighthout metric
- [Lazy load third-party resources with facades](https://web.dev/third-party-facades/)

## Chrome UX Report(CrUX) News
- [Using the Chrome UX Report API](https://web.dev/chrome-ux-report-api/)

## Core Web Vitals Actionability
- Loading - LCP(Largest Contentful Paint)
- Interactivity - FID(First Input Delay) & TBT(Total Blocking Time)
- Visual Stability - CLS(Cumulative Layout Shift)

### LCP
- What was the paint? you can find it on Lighthouse audit or Dev tools

#### Can it arrive earier?
- Below Lighthouse Metric let you know
- Largest Contentful Paint
- Slow Server response times
   - Reduce server responses times(TTFB)
- Render-blocking JavaScript and CSS
   - Eliminate render-blocking resources
   - Avoid chaning critical request
- Resource load times
   - Efficiently encode images
   - Serve images in next-gen formats
   - Enable text compression
   - Preconnect to required origins
   - Preload key requests
   - Minify CSS and JavaScript
   - Remove unused CSS
   - Use video formats for animated content

### FID & TBT
- Where are the long tasks? you can find it on Dev tools, `Performance` Pannel
- If any task takes more than `50ms`? Dev tools will tell you!

#### Where are the long tasks?
- Below Lighthouse Metric let you know
- Avoid long main-thread tasks
- Minimize third-party usage

#### How can we optimize our main thread?
- Heavy main-thread execution
   - Reduce JavaScript execution time
   - Minimize main thread work
   - Reduce the impact of third-part code
- Deferrable / Removable code
   - Some third-party resources can be lazy loaded
   - Remove unused JavaScript
   - Remove duplicate modules in JavaScript bundles
   - Avoid serving legacy JavaScript to morden browsers

### CLS
- What shifted?
- Avoid large layout shifts on Lighthouse metric
- Layout shift on Dev Tools Performance Pannel

#### How can we reduce instability?
- Avoid shift-triggering anti-patterns
   - Avoid non-composited animations
   - Image elements have explicit width and height
   - Injected frames potentially shifted layout
   - Fonts with font-display: optional are preloaded
- and [more](https://nicj.net/cumulative-layout-shift-in-practice)

## References
- Web Fundamentals - [How To Think About Speed Tools](https://developers.google.com/web/fundamentals/performance/speed-tools)


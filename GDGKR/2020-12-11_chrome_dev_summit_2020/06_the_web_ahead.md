# The web ahead
- Paul Kinlan / Alex Russell
- [Youtube](https://youtu.be/RDRcP1JX0TI)

> The web is a vital part of people's day-to-day lives

## The three core areas
- SAFE
- FAST
- POWERFUL

## SAFE

### same-site attribute
- From Jan, 2020. To use thrid-party context to explicitly state `same-site` attribute
- [Building a more private web: A path towards making third party cookies obsolete](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)

## FAST

### Core Web Vitals
- Loading - LCP(Largest Contentful Paint)
   - Good: less than 2.5 sec
   - Need Improvement: 2.5 < time < 4.0 sec
   - Poor: more than 4 sec
- Interactivity - FID(First Input Delay)
   - Good: less than 100 ms
   - Need Improvement: 100 < time < 300 ms
   - Poor: more than 300 ms
- Visual Stability - CLS(Cumulative Layout Shift)
   - Good: less than 0.1
   - Need Improvement: 0.1 < value < 0.25
   - Poor: more than 0.25
- [Timing for bringing page experience to Google Search](https://developers.google.com/search/blog/2020/11/timing-for-page-experience)

#### LCP
- Optimized # of dom notes
- Added CDN for assets
- Refined compression levels for static & dynamic assets

#### FID
- Ensured content served from server leads to min shift on browswer

#### CLS
- Limited # of images in ATF
- Prioritized first party scripts
- Replaced heave 3rd party scripts

## POWERFUL
- More capability
- More diverse application

TODO: 다시 정리 필요!

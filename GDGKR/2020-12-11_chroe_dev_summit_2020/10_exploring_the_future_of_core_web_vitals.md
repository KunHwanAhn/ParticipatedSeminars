# Exploring the future of Core Web Vitals
- Anney Sullivan / Software Engineer
- Mical Mocny / Software Engineer
- [Youtube](https://youtu.be/iNfz9tg-wyg)

## Measure Real User Experiences
- Things like...
   - Page Load Time
   - Responsiveness to Input
- Not...
   - Bytes of JavaSCript on page
   - Timing of network requests

## Measurement Support
- Any new or updated metrics will have:
   - JavaScript APIs for measuring in the field
   - Support in Chrome User Experience Report
   - Lab tooling for deeper insights
## Concise and clear
- Distnct aspects of the user experience
- Predictable annual cadence
- Balance improvedments to metrics with cost of changing

## Progressive Loading
- Largest Contentful Paint captures when the main content ahs finished loading
- But it's important to show content early, too

## Interactivity During Load
- Some pages still feel sluggish even with good **First Input Delay** scores.
- Currently: `good` threshold is 100ms at the 75th percentile; **considering lowering to 75 or 50ms**

## Visual Stability
- **Cumulative Layout Shift** captures unexpected movement of page content.
- Working on better handling **long-lived pages**.
- https://chromium.googlesource.com/chromium/src/+/master/docs/speed/metrics_changelog/README.md

## Future goal of Web Vitals
- Better support for Single Page Apps
- Input Responsiveness
   - Responding to user inputs after load
   - Entire response time, not just delay
- Scrolling and Animations
- Areas of User Expericen Beyond Performance
   - Security? Privacy? Accessibility? What do you want to see inclided?

# Improve UX Patterns Optimized for Core Web Vitals
- Garima Mimani / WEb Ecosystems Consultant
- [Youtube](https://youtu.be/EUxrBG_98hQ)

> Interactions SHOULD BE smooth and predicatable!

> Site owners and developers try different UI Patterns to meet the customer's expectation while also balancing business needs.

## The Big question, what really makes for a good user experiences
- There is no right answer. User experience is different for everyone.
- Gread user experience is intangible and can be difficult to measure.
- A way to measure the quality of user experience is by answering thease three questions.
   - Is it `happening`? - Loading
   - Is it `responsive`? - Interactivity
   - Is it `delightful`? - Visual Stability

## UX with Core Web Vitals
- Loading - Largest Contentful Paint
- Interactivity - First Input Delay
- Visual Stability - Cumulative Layout Shift

### Why should you care?
- `24%` lower abandonment rate, when a site meets the **Core Web Vitals** thresholds

## Dynamic Content injected at Page Load
- Avoid any layout shifts in the active viewport
- If you need to display any banners, ads, use `fixed height` or `min-height`.
- The website developers, the UX designers and the marketing folks must align on standardizing the size of the most important content in the first viewport.

## Dynamic Content injected as User Scrolls
- Reserve enough spaces for the content before the user scrolls to that part of the page.
- You can use skeleton UI placeholders for it.

## Dynamic Content injected on User Click
- Provide instant feedback to the user that you are processing the request.
- Disable during initial render.
- It is important to note here that you have `500ms` from the user input to make any layout change and that will not affect the CLS score.

## Takeawys
- Insert new content carefully
- Give Instant Feedback, DO NOT wait until network request to finish.
- Match Visuals to Reality

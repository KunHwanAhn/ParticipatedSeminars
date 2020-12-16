# Structured data for developers
- Martin Splitt
- [Youtube](https://youtu.be/bUwmHX_EPmw)

## What is Structured Data
- Additional machine-readable, semantic information about your content
- https://goo.gle/search-gallery

## Why it's useful
- Structured Data unlocks more surfaces for your content to be highlighted, e.g. in Seaerch or Google Assistant
- Different vendors and products use Structured Data, giving your content more visibility

## Example
- ld+json === JavaScript Object Notation, Linked Data

```html
<html>
  <head>
    <title>Party Coffee Cake</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": "Party Coffee Cake",
      "author": {
        "@type": "Person",
        "name": "Mary Stone"
      },
      "datePublished": "2018-03-10",
      "description": "This coffee cake is awesome and perfect for parties.",
      "prepTime": "PT20M"
    }
    </script>
  </head>
  <body>
  <h2>Party coffee cake recipe</h2>
  <p>
    This coffee cake is awesome and perfect for parties.
  </p>
  </body>
</html>
```

## Implementing sturctured data
- The extraction and parsing of structured data is part of the indexing pipeline
- As Googlebot renders JavaScript before indexing, useing JavaScript to dynamically insert structured data is possible

```JavaScript
const sd = document.createElement('script');
sd.setAttribute('type', 'application/ld+json');

fetch(`/api/events/structured-data?id=${eventId}`)
  .then(r => r.text())
  .then(textData => {
    sd.textContent = textData;
    document.head.appendChild(sd);
  })
```

- or use Google Tag Manager

## How to test structured data?

### Rich Results Test
- Great to test pages ad-hoc, including temporary URLs for development purpose

### Google Search Console
- Provides site-wide monitoring and testing for rich results eligibility across all pages of your website

## Summary

### Structured data
- Additional semantic information on the content of a page
- Standardized data types and attributes specified by schema.org
- Used by various vendors and products to highlight your web content
- Using JavaScript to inject structured data is fine
- Learn more at https://goo.gle/structured-data-intro

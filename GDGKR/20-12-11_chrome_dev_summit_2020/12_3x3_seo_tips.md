# 3x3 SEO tips for JavaScript web apps
- Martin Splitt
- [Youtube](https://youtu.be/y1UzfahXfao)

## Providing useful meta data

### For Vue.js
- User [vue-meta](https://github.com/nuxt/vue-meta) library

```vue
<script>
export default {
  metaInfo() {
    return {
      title: `${this.recipe.name} - Martin's Kitchen`,
      meta: [
        {
          name: 'description',
          content: this.recipe.teaser,
        },
      ],
    };
  },
}
</script>
```

## Manage error pages & canonicals
- Exclude error pages from indexing

### For Vue.js

```vue
<script>
export default {
  metaInfo() {
    const isError = !this.recipe;

    return {
      meta: [
        {
          name: 'robots',
          content: isError ?  '' : 'noindex',
        },
      ],
    };
  },
};
</script>
```
- Dealing with duplicates
   - Specifying a canonical
   - Various URLs might be used to point to the same content
   - You need to give search engines a hint which one is the preferred URL to use in search results.

### For Vue.js

```vue
<script>
export default {
  metaInfo() {
    return {
      title: `${this.recipe.name} - Martin's Kitchen`,
      meta: [
        {
          name: 'description',
          content: this.recipe.teaser,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: this.recipe.url,
        },
      ],
    };
  },
};
</script>
```

## Add structured data
-

### For Vue.js

```vue
<template>
  <script
    v-html="structuredData"
    type="application/ld+json"
  >
  </script>
</template>

<script>
export default {
  data() {
    return {
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: this.recipe.name,
        image: this.recipe.imageUrl,
      },
    };
  },
  metaInfo() {
    return {

    };
  },
};
</script>
```

## Make URLs crawlable
- Googlebot and other search engine crawlers operate on URLs.
- Fragments(#) in URLs are meant to identify an element inside the current URL's content.

### Good URL
- /recipes/cupcakes

### Bad URL
- /**#**/recipes/cupcakes

### For Vue.js
- Use vue-router's history mode
```JavaScript
export default new Router({
  mode 'history'  // this is important!
  base: process.env.BASE_URL,
  routes: [
    // ...
  ],
  // ...
})
```

## Want to learn more?

### Google Search & JavaScript
- Google search supports JavaScript.
- Most frameworks will work out of the box, but can be optimzed with a few small changes.
- Testing is key to making sure your web apps are discoverable via organic search.
- Monitor your site for changes and issues & potential improvements.

## References
- [JavaScript SEO Guide](https://www.youtube.com/watch?v=LXF8bM4g-J4&list=PLKoqnv2vTMUPOalM1zuWDP9OQl851WMM9)
- [Troubleshooting guide](https://developers.google.com/search/docs/guides/fix-search-javascript)
- [JavaScript SEO video series](https://www.youtube.com/watch?v=LXF8bM4g-J4&list=PLKoqnv2vTMUPOalM1zuWDP9OQl851WMM9)

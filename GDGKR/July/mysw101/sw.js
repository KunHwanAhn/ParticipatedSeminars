self.addEventListener('install', function (event) {
  caches.open('cache-v1').then(function (cache) {
    return cache.addAll([
      '/',
      '/index.html',
      '/'
    ]);
  });
});
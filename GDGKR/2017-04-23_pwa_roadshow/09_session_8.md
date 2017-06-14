# PWA with Angular
- 고재도, GDE for Web

> Angular CLI의 `--mobile` 태그는 더이상 없다.

## Service Worker
- Angular Service Worker, NGSW
- @angular/service-worker/bundles
- @angular/service-worker/build
- @angular/service-worker/companion
- @angular/service-worker/worker
- @angular/service-worker/plugins

### Install NGSW
```
$ npm install --save @angular/service-worker
$ ng set apps.0.serviceWorker=true
```

### App Build
```
$ ng build --prod
```

### Route Redirection
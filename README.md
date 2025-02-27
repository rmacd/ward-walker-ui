Ward Walker UI
--------------

Next.js with SSR, runs UI for Ward Walker.

Build:
```
npm run build
```


Docker build:
```
docker build -t walker-ui .
```

Local build (private):

```
docker build --no-cache -t walker-ui:latest .
docker image tag walker-ui:latest nas.rmacd.com:9500/walker-ui:latest
docker image push nas.rmacd.com:9500/walker-ui:latest
```
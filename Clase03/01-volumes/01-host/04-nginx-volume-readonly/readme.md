# NGINX Personalizado - Readonly

```
docker run -d \
    --name server-nginx01 \
    -p 3000:80 \
    -v $(pwd -W)/html:/app \
    -v $(pwd -W)/conf/nginx.conf:/etc/nginx/conf.d/default.conf:ro \
    nginx:alpine
```
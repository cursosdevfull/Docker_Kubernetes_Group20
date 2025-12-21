# Healthchecks

### NGINX
```
docker run -d \
    --name server-nginx \
    --health-cmd="curl http://localhost" \
    --health-interval=10s \
    --health-timeout=2s \
    --health-retries=3 \
    --health-start-period=10s \
    nginx:alpine
```

### MySQL
```
docker run -d \
    --name server-mysql \
    --health-cmd="mysqladmin ping -h localhost" \
    --health-interval=10s \
    --health-timeout=3s \
    --health-retries=3 \
    --health-start-period=4s \
    -e MYSQL_ROOT_PASSWORD=12345 \
    mysql:8
```
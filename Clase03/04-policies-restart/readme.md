# Policies Restart

### ON-FAILURE: Reinicia en caso ocurra un error o falla
```
docker run -d \
    --name server-nginx \
    --restart on-failure \
    nginx:alpine \
    sh -c "sleep 10; exit 1"
```

### UNLESS-STOPPED: Reinicia siempre a menos que lo detenga manualmente
```
docker run -d \
    --name server-nginx \
    --restart unless-stopped \
    nginx:alpine \
    sh -c "sleep 10; exit 1"
```

### ALWAYS: Reinicia siempre
```
docker run -d \
    --name server-nginx \
    --restart always \
    nginx:alpine \
    sh -c "sleep 10; exit 1"
```
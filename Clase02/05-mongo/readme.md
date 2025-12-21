# Mongo

### Server
```
docker run -d --name server-mongo \
    -e MONGO_INITDB_ROOT_USERNAME=user \
    -e MONGO_INITDB_ROOT_PASSWORD=12345 \
    -p 27017:27017 \
    mongo:8.2-noble
```

### Client
```
docker run -d --name client-mongo \
    -p 8081:8081 \
    -e ME_CONFIG_BASICAUTH_USERNAME=sergio \
    -e ME_CONFIG_BASICAUTH_PASSWORD=54321 \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=user \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=12345 \
    -e ME_CONFIG_MONGODB_SERVER=172.17.0.2 \
    mongo-express:1.0.2-20-alpine3.19
```
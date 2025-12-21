# Apache - Dockerfile

### Crear una imagen
```
docker build -f all/Dockerfile -t mi-imagen:3.0.0 ./all
```

### Crear el contenedor
```
docker run -d \
    --name server-apache \
    -p 9000:80 \
    mi-imagen:2.0.0
```
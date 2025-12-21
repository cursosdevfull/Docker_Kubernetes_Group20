# Apache - Dockerfile

### Crear una imagen
```
docker build -f all/Dockerfile -t mi-imagen:2.0.0 .
```

### Crear el contenedor
```
docker run -d \
    --name server-apache \
    -p 9000:80 \
    mi-imagen:2.0.0
```
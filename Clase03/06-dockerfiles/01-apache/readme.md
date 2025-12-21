# Apache - Dockerfile

### Crear una imagen
```
docker build -t mi-imagen:1.0.0 .
```

### Crear el contenedor
```
docker run -d \
    --name server-apache \
    -p 9000:80 \
    mi-imagen:1.0.0
```
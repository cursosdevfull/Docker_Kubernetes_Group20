# MySQL

### Crear un contenedor con volumen host
```
docker run -d \
    --name server-mysql \
    -e MYSQL_ROOT_PASSWORD=12345 \
    -e MYSQL_DATABASE=cursosdev \
    -e MYSQL_USER=usuario \
    -e MYSQL_PASSWORD=12345 \
    -p 3310:3306 \
    -v $(pwd -W)/data:/var/lib/mysql \
    mysql:8
```
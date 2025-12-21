# Drupal

### Crear una red
```
docker network create net-drupal -d bridge
```

### Crear volúmenes nombrados
```
docker volume create vol-mysql-drupal
docker volume create vol-modules-drupal
docker volume create vol-profiles-drupal
docker volume create vol-sites-drupal
docker volume create vol-themes-drupal
```

### Contenedor de MySQL
```
docker run -d \
    --name server-mysql \
    -e MYSQL_ROOT_PASSWORD=12345 \
    -e MYSQL_DATABASE=cursosdev \
    -e MYSQL_USER=usuario \
    -e MYSQL_PASSWORD=12345 \
    -v vol-mysql-drupal:/var/lib/mysql \
    --network net-drupal \
    mysql:8
```

### Contenedor de Drupal
```
docker run -d \
    --name server-drupal \
    -p 9000:80 \
    -v vol-modules-drupal:/var/www/html/modules \
    -v vol-profiles-drupal:/var/www/html/profiles \
    -v vol-sites-drupal:/var/www/html/sites \
    -v vol-themes-drupal:/var/www/html/themes \
    --network net-drupal \
    drupal
```
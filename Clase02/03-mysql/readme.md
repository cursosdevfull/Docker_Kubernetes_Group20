# MySQL

### Server
```
docker run -d --name server-mysql -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=cursosdev -e MYSQL_USER=usuario -e MYSQL_PASSWORD=12345 -p 3310:3306 mysql:8
```

### Client
```
docker run -d --name client-mysql -e PMA_ARBITRARY=1 -p 8090:80 phpmyadmin
docker run -d --name client-mysql -e PMA_HOST=172.17.0.4 -p 8090:80 phpmyadmin
docker run -d --name client-mysql -e PMA_HOST=172.17.0.4 -e PMA_USER=usuario -e PMA_PASSWORD=12345 -p 8090:80 phpmyadmin
docker run -d --name client-mysql -e PMA_HOST=172.17.0.4 -e PMA_USER=usuario -e PMA_PASSWORD=12345 -e PMA_PORT=3306 -p 8090:80 phpmyadmin
docker run -d --name client-mysql -e PMA_HOST=172.17.0.4 -e PMA_USER=usuario -e PMA_PASSWORD=12345 -e PMA_PORT=3306 -e PMA_SSL=1 -p 8090:80 phpmyadmin
```
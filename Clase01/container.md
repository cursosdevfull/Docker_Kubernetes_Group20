# Container

### Listar contenedores que se estén ejecutando
```
docker ps
```
### Listar contenedores que se estén o no ejecutando
```
docker ps -a
```
### Filtrar contenedores
```
docker ps | grep nginx
```
### Eliminar contenedor
```
docker rm <nombre o id contenedor> 
```
### Detener un contenedor
```
docker stop <nombre o id contenedor>
```
### Eliminar contenedor forzando su detención
```
docker rm -f <nombre o id contenedor> 
```
### Eliminar múltiples contenedores forzando su detención
```
docker rm -f <nombre o id contenedor 1> <nombre o id contenedor 2> <nombre o id contenedor 3> <nombre o id contenedor 4> 
```
### Inspeccionar un contenedor
```
docker inspect <nombre o id contenedor>
```
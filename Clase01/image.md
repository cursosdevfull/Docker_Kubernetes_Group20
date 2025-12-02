# Images

### Listar
```
docker images
docker image ls
```
### Filtrar lista de imágenes
```
docker images | grep nginx 
docker image ls | grep nginx
```
### Inspeccionar una imagen
```
docker image inspect nginx:alpine
```
### Descargar una imagen
```
docker pulll <nombre de la imagen>:<tag o versión de la imagen>
```
### Descargar una imagen desde un repositorio diferente a hub.docker.com
```
docker pull public.ecr.aws/lambda/nodejs:24-x86_64
```
### Eliminar una imagen
```
docker rmi <nombre de la imagen | id>:<tag o versión de la imagen>
docker rmi -f <nombre de la imagen | id>:<tag o versión de la imagen>
```
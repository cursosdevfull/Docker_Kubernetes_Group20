# Commit

### Crear un contenedor
```
docker run -d --name server-web -p 5000:80 nginx:alpine
```

### Generar una imagen desde un contenedor existente
```
docker commit <nombre contenedor> <nombre de la nueva imagen>
```
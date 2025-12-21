# Networks

### Listar
```
docker network ls
```

### Crear
```
docker network create <nombre de la red> --driver bridge
docker network create <nombre de la red> -d bridge
```

### Asociar red al momento de crear un contenedor
```
docker run -d --name <nombre contenedor> --network <nombre de la red> <nombre de la imagen>
```

### Inspeccionar una red
```
docker network inspect <nombre de la red>
```

### Asociar red a un contenedor existente
```
docker network connect <nombre de la red> <nombre del contenedor>
```

### Crear un contenedor asociado a más de una red
```
docker run -d --name <nombre del contenedor> --network <nombre de red 1> --network <nombre de red 2> <nombre de la imagen>
```

### Crear una red con gateway y subnet personalizados
```
docker network create <nombre de la red> -d <tipo de red> --gateway <dirección ip> --subnet <dirección ip>/<submask>
```

### Crear un contenedor con una ip específica
```
docker run -d --name <nombre del contenedor> --network <nombre de la red> --ip <dirección ip> <nombre de la imagen>
```
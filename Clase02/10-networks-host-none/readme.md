# Redes de tipo host y none

### Crear contenedor en una red host
```
docker run -d --name <nombre contenedor> --network host <nombre de la imagen>
```
### Crear contenedor en una red none
```
docker run -d --name <nombre contenedor> --network none <nombre de la imagen>
```
# Exec

```
docker run -d --name server-jenkins -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts-jdk21
docker exec server-jenkins sh
docker exec -i server-jenkins sh
docker exec -i -t server-jenkins sh
docker exec -it server-jenkins sh
docker exec -ti server-jenkins sh
```
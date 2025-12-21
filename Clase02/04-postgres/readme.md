# Postgres

### Server
```
docker run -d --name server-postgres -e POSTGRES_PASSWORD=12345 -e POSTGRES_USER=user -e POSTGRES_DB=db_cursosdev -p 5432:5432 postgres:16.11-alpine3.23
```

### Client
```
docker run -d --name client-postgres -e PGADMIN_DEFAULT_EMAIL=sergiohidalgocaceres@gmail.com -e PGADMIN_DEFAULT_PASSWORD=54321 -p 8090:80 dpage/pgadmin4:9.10.0
```
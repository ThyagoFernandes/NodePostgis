# NodePostgis

## project setup
```
npm install
```
## running postgis in docker
```
docker network create postgis-net
docker run --name "postgis" --network=postgis-net -p 25432:5432 -d -t kartoza/postgis
```
## running postgres client in docker
```
docker run --name "pgclient" --network=postgis-net -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=user@gmail.com" -e "PGADMIN_DEFAULT_PASSWORD=userpwd" -d dpage/pgadmin4
```

## running the project
```
npm start
```

## after configurations

### Command to create db
```
CREATE DATABASE post_geoloc;
```

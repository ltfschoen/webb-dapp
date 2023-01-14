# Webb Builder Docker

## Setup Container

* Install and run [Docker](https://www.docker.com/) Engine and Compose
* Generate .env file from sample file in the project root directory
```bash
cp .env.example .env
```
* Build Webb Docker image and container and follow the terminal log instructions.
```bash
cd docker
./docker-dev.sh
```

## Run Bridge Dapp

* Enter Docker container
```bash
# last created docker container id
CONTAINER_ID=$(docker ps -n=1 -q)
docker exec -it $CONTAINER_ID yarn start:bridge
```
* Wait until it says `webpack ... compiled`
* Go to http://<IP_ADDRESS>:3000

Note: If run on your local machine then Substitute <IP_ADDRESS> with `localhost`. If hosted on a remote cloud provider then substitute it with the Public IP Address of the cloud provider server instance.

## Run Stats Dapp

* Enter Docker container
```bash
docker exec -it $CONTAINER_ID yarn start:stats
```
* Wait until it says `webpack ... compiled`
* Go to http://<IP_ADDRESS>:3001

## Expose Ports

* Open relevant ports if necessary
```
source .env && export PORT_BRIDGE_DAPP PORT_STATS_DAPP
apt install ufw
ufw default allow outgoing
ufw default allow incoming
ufw enable
ufw allow $PORT_BRIDGE_DAPP/tcp && ufw allow $PORT_BRIDGE_DAPP/udp
ufw allow $PORT_STATS_DAPP/tcp && ufw allow $PORT_STATS_DAPP/udp
ufw reload
ufw status
```

## Useful Docker Commands

* List Docker containers
```bash
docker ps -a
```

* List Docker images
```bash
docker images -a
```

* Enter Docker container shell
```bash
docker exec -it $CONTAINER_ID /bin/sh
```

* View Docker container logs
```bash
docker logs -f $CONTAINER_ID
```

* Remove Docker container
```bash
docker stop $CONTAINER_ID; docker rm $CONTAINER_ID;
```

* Remove Docker image
```bash
docker rmi $IMAGE_ID
```

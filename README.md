# Testing prisma ORM

This project was created to test the functionality of Prisma ORM, and to study Docker.

## Installation

The only thing you need to run this project is [docker](https://docs.docker.com/engine/install) and [docker-compose](https://docs.docker.com/compose/install/) installed.

## Building and running
Assuming you've already created ".env" and filled in as in ".env.example"

```bash
# Building
sudo docker-compose build

# Starting database and server containers
sudo docker-compose up -d

# Running prisma migrations
sudo docker exec -it dev-prisma-server /bin/bash # Connect on server container
npm prisma migrate dev --name init
```

Now api is ready to accept connections and are running in a fully dockerized environment.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
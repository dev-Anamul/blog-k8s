#!/bin/bash


# run database
docker-compose -f docker/docker-compose.db.yaml up -d

# run application and other services
docker-compose up -d --build
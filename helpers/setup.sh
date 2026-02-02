#!/bin/bash

# create docker network
docker network create arc-one-network

# run database
docker-compose -f docker/docker-compose.db.yaml up -d

# run application and other services
docker-compose up -d --build

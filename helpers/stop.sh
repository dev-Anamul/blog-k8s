#!/bin/bash

# stop database
docker-compose -f docker/docker-compose.db.yaml down

# stop application and other services
docker-compose down
#!/usr/bin/env bash

export IMAGE=$1
docker-compose -f docker-compose-deploy.yaml up --detach
echo 'success'
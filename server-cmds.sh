#!/usr/bin/env bash

docker-compose -f docker-compose-deploy.yaml up --detach
echo 'success'
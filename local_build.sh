#!/bin/bash



IMG="registry.gitlab.com/aimi-new/wordpress/caradietmudah.com"
docker build -t $IMG .
docker push $IMG

# rsync -avze ssh ./docker-compose-prod.yml root@46.250.233.121:/home/wordpress/malaysia.flimty.co/docker-compose.yml
# ssh root@46.250.233.121 'cd /home/wordpress/malaysia.flimty.co;docker-compose pull;docker-compose up -d --build'

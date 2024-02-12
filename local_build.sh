#!/bin/bash



# IMG="registry.gitlab.com/a8551/flimty/flimty-malaysia/wp-flimty-my:lp"
# docker build -f DockerfileLp -t $IMG .
# docker push $IMG
# rsync -avze ssh ./docker-compose-lp.yml root@46.250.233.121:/home/wordpress/lp.flimty.my/docker-compose.yml
# ssh root@46.250.233.121 'cd /home/wordpress/lp.flimty.my;docker-compose pull;docker-compose up -d --build'



IMG="registry.gitlab.com/a8551/flimty/flimty-malaysia/wp-flimty-my:prod"
docker build -t $IMG .
docker push $IMG
rsync -avze ssh ./docker-compose-prod.yml root@46.250.233.121:/home/wordpress/malaysia.flimty.co/docker-compose.yml
ssh root@46.250.233.121 'cd /home/wordpress/malaysia.flimty.co;docker-compose pull;docker-compose up -d --build'

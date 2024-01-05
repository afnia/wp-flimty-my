#!/bin/bash

# IMG="registry.gitlab.com/a8551/flimty/flimty-malaysia/wp-flimty-my:prod"
# docker build -t $IMG .
# docker push $IMG


IMG="registry.gitlab.com/a8551/flimty/flimty-malaysia/wp-flimty-my:dev"
docker build -f DockerfileLocal -t $IMG .
docker push $IMG

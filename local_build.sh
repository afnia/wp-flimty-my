#!/bin/bash

IMG="registry.gitlab.com/a8551/flimty/flimty-malaysia/wp-flimty-my:prod"
docker build -t $IMG .
docker push $IMG

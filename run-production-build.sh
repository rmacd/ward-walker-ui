#!/bin/bash

docker build --no-cache -t walker-ui:latest .
docker image tag walker-ui:latest nas.rmacd.com:9500/walker-ui:latest
docker image push nas.rmacd.com:9500/walker-ui:latest


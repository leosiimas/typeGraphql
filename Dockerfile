FROM ubuntu:latest
LABEL maintainer="Leonardo Abreu"

RUN apt-get update
RUN apt-get install -y nodejs npm build-essential

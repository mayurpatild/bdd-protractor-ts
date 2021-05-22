FROM node:latest

LABEL maintainer="Mayur Patil"

RUN npm install -g jake

RUN mkdir /workspace
WORKDIR /workspace

ENTRYPOINT ["/bin/bash"]
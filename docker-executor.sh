#!/bin/bash

docker pull mayurpatild/node-protractor-runner:1.0

docker run --name Test01 --rm -t -v $(pwd):/workspace/ \
-u $(id -u ${USER}):$(id -g ${USER}) \
mayurpatild/node-protractor-runner:1.0 \
-c "export HOME=/workspace && npm install && npm run webdriver-update && npm test"
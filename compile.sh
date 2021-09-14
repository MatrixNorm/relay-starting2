#!/bin/bash

npx relay-compiler --schema ./resources/schema.graphql \
                   --src ./src \
                   --artifactDirectory ./src/__relay__ \
                   --language typescript \
                   --watch;

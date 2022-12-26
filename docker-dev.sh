#!/bin/bash

trap "echo; exit" INT
trap "echo; exit" HUP

# if $PORT_UI_COMPONENTS_DAPP is 4400 then replace the line `"port": 4400,`
# with `"port": $PORT_UI_COMPONENTS_DAPP,` incase the port differs from the port in .env file
source .env \
    && export NAME_PROJECT NAME_BRIDGE_DAPP NAME_STATS_DAPP NAME_UI_COMPONENTS_DAPP \
        PORT_BRIDGE_DAPP PORT_STATS_DAPP PORT_UI_COMPONENTS_DAPP \
    && if [[ ! -z "$PORT_UI_COMPONENTS_DAPP" ]]; \
        then sed -i "s/\"port\":\s[0-9]*\,/\"port\"\: $PORT_UI_COMPONENTS_DAPP\,/gI" \
        $PWD/libs/webb-ui-components/project.json ; fi \
    && printf "\n*** Started building Docker container." \
    && printf "\n*** Please wait... \n***" \
    && DOCKER_BUILDKIT=0 docker compose -f docker-compose-dev.yml up --build -d
printf "\n*** Finished building Docker container.\n"

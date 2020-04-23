#!/bin/bash

/usr/bin/arangosh \
    --server.endpoint=tcp://127.0.0.1:8999 \
    --server.password ${ARANGO_ROOT_PASSWORD} \
    --javascript.execute-string "db._createDatabase('${ARANGO_DB}');"

arangoimport --file "pharmacies.csv" --collection=pharmacies \
 --create-collection=true --type=csv --server.database="${ARANGO_DB}" \
 --server.endpoint=tcp://127.0.0.1:8999 \
 --server.password "${ARANGO_ROOT_PASSWORD}"
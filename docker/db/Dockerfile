FROM arangodb:3.6.2

ARG ARANGO_ROOT_PASSWORD
ARG ARANGO_DB

ENV ARANGO_ROOT_PASSWORD=$ARANGO_ROOT_PASSWORD
ENV ARANGO_DB=$ARANGO_DB

COPY /arango-dump/pharmacies.csv /pharmacies.csv
COPY /arango-dump/import.sh /docker-entrypoint-initdb.d
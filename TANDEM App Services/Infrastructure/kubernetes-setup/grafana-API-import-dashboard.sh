#!/bin/bash

#"https://raw.githubusercontent.com/rfrail3/grafana-dashboards/master/prometheus/node-exporter-full.json"

URL="http://admin:prom-operator@localhost:31974/api/dashboards/db"

curl --noproxy '*' -H @grafana-API-import-dashboard-HEADERS -X POST $URL

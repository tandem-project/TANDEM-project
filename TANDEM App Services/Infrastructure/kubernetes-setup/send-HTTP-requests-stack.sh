PROMETHEUS_HOST_PORT=31972
# Send HTTP-Requests to Prometheus Server
curl -v --noproxy '*' 'http://localhost:31972/api/v1/query?query=up&time=2015-07-01T20:10:51.781Z' | json_pp

GRAFANA_HOST_PORT=31974
# Send HTTP-Requests to Grafana Server
curl -v --noproxy '*' 'http://admin:prom-operator@localhost:31974/api/users' | json_pp

ALERTMANAGER_HOST_PORT=31976
# Send HTTP-Requests to AlertManager
curl -v --noproxy '*' 'http://localhost:31976/-/healthy'

# Import Dashboard to Grafana
curl -s 
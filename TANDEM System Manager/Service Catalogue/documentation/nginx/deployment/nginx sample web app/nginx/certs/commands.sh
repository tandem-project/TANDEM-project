###Grafana
#Generate server side certificate private key
openssl req -out dva-cert.csr -new -newkey rsa:2048 -nodes -keyout dva-cert.key
openssl rsa -in dva-cert.key -out dva-cert.key.pem

#Server side certificate signing request (combine .crt with .key using CA)
openssl x509 -req -CA rootCA.crt -CAkey rootCA.key -in dva-cert.csr -out dva-cert.crt -days 3650 -CAcreateserial -extfile dva-cert.ext
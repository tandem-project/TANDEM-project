#!/bin/bash

# Get the cli and make it available to use
wget http://127.0.0.1:15672/cli/rabbitmqadmin
chmod u+x rabbitmqadmin
mv rabbitmqadmin /etc/rabbitmq

# Add a user and permissions
rabbitmqctl add_user testuser testpassword
rabbitmqctl set_user_tags testuser administrator
rabbitmqctl set_permissions -p / testuser ".*" ".*" ".*"

# Make a Virtual-Host and Set Permissions
rabbitmqctl add_vhost Some_Virtual_Host
rabbitmqctl set_permissions -p Some_Virtual_Host guest ".*" ".*" ".*"

# Make an Exchange
./rabbitmqadmin declare exchange --vhost=Some_Virtual_hOST name=some_exchange type=direct

# Make a Queue
./rabbitmqadmin declare queue --vhost=Some_Virtual_Host name=some_outgoing_queue durable=true

# Make a Binding
# In AMQP 0-9-1 the "queue.bind" method    ... Messages flow (subject to various criteria) from the exchange (the source) to queue (the destination)
#                   "exchange.bind" method ... Bind one exchange into another
./rabbitmqadmin --vhost="Some_Virtual_Host" declare binding source="some_exchange" destination_type="queue" destination="some_incoming_queue" routing_key="some_routing_key" 



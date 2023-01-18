from kafka import KafkaConsumer

consumer = KafkaConsumer("my_favorite_topic", bootstrap_servers="0.0.0.0:18000")

for msg in consumer:
    print (msg)

print( consumer.metrics() )

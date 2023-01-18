from kafka import KafkaProducer

def send_message_async(server="0.0.0.0:18000", msg=b"some message bytes"):
    try:
        producer = KafkaProducer(bootstrap_servers=server)
    except Exception as e:
        print("Problem")

    for _ in range(100):
        producer.send("my_favorite_topic", msg)

    print( producer.metrics() )
    
    return
    
if __name__ == "__main__":
    send_message_async()

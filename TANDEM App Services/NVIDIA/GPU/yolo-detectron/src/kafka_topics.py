from kafka.admin import KafkaAdminClient, NewTopic

def create_tandem_topics():
    admin_client = KafkaAdminClient(
        bootstrap_servers="0.0.0.0:18000")

    topics_list = []
    topics_list.append( NewTopic("example_topic", 1, 1) )
    admin_client.create_topics(topics_list)
    
    current_topics_list = admin_client.list_topics()

    print(f"Current Topics List ... {current_topics_list}")
        
if __name__ == "__main__":
    create_tandem_topics()

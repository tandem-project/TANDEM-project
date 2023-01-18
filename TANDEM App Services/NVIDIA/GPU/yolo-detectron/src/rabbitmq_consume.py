"""Basic Message Consumer Example"""
import json
import logging
import functools
import pika
from pika.exchange_type import ExchangeType

print(f"pika version: {pika.__version__}")

LOGGER = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

credentials = pika.PlainCredentials('tandem', 'tandem123')

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='127.0.0.1', port='18001', credentials=credentials)
)

main_channel = connection.channel()
consumer_channel = connection.channel()
bind_channel = connection.channel()

main_channel.exchange_declare(exchange='com.micex.sten', exchange_type=ExchangeType.direct)
main_channel.exchange_declare(exchange='com.micex.lasttrades', exchange_type=ExchangeType.direct)

queue = main_channel.queue_declare('', exclusive=True).method.queue
queue_tickers = main_channel.queue_declare('', exclusive=True).method.queue

main_channel.queue_bind(exchange='com.micex.sten', queue=queue, routing_key='order.stop.create')

def hello():
    print("Hello World !")


connection.call_later(5, hello)

def callback(_ch, _method, _properties, body):
    body = json.loads(body)['order.stop.create']

    ticker = None

    if 'ticker' in body['data']['params']['condition']:
        ticker = body['data']['params']['condition']['ticker']

    if not ticker:
        return

    print(f'got ticker {ticker}')
    
    bind_channel.queue_bind(
        exchange='com.micex.lasttrades',
        queue=queue_tickers,
        routing_key=str(ticker))

consumer_channel.basic_consume(queue, callback, auto_ack=True)

try:
    consumer_channel.start_consuming()
finally:
    connection.close()
    
    

                        


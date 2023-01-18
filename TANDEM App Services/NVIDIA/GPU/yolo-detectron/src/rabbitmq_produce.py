import json
import random
import pika
from pika import DeliveryMode
from pika.exchange_type import ExchangeType

credentials = pika.PlainCredentials('tandem', 'tandem123')
parameters = pika.ConnectionParameters(host='127.0.0.1', port='18001', credentials=credentials)

connection = pika.BlockingConnection(parameters)

main_channel = connection.channel()

main_channel.exchange_declare(exchange="com.micex.sten", exchange_type=ExchangeType.direct)
main_channel.exchange_declare(exchange="com.micex.lasttrades", exchange_type=ExchangeType.direct)

tickers = {
    'MXSE.EQBR.KLOH': (1933, 1940),
    'MXSE.EQBR.MSNG': (1.35, 1.45),
    'MXSE.EQBR.SBER': (90, 92)
    }

def getticker():
    return list(tickers.keys())[random.randrange(0, len(tickers)-1)]

_COUNT_ = 10

for i in range(0, _COUNT_):
    ticker = getticker()

    msg = {
        'order.stop.create': {
            'data': {
                'params': {
                    'condition': {
                        'ticker': ticker
                        }
                    }
                }
            }
        }

main_channel.basic_publish(
    exchange='com.micex.sten',
    routing_key='order.stop.create',
    body=json.dumps(msg),
    properties=pika.BasicProperties(content_type='application/json', delivery_mode=DeliveryMode.Transient))


connection.close()

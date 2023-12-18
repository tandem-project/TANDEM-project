from flask import Flask

from controllers.paas_request_controller import paas_node_mapping
from controllers.request_controller import node_mapping
from controllers.eval_metric_controller import create_eval_metric, update_eval_metric, delete_eval_metric

app = Flask(__name__)


@app.route('/request', methods=['POST'])
def new_request():
    return node_mapping()


@app.route('/paas_request', methods=['POST'])
def new_paas_request():
    return paas_node_mapping()


@app.route('/create_metric', methods=['POST'])
def create_metric():
    return create_eval_metric()


@app.route('/update_metric', methods=['POST'])
def update_metric():
    return update_eval_metric()


@app.route('/delete_metric', methods=['POST'])
def delete_metric():
    return delete_eval_metric()


@app.route('/')
def request_mapping():
    return "pi-edge algorithm"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

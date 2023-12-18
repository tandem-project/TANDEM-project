from flask import Flask, request
import json
from pathlib import Path
import os

app = Flask(__name__)
local_path = Path(__file__).parent


def check_requirements_validity(requirements):
    return (requirements["latency"]["value"] < 0 or requirements["resource"]["value"] < 0 or
            requirements["energy"]["value"] < 0 or requirements["give_duplication_space"]["value"] < 0 or
            requirements["prioritize_Full"]["value"] < 0 or requirements["prioritize_empty"]["value"] < 0 or
            requirements["location_requested"]["value"] < 0 or
            requirements["prioritize_underloaded_clusters"]["value"] < 0 or
            requirements["load_prediction"]["value"] < 0 or requirements["same_node_bias"]["value"] < 0 or
            requirements["bandwidth"]["value"] < 0 or requirements["same_node_bias"]["value"] < 0)

@app.route('/create_metric', methods=['POST'])
def create_eval_metric():
    weights = request.get_json()

    if os.path.exists(local_path / ("../resources/eval_metrics/" + weights['metric_name']['name'] + ".json")):
        return "The metric already exists"

    with open(local_path / ("../resources/eval_metrics/" + weights['metric_name']['name'] + ".json"), "w") as writefile:
        requirements = weights["requirements"]
        try:
            if check_requirements_validity(requirements):
                writefile.close()
                os.remove(local_path / ("../resources/eval_metrics/" + weights['metric_name']['name'] + ".json"))
                return "The weights can't be negative"

        except KeyError:
            writefile.close()
            os.remove(local_path / ("../resources/eval_metrics/" + weights['metric_name']['name'] + ".json"))
            return "The request's format was incorrect"

        json.dump(weights, writefile)

    return "New metric added successfully"


@app.route('/update_metric', methods=['POST'])
def update_eval_metric():
    new_weights = request.get_json()

    try:
        with open(local_path / ("../resources/eval_metrics/" + new_weights['metric_name']['name'] + ".json"),
                  "r") as read_file:
            old_weights = json.load(read_file)
    except FileNotFoundError:
        return "The metric doesn't exist"
    except KeyError:
        return "The request's format was incorrect"

    with open(local_path / ("../resources/eval_metrics/" + new_weights['metric_name']['name'] + ".json"),
              "w") as writefile:
        requirements = new_weights["requirements"]
        try:
            if check_requirements_validity(requirements):
                json.dump(old_weights, writefile)
                return "The weights can't be negative"

        except KeyError:
            json.dump(old_weights, writefile)
            return "The request's format was incorrect"

        json.dump(new_weights, writefile)

    return "Metric weights updated successfully"


@app.route('/delete_metric', methods=['POST'])
def delete_eval_metric():
    metric = request.get_json()
    try:
        os.remove(local_path / ("../resources/eval_metrics/" + metric['metric_name']['name'] + ".json"))
    except FileNotFoundError:
        return "The metric doesn't exist"
    except KeyError:
        return "The request's format was incorrect"

    return "Metric deleted successfully"

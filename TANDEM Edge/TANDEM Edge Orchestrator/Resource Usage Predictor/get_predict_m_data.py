# alberto
import json
from flask import Flask, request, jsonify, Response
from flask_restful import Resource, Api
from flask_cors import CORS
# gsamaras
import concurrent.futures
import requests
import urllib.parse
import time
import threading
import glob
import numpy as np
import pandas as pd
import joblib
import statistics
import os
import re
import zipfile
from datetime import datetime, timedelta
from keras.models import Sequential
from keras.layers import LSTM
from keras.layers import Dense
from keras.layers import Bidirectional
from keras.models import load_model
from numpy import array
from sklearn.metrics import mean_absolute_percentage_error
from urllib.parse import urlparse


app = Flask(__name__)
CORS(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR']=True
api = Api(app)

pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 150)

trained_models = {
    "k8smaster": {
        "memory": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "cpu": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "received_throughput": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "transmitted_throughput": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        }
    },
    "k8ssecondary": {
        "memory": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "cpu": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "received_throughput": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "transmitted_throughput": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        }
    },
    "tansecond-cluster": {
        "memory": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "cpu": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "received_throughput": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        },
        "transmitted_throughput": {
            "1T": {"transformer": None, "model": None},
            "5T": {"transformer": None, "model": None},
            "15T": {"transformer": None, "model": None}
        }
    }
}


accuracy_thresholds = {
    "k8smaster": {
        "memory": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "cpu": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "received_throughput": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "transmitted_throughput": {"1T": 0.80, "5T": 0.80, "15T": 0.80}
    },
    "k8ssecondary": {
        "memory": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "cpu": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "received_throughput": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "transmitted_throughput": {"1T": 0.80, "5T": 0.80, "15T": 0.80}
    },
    "tansecond-cluster": {
        "memory": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "cpu": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "received_throughput": {"1T": 0.80, "5T": 0.80, "15T": 0.80},
        "transmitted_throughput": {"1T": 0.80, "5T": 0.80, "15T": 0.80}
    }
}


train_MAPE_threshold = 0.1

trained_models_lock = {
    "k8smaster": {
        "memory": {"1T": False, "5T": False, "15T": False},
        "cpu": {"1T": False, "5T": False, "15T": False},
        "received_throughput": {"1T": False, "5T": False, "15T": False},
        "transmitted_throughput": {"1T": False, "5T": False, "15T": False}
    },
    "k8ssecondary": {
        "memory": {"1T": False, "5T": False, "15T": False},
        "cpu": {"1T": False, "5T": False, "15T": False},
        "received_throughput": {"1T": False, "5T": False, "15T": False},
        "transmitted_throughput": {"1T": False, "5T": False, "15T": False}
    },
    "tansecond-cluster": {
        "memory": {"1T": False, "5T": False, "15T": False},
        "cpu": {"1T": False, "5T": False, "15T": False},
        "received_throughput": {"1T": False, "5T": False, "15T": False},
        "transmitted_throughput": {"1T": False, "5T": False, "15T": False}
    }
}

trained_models_accuracy = {
    "k8smaster": {
        "memory": {"1T": [], "5T": [], "15T": []},
        "cpu": {"1T": [], "5T": [], "15T": []},
        "received_throughput": {"1T": [], "5T": [], "15T": []},
        "transmitted_throughput": {"1T": [], "5T": [], "15T": []}
    },
    "k8ssecondary": {
        "memory": {"1T": [], "5T": [], "15T": []},
        "cpu": {"1T": [], "5T": [], "15T": []},
        "received_throughput": {"1T": [], "5T": [], "15T": []},
        "transmitted_throughput": {"1T": [], "5T": [], "15T": []}
    },
    "tansecond-cluster": {
        "memory": {"1T": [], "5T": [], "15T": []},
        "cpu": {"1T": [], "5T": [], "15T": []},
        "received_throughput": {"1T": [], "5T": [], "15T": []},
        "transmitted_throughput": {"1T": [], "5T": [], "15T": []}
    }
}


# Inner value will be dict with keys "timestamp" and "prediction"
predictions = {
    "k8smaster": {
        "memory": {"1T": [], "5T": [], "15T": []},
        "cpu": {"1T": [], "5T": [], "15T": []},
        "received_throughput": {"1T": [], "5T": [], "15T": []},
        "transmitted_throughput": {"1T": [], "5T": [], "15T": []}
    },
    "k8ssecondary": {
        "memory": {"1T": [], "5T": [], "15T": []},
        "cpu": {"1T": [], "5T": [], "15T": []},
        "received_throughput": {"1T": [], "5T": [], "15T": []},
        "transmitted_throughput": {"1T": [], "5T": [], "15T": []}
    },
    "tansecond-cluster": {
        "memory": {"1T": [], "5T": [], "15T": []},
        "cpu": {"1T": [], "5T": [], "15T": []},
        "received_throughput": {"1T": [], "5T": [], "15T": []},
        "transmitted_throughput": {"1T": [], "5T": [], "15T": []}
    }
}


class Predict(Resource):
    def __init__(self):
        self.n_steps = 3
        self.out = 1
        self.horizon_to_range_selector_map = {"1T": "3", "5T": "15", "15T": "45"}
        prom_ip = os.environ.get("PROMETHEUS_IP")
        print(prom_ip)
        self.prometheus_base_url = prom_ip if prom_ip != None else "http://0.0.0.0:9090"

        # Master instance
        self.k8smaster_memory_transformer_path = "trained_models/ts_forecasting_memory/k8smaster/1T/mem_standard_scaler_master.gz"
        self.k8smaster_cpu_transformer_path = "trained_models/ts_forecasting_cpu/k8smaster/1T/cpu_standard_scaler_master.gz"
        self.k8smaster_received_throughput_transformer_path = "trained_models/ts_forecasting_rec/k8smaster/1T/rec_standard_scaler_master.gz"
        self.k8smaster_transmitted_throughput_transformer_path = "trained_models/ts_forecasting_transmitted/k8smaster/1T/transm_standard_scaler_master.gz"
        # Secondary instance
        self.k8ssecondary_memory_transformer_path = "trained_models/ts_forecasting_memory/k8ssecondary/1T/mem_standard_scaler_secondary.gz"
        self.k8ssecondary_cpu_transformer_path = "trained_models/ts_forecasting_cpu/k8ssecondary/1T/cpu_standard_scaler_secondary.gz"
        self.k8ssecondary_received_throughput_transformer_path = "trained_models/ts_forecasting_rec/k8ssecondary/1T/rec_standard_scaler_secondary.gz"
        self.k8ssecondary_transmitted_throughput_transformer_path = "trained_models/ts_forecasting_transmitted/k8ssecondary/1T/transm_standard_scaler_secondary.gz"
        
    def load_models(self, instance, horizon, monitored_type_lst):
        #model_files = glob.glob('trained_models/ts_forecasting_cpu/master/5T/lstm*/lstm*')
        for monitored_type in monitored_type_lst:
            if trained_models[instance][monitored_type][horizon]["model"] == None:
                #trained_models[instance][monitored_type][horizon]["transformer"] = joblib.load(self.k8smaster_memory_transformer_path)
                
                os.system(f'curl --output ts_forecasting_{monitored_type}_{instance}_{horizon}.tar.xz --header "PRIVATE-TOKEN: <my_private_token>" --header "User-Agent: Firefox/58.0" --noproxy "*" "https://colab-repo.intracom-telecom.com/api/v4/projects/77/repository/archive/?path=trained_models/ts_forecasting_{monitored_type}/{instance}/{horizon}"')
                os.system(f'tar -xvf ts_forecasting_{monitored_type}_{instance}_{horizon}.tar.xz')
                zip_files = glob.glob(f"model-repo-main-*-trained_models-ts_forecasting_{monitored_type}-{instance}-{horizon}/trained_models/ts_forecasting_{monitored_type}/{instance}/{horizon}/lstm*.zip")
                with zipfile.ZipFile(zip_files[0], 'r') as z:
                    z.extractall(f'ts_forecasting_{monitored_type}_{instance}_{horizon}/')
                #os.system(f'unzip model-repo-main-*-trained_models-ts_forecasting_{monitored_type}-{instance}-{horizon}-/trained_models/ts_forecasting_{monitored_type}/{instance}/{horizon}/lstm*.zip -d ts_forecasting_{monitored_type}_{instance}_{horizon}/')
                model_files = glob.glob(f"ts_forecasting_{monitored_type}_{instance}_{horizon}/lstm*")
                #model_files = glob.glob(f"trained_models/ts_forecasting_{monitored_type}/{instance}/{horizon}/lstm*/lstm*")
                trained_models[instance][monitored_type][horizon]["model"] = load_model(model_files[0])
        
        return trained_models

    # Appends 'new_prediction' only if its timestamp is not found in the 'predictions_list'
    def try_append_prediction(self, predictions_list, new_prediction):
        # Check if a prediction with the same timestamp already exists
        found = False
        for prediction in predictions_list:
            if prediction['timestamp'] == new_prediction['timestamp']:
                found = True
                break

        # If no matching timestamp is found, append the new prediction
        if found == False:
            predictions_list.append(new_prediction)

    def predict_values(self, values, transformer, model):
        # Scaled
        #values = transformer.transform(np.array(values).reshape(-1, 1))

        n_features = self.out
        online_values = np.array([values])
        online_values = online_values.reshape((online_values.shape[0], online_values.shape[1], n_features))

        yhat = model.predict(online_values, verbose=0)
        yhat = yhat.tolist()
        print(yhat[0][0])
        # Scaled
        #unscaled_predicted_values = transformer.inverse_transform(yhat)
        #unscaled_predicted_values = unscaled_predicted_values.tolist()
        #print(unscaled_predicted_values)

        return yhat[0][0]   

    def predict_values_util(self, instance, horizon, monitored_type, df, response_payload):
        values = df[monitored_type][-self.n_steps:]
        prediction = self.predict_values(values, trained_models[instance][monitored_type][horizon]["transformer"], trained_models[instance][monitored_type][horizon]["model"])
        response_payload[f"{monitored_type}_prediction"] = prediction
        self.try_append_prediction(predictions[instance][monitored_type][horizon], {"timestamp": response_payload["predicted_timestamp"], "prediction": prediction})

        return response_payload

    def get(self, cluster, instance, horizon, monitored_type):
        # 'cluster' not actually used, since Promtheus URL is set in predict.yaml
        print(f"{cluster}, {instance}, {horizon}, {monitored_type}, {self.prometheus_base_url}")
        
        memory_q = f'topk({self.horizon_to_range_selector_map[horizon]}, node_memory_Active_bytes{{instance="{instance}"}} / node_memory_MemTotal_bytes{{instance="{instance}"}} * 100)[{self.horizon_to_range_selector_map[horizon]}m:]'
        cpu_q = f'topk({self.horizon_to_range_selector_map[horizon]}, 100 - avg(rate(node_cpu_seconds_total{{mode="idle", instance="{instance}"}}[1m]) * 100))[{self.horizon_to_range_selector_map[horizon]}m:]'
        received_throughput_q = f'topk({self.horizon_to_range_selector_map[horizon]}, sum(rate(node_network_receive_bytes_total{{instance="{instance}"}}[1m]))/1000000*8)[{self.horizon_to_range_selector_map[horizon]}m:]'
        transmitted_throughput_q = f'topk({self.horizon_to_range_selector_map[horizon]}, sum(rate(node_network_transmit_bytes_total{{instance="{instance}"}}[1m]))/1000000*8)[{self.horizon_to_range_selector_map[horizon]}m:]'

        urls = []
        urls.append(self.create_prometheus_query_url(memory_q))
        urls.append(self.create_prometheus_query_url(cpu_q))
        urls.append(self.create_prometheus_query_url(received_throughput_q))
        urls.append(self.create_prometheus_query_url(transmitted_throughput_q))

        # monitored_type should be "memory+cpu" for example
        monitored_type_lst = monitored_type.split("+")
        self.load_models(instance, horizon, monitored_type_lst)

        parsed_prometheus_base_url = urlparse(self.prometheus_base_url)
        prometheus_ip_address = parsed_prometheus_base_url.hostname
        os.environ['NO_PROXY'] = os.environ['NO_PROXY'] + ',' + prometheus_ip_address
        response = [requests.get(url).content for url in urls]
        #print(response)
        data = []
        for response_item in response:
            #print(response_item)
            string = response_item.decode('utf-8')
            json_obj = json.loads(string)
            #print(json_obj["data"]["result"][0]["values"])
            data.append(json_obj["data"]["result"][0]["values"])

        #print(data)
        combined_list = self.combine_data(data)
        #print(combined_list)

        df = self.create_df(combined_list)
        self.check_if_retraining_needed(monitored_type_lst, df, instance, monitored_type, horizon)

        predicted_timestamp = df.iloc[-1]["timestamp"] + timedelta(minutes=self.remove_letters(horizon))
        response_payload = {"predicted_timestamp": predicted_timestamp.__str__()}

        df = self.resample_df(df, horizon)
        self.check_if_retraining_needed(monitored_type_lst, df, instance, monitored_type, horizon)
            
        #for monitored_type in monitored_type_lst:
        #    response_payload = self.predict_values_util(instance, horizon, monitored_type, df, response_payload)

        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = [executor.submit(self.predict_values_util, instance, horizon, monitored_type, df, response_payload) for monitored_type in monitored_type_lst]
            for future in concurrent.futures.as_completed(futures):
                response_payload = future.result()

        print(trained_models_accuracy)
        print(trained_models_lock)
        print(predictions)
        print(response_payload)

        response=app.response_class(
            response=json.dumps(response_payload, indent=4),
            status=200,
            mimetype='application/json'
        )
        return response

    @app.route('/train', methods=['POST'])
    def trigger_training(self, instance, resource_type, horizon):
        trained_models_lock[instance][resource_type][horizon] = True
        training_thread = threading.Thread(target=self.train, args=(instance, resource_type, horizon))
        training_thread.start()

        print("Training process started.")

    def train(self, instance, resource_type, horizon):
        data = None
        if "k8smaster" == instance:
            data = pd.read_csv(f"data/logfile_k8smaster_first_100_points.csv")
        elif "k8ssecondary" == instance:
            data = pd.read_csv("data/logfile_k8ssecondary_first_100_points.csv")
        data['timestamp'] = pd.to_datetime(data['timestamp'], unit='s')
        data = self.resample_df(data, horizon)
        lim = int(np.round(0.60 * len(data.index)))
        resource_types_map = {"memory": "Memory Consumption", "cpu": "CPU Consumption", "received_throughput": "Received Throughput", "transmitted_throughput": "Transmitted Throughput"}
        train = data[resource_types_map[resource_type]].head(lim)
        test = data[resource_types_map[resource_type]][lim:]

        units_lst = [50, 100]
        epochs_lst = [50, 100, 200]
        for units in units_lst:
            for epochs in epochs_lst:
                print(f"Training LSTM with {units} units and {epochs} epochs.")
                model, MAPE = self.train_LSTM(train, test, units, epochs)

                if MAPE < train_MAPE_threshold:
                    path_to_new_model = f"trained_models/ts_forecasting_{resource_type}/{instance}/{horizon}/lstm{resource_type}_{instance}/lstm{resource_type}_{instance}"
                    self.create_dir_if_not_exist(path_to_new_model)
                    model.save(path_to_new_model)
                    trained_models[instance][resource_type][horizon]["model"] = load_model(path_to_new_model)

                    trained_models_lock[instance][resource_type][horizon] = False
                    print(f"Training for {instance}, {resource_type}, {horizon} completed.")
                    return True                        

        print(f"Model not updated, MAPE ({MAPE}) was greater or equal than the threshold ({train_MAPE_threshold})")
        return False

    def train_LSTM(self, train, test, units=100, epochs=200):
        memcol = train.to_numpy()
        memrow = memcol.tolist()
        testcol = test.to_numpy()
        testrow = testcol.tolist()

        raw_seq = memrow

        n_steps = self.n_steps
        out = self.out

        X, y = self.splitsequence(raw_seq, n_steps)

        n_features = 1
        X = X.reshape((X.shape[0], X.shape[1], n_features))
        print("X shape is", X.shape)
        print("y shape is", y.shape)

        model = Sequential()
        model.add(
            Bidirectional(
                LSTM(units, activation="relu"), input_shape=(n_steps, n_features)
            )
        )
        model.add(Dense(out))
        model.compile(optimizer="adam", loss="mse")
        model.fit(X, y, epochs=epochs, verbose="auto", use_multiprocessing=False)

        Xx, Yy = self.splitsequence(testrow, n_steps)
        x_input = Xx

        x_input = x_input.reshape((x_input.shape[0], x_input.shape[1], n_features))
        print("x_input shape is", x_input.shape)
        print("Yy shape is", Yy.shape)

        yhat = model.predict(x_input, verbose=0)

        MAPE = mean_absolute_percentage_error(Yy, yhat)
        print(f"MAPE: {MAPE}")

        return model, MAPE


    # Split an univariate sequence
    def splitsequence(self, sequence, n_steps):
        X, y = list(), list()
        for i in range(len(sequence)):
            # find the end of this pattern
            end_ix = i + n_steps
            # check if we are beyond the sequence
            if end_ix > len(sequence) - 1:
                break
            seq_x, seq_y = sequence[i:end_ix], sequence[end_ix]
            X.append(seq_x)
            y.append(seq_y)
        return array(X), array(y)

    def create_dir_if_not_exist(self, newpath):
        if not os.path.exists(newpath):
            os.makedirs(newpath)

    def remove_letters(self, s):
        # '15T' to 15
        return int(re.sub(r'[A-Za-z]', '', s))

    def create_prometheus_query_url(self, q):
        encoded_q = urllib.parse.quote(q)
        url = f"{self.prometheus_base_url}/api/v1/query?query={encoded_q}"
        return url

    def combine_data(self, data):
        grouped_dict = {}
        for sublist in data:
            for pair in sublist:
                key = pair[0]
                if key not in grouped_dict:
                    grouped_dict[key] = []
                grouped_dict[key].extend(pair[1:])

        combined_list = [[key] + values for key, values in grouped_dict.items()]
        return combined_list

    def create_df(self, combined_list):
        df = pd.DataFrame(combined_list, columns=["timestamp", "memory", "cpu", "received_throughput", "transmitted_throughput"])
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
        df[["memory", "cpu", "received_throughput", "transmitted_throughput"]] = df[["memory", "cpu", "received_throughput", "transmitted_throughput"]].apply(pd.to_numeric)
        print(df.head())
        print(len(df.index))
        return df

    def resample_df(self, df, resample_rate):
        df.set_index('timestamp', inplace=True)
        # Resample the DataFrame to 'resample_rate' (e.g. 15-minute) intervals and calculate the mean of each interval
        downsampled_df = df.resample(resample_rate).mean()
        # Reset the index to the original index and keep the date in a separate column
        downsampled_df.reset_index(inplace=True)
        df = downsampled_df.copy()
        print(df.head())
        return df

    def check_if_retraining_needed(self, monitored_type_lst, df, instance, monitored_type, horizon):
        for monitored_type in monitored_type_lst:
            if self.try_to_compute_accuracy(df, instance, monitored_type, horizon) == True:
                median_acc = self.calculate_median_accuracy(instance, monitored_type, horizon)
                if median_acc != None and median_acc < accuracy_thresholds[instance][monitored_type][horizon] and trained_models_lock[instance][monitored_type][horizon] == False:
                    print(f"Training for instance {instance} {monitored_type} {horizon} started.")
                    self.trigger_training(instance, monitored_type, horizon)

    # If this methods finds any real value in the df that is the same timestamp
    # with any of the predictions, it calculates the accuracy and returns 'True'.
    def try_to_compute_accuracy(self, df, instance, resource_type, horizon):
        accuracy_computed = False
        inner_lst = predictions[instance][resource_type][horizon]  # List of pairs [timestamp, prediction]
        pairs_to_remove = []
            
        for pair in inner_lst:
            matching_row = df[df["timestamp"] == pair["timestamp"]]
            if len(matching_row.index) > 0:
                print(f"{matching_row[resource_type]}, {pair['prediction']}")
                self.get_single_prediction_accuracy(instance, resource_type, horizon, matching_row[resource_type].iloc[0], pair['prediction'])
                pairs_to_remove.append(pair)
                accuracy_computed = True

        for pair_to_remove in pairs_to_remove:
            inner_lst.remove(pair_to_remove)

        return accuracy_computed

    def get_single_prediction_accuracy(self, instance, resource_type, horizon, real_value, predicted_value):
        if real_value > 0.0 and predicted_value != None:
            accuracy = 0
            if real_value < predicted_value and predicted_value > 0.0:
                accuracy = real_value/predicted_value
            else:
                accuracy = predicted_value/real_value
            if accuracy > 0.0:
                print(f"Accuracy: {accuracy}")
                trained_models_accuracy.get(instance).get(resource_type).get(horizon).append(accuracy)       
    
    def calculate_median_accuracy(self, instance, resource_type, horizon):
        median_accuracy = 0.0
        accuracy_list = trained_models_accuracy.get(instance).get(resource_type).get(horizon)
        if len(accuracy_list) <= 0:
            print(f"Could not calculate average accuracy, because accuracy list is empty for instance {instance}, resource_type {resource_type} and horizon {horizon}.")
            return None
        median_accuracy = statistics.mean(accuracy_list)
        print(f"Average accuracy: {median_accuracy}")
        #trained_models_accuracy.get(instance).get(resource_type).get(horizon).clear()
        return median_accuracy
        


api.add_resource(Predict, '/predict/<cluster>/<instance>/<horizon>/<monitored_type>') # Route 0

if __name__ == "__main__": 
    app.run(host='0.0.0.0', port=5556, debug=True)

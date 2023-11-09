import kfp
import kfp.components as comp
import os
from .component import Component

class ComponentMapper(object):
    """
    ComponentMapper represents a mapper that can map runtime pipelines to 
    setup pipelines.
    """
    def __init__(self) -> None:
        
        cur_dir = os.path.dirname(__file__)        
        rel_path = '../components/'
        
        setup_components = ['core_paas', 'custom_paas', 'edgex_mqtt_writer', 'iot_device', 'webhook', 
            'hardware_controller_service_function', "motion_planning_service_function", "object_detection_cans_service_function", "object_detection_pills_service_function", "pick_and_place_service_function"]

        self.mapper = {
            "iot_device": {
                "setup_components": [
                    {
                        "comp_id": "core_paas",
                        "dependencies": [],
                        "parameters": {
                            "default": {
                                "core_paas": "edgex"
                            },
                            "from_previous": {}
                        },
                        "output": []
                    },
                    {
                        "comp_id": "iot_device",
                        "dependencies": ["core_paas"],
                        "parameters": {
                            "default": {
                                "device_name": "mytandemdevice",
                                "values_file": "values.json"
                            },
                            "from_previous": {}
                        },
                        "output": []
                    },
                    {
                        "comp_id": "custom_paas",
                        "dependencies": ["core_paas"],
                        "parameters": {
                            "default": {
                                "paas_service_name": "iotmonitoring",
                                "paas_instance_name": "tandemtest",
                                "autoscaling_type": "minimize_cost",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002",
                                "all_node_ports": "True",
                            },
                            "from_previous": {}
                        },
                        "output": ["output_path"]
                    },
                    {
                        "comp_id": "edgex_mqtt_writer",
                        "dependencies": ["custom_paas"],
                        "parameters": {
                            "default": {

                            },
                            "from_previous": {
                                "custom_paas": [("output_path", "custom_paas_file")]

                            }
                        },
                        "output": []
                    }

                ]
            },
            "notification": {
                "setup_components": [
                    {    
                        "comp_id": "webhook",
                        "dependencies": ["iot_device", "edgex_mqtt_writer"],
                        "parameters": {
                            "default": {
                                "event_name": "notification",
                                "image": "johnkalogero/notify:v0.2"
                            },
                            "from_previous": {
                                "custom_paas": [("output_path", "custom_paas_file")]
                            }
                        },
                        "output": []
                    }
                ]
            },
            "robot_device": {
                "setup_components": [
                    {
                        "comp_id": "hardware_controller_service_function",
                        "dependencies": [],
                        "parameters": {
                            "default": {
                                "service_function_name": "hardware-controller",
                                "service_function_instance_name": "hardware-controller",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_Robot",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    },
                    {
                        "comp_id": "motion_planning_service_function",
                        "dependencies": ["hardware_controller_service_function"],
                        "parameters": {
                            "default": {
                                "service_function_name": "motion-planning",
                                "service_function_instance_name": "motion-planning",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_Robot",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    },
                    {
                        "comp_id": "object_detection_cans_service_function",
                        "dependencies": [],
                        "parameters": {
                            "default": {
                                "service_function_name": "object-detection-cans",
                                "service_function_instance_name": "object-detection-cans",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_2",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    },
                    {
                        "comp_id": "pick_and_place_service_function",
                        "dependencies": ["motion_planning_service_function"],
                        "parameters": {
                            "default": {
                                "service_function_name": "pick-and-place",
                                "service_function_instance_name": "pick-and-place",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_Robot",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    }
                ]
            },
            "hw_controller": {
                "setup_components": [
                    {
                        "comp_id": "hardware_controller_service_function",
                        "dependencies": [],
                        "parameters": {
                            "default": {
                                "service_function_name": "hardware-controller",
                                "service_function_instance_name": "hardware-controller",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_Robot",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    }
                ]
            },
            "motion_planning": {
                "setup_components": [
                    {
                        "comp_id": "motion_planning_service_function",
                        "dependencies": [],
                        "parameters": {
                            "default": {
                                "service_function_name": "motion-planning",
                                "service_function_instance_name": "motion-planning",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_Robot",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    }
                ]
            },
            "object_detection_cans": {
                "setup_components": [
                    {
                        "comp_id": "object_detection_cans_service_function",
                        "dependencies": [],
                        "parameters": {
                            "default": {
                                "service_function_name": "object-detection-cans",
                                "service_function_instance_name": "object-detection",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_2",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    }
                ]
            },
            "object_detection_pills": {
                "setup_components": [
                    {
                        "comp_id": "object_detection_pills_service_function",
                        "dependencies": [],
                        "parameters": {
                            "default": {
                                "service_function_name": "object-detection-pills",
                                "service_function_instance_name": "object-detection",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_2",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    }
                ]
            },
            "pick_n_place": {
                "setup_components": [
                    {
                        "comp_id": "pick_and_place_service_function",
                        "dependencies": [],
                        "parameters": {
                            "default": {
                                "service_function_name": "pick-and-place",
                                "service_function_instance_name": "pick-and-place",
                                "count_min": "1",
                                "count_max": "1",
                                "location": "Peania_Athens_19002_Robot",
                            },
                            "from_previous": {}
                        },
                        "output": []
                    }
                ]
            }
        }

        self.components = set(self.mapper.keys())

    
    def get_components(self):
        return self.components
    
    def getComp(self, runtime_comp):
        """
        Function that recieves a runtime component and returns
        a list of set up components (list of instances of
        the class `Component`).

        Parameters
        ==========

        runtime_comp: string
            The name of the runtime component
        """
        # return [self.compid2Comp[c["comp_id"]] for c in self.mapper[runtime_comp]["setup_components"]]
        return self.mapper[runtime_comp]["setup_components"]

from typing import NamedTuple
import os
import json
import copy

import kfp
from kfp import dsl

from .utils.component_mapper import ComponentMapper
from .utils.component import Component
from .utils.dfs import dfs
from .utils.topological_sorting import kahn
from .utils.construct_parameters import construct_dependencies, construct_input, construct_parameters



def convert(input):
    
    # get the set of components
    components_set = set([(c['type'], c['name']) for c in input['components']])


    # map runtime components with setup components
    component_mapper = ComponentMapper()

    if not set([el[0] for el in components_set]).issubset(component_mapper.get_components()):
        raise Exception(f"Sorry, the following component(s) are not valid: {components_set - component_mapper.get_components()}")

    runtime_setup_components = {
        c['name']:{
            "comp": copy.deepcopy(component_mapper.getComp(c['type'])), 
            "rc_dependencies":c['dependencies'], 
            "input_from_prev": c['parameters']['input_from_prev'],
            "input_from_user": c['parameters']['input_from_user']
            }
        for c in input['components']
    }

    # get a dictionary of `Component` instances
    components = {f'{r_c}-{c["comp_id"]}': Component(
                                        os.path.join('src/components', f'{c["comp_id"]}/{c["comp_id"]}.yaml'), 
                                        f'{r_c}-{c["comp_id"]}',                          # set component's name
                                        construct_dependencies(c['dependencies'], runtime_setup_components, s_c['rc_dependencies'], r_c),   # set component's dependencies
                                        construct_input(c, runtime_setup_components, r_c),   # set component's input
                                        c['output'],                               # set component's output
                                        construct_parameters(c['parameters']['default'], s_c))         # set component's parameters CHECK IF MODIFIED BY CONSTRUC_INPUT
                                            for r_c, s_c in runtime_setup_components.items() 
                                                for c in s_c["comp"]}

    # sort components based on the dependencies
    sorted_kahn = kahn(components)
    
    # create kfp pipeline
    @dsl.pipeline()
    def tandem_pipeline():
        
        results = {el[0]: [] for el in sorted_kahn}
        
        
        for name, component in sorted_kahn:
            # get the default parameters - or the params as defined by the user input
            params = component.getParameters()
            # get the forwarded output from the previous components 
            _input = component.getInput() 
            # get the function op
            f = component.getCompFunc() 
            # construct list of dependencies
            dep = [results[el] for el in component.getDependencies()] 

            # get a dictionary with keys the name of the parameter and value the `results[prev_component].outputs[<prev_output_parameter_name>]`
            forwarded_params = {
                in_name: results[prev_component].outputs[out_name] 
                    for prev_component in _input 
                        for out_name, in_name in _input[prev_component]
                        }


            # create the component by calling the function and store the result
            results[name] = f(**{**params, **forwarded_params}).after(*dep)
            



    # Compiling the pipeline
    r = kfp.compiler.Compiler().compile(tandem_pipeline, 'tandem_pipeline.yaml')

    kf_pipelines_host = 'http://ml-pipeline.kubeflow'
    port = '8888'
    credentials = kfp.auth.ServiceAccountTokenVolumeCredentials(path=None)
    # c = kfp.Client(host='http://ml-pipeline.kubeflow:8888', credentials=credentials)

    client = kfp.Client(host=f'{kf_pipelines_host}:{port}', credentials=credentials)
    # Compile, upload, and submit pipeline for execution
    pipeline_run = client.create_run_from_pipeline_func(tandem_pipeline, arguments={})
    return 'Submitted pipeline.'
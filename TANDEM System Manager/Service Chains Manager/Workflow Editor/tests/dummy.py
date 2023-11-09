#!/usr/bin/env python3
# Copyright 2020 The Kubeflow Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


# %% [markdown]
# # DSL control structures tutorial
# Shows how to use conditional execution and exit handlers.

# %%
from typing import NamedTuple

import kfp
from kfp import dsl
from kfp.components import func_to_container_op, InputPath, OutputPath
from functools import partial
from kfp import components, dsl
# %% [markdown]
# ## Conditional execution
# You can use the `with dsl.Condition(task1.outputs["output_name"] = "value"):` context to execute parts of the pipeline conditionally

# %%

func_to_container_op = partial(
    components.func_to_container_op,
    base_image='tensorflow/tensorflow:2.12.0rc0-jupyter',
)

@func_to_container_op
def dummy1() -> list:
    
    import requests
    # def getServices():
    api = 'http://localhost:8080/mec_platform/applications/mec_dataspace_connectors/services'
    r = requests.get(api)
    if r.status_code != 200:
        return []
    else:
        r = r.json()
        services = [el['links']['_self']['href'] for el in r]
        print(f"Number of services: {len(services)}")
        return services

@func_to_container_op
def dummy11():
    print("RUNS IN PARALLEL")

@func_to_container_op
def dummy2(services) -> str:
    print(services)
    return services[0]


@func_to_container_op
def dummy3(message: str):
    print(message)
    

@dsl.pipeline(name='THE DUMMIEST')
def dummy_pipeline():
    dummy11()
    s=dummy1()
    m=dummy2(s.output)
    dummy3(m.output)

    
if __name__ == '__main__':
    # Compiling the pipeline
    pipeline_filename = __file__.replace(".py","") + '.yaml'
    kfp.compiler.Compiler().compile(dummy_pipeline, pipeline_filename)
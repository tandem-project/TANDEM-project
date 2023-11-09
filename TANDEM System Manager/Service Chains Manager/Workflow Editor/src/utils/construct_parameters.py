def construct_input(setup_comp, runtime_setup_components, r_c):
    """
    Edit comp_param in order to define which parameters will 
    be selected from previous components

    Return the input from each component.
    (run_time_comp_name, setup_comp)
    """

    res = {}
    _prev_params = {k:[list(el)+[False] for el in v] for k,v in setup_comp['parameters']['from_previous'].items()}
    # for every parameter needed from a previous RUNTIME component
    for param_name, value in runtime_setup_components[r_c]["input_from_prev"].items():
        # get PREVIOUS R_C and OUTPUT NAME
        # NOTE: key should be equal to "output"
        prev_rc_comp, key, output_name = value.split(".")
        # search the SETUP COMPONENT within CURRENT R_C 
        # and find the one with output `ouput_name`
        prev_s_c = None
        for st_comp_desc in runtime_setup_components[prev_rc_comp]['comp']:
            if output_name in st_comp_desc[key]:
                prev_s_c = st_comp_desc['comp_id']
                break
        
        # delete from setup_comp
        for s_comp in _prev_params:
            if s_comp == prev_s_c:
                for i, [o, p, visited] in enumerate(_prev_params[s_comp]):
                    if o == output_name and p == param_name and not visited:
                        _prev_params[s_comp][i][2] = True

        
        
        ###################
        # update res
        ###################

        # add in list of the key <prev_setup_comp_name> the tuple (<output_name>, <param_name>)
        prev_s_c_name = f'{prev_rc_comp}-{prev_s_c}'
        if prev_s_c_name not in res:
            res[prev_s_c_name] = []
        res[prev_s_c_name].append((output_name, param_name))



    #############################
    # update res from  setup_comp
    #############################
    # for the remaining params in `from_previous`
    for s_comp in _prev_params:
        prev_s_c_name = f'{r_c}-{s_comp}'
        if prev_s_c_name not in res:
            res[prev_s_c_name] = []
        for t in _prev_params[s_comp]:
            # setup_comp['parameters']['from_previous'][s_comp].remove(t)
            if not t[2]:
                res[prev_s_c_name].append((t[0], t[1]))


    return res



def construct_dependencies(deps, runtime_setup_components, rc_dependencies, current_r_c):
    """
    Return a list of tuples denoting:
    (runtime_comp_name, dependency)

    To construct the dependencies, we take into account:
    1. The dependencies defined within each `set_up` components
    2. The dependencies defined by the user on the `run_time` components

    The resulting dependencies are the set_up components that the current component
    should depend on, that also correspond to a run_time component, on which the initial
    run_time_component depends on.
    
    ## Parameters:

    * dep: Dependencies of the current set_up component
    * runtime_setup_components: all the run_time_setup_components

    """
    res = []
    _deps = [[dep, False] for dep in deps]
    # for every dependency
    for i, (dep, visited) in enumerate(_deps):
        # for every runtime component
        for r_c, s_c in runtime_setup_components.items():
            if r_c in rc_dependencies:
                for c in s_c["comp"]:
                    if dep == c['comp_id'] and not visited:
                        res.append(f'{r_c}-{dep}')
                        _deps[i][1] = True
    
    
    
    for dep, visited in _deps:
        if not visited:
            res.append(f'{current_r_c}-{dep}')
        
    
    return res


def construct_parameters(parameters, s_c):
    # for rc in runtime_setup_components:
    #     print(f"RC {rc}\n{runtime_setup_components[rc]}")
    for param_name, param_value in s_c['input_from_user'].items():
        if param_name in parameters:
            print(f"CHANGED {param_name} from {parameters[param_name]} to {param_value}")
            parameters[param_name] = param_value
    print("="*80)
    return parameters
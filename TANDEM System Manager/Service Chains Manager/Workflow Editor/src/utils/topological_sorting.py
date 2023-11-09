def convert_adj_list(g):

    return {comp: {"adj_list": g[comp].getDependencies().copy(), "component": g[comp]} for comp in g}


def kahn(g: dict) -> list:
    """
    Implementation of Kahn's Algorithm.
    
    Parameters:
    ===========

    g: dict
        A dictionary with keys the `node_id` and values a dictionary containing the `adj_list` and `component`.
    """

    g = convert_adj_list(g)
    result = []
    # s: set of all nodes with no dependencies (no incoming edges)
    s = set([n for n in g if not g[n]['adj_list']])
    
    while s:
        n = s.pop() 
        result.append(n)
        for m in g:
            if n in g[m]['adj_list']:
                g[m]['adj_list'].remove(n)
                if not g[m]['adj_list']:
                    s.add(m)

    return [(el,g[el]['component']) for el in result]

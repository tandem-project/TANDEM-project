def convert_adj_list(adj_list):
    return {el['comp_id']: {"adj_list": el['dependencies'], "parameters": el['parameters']} for el in adj_list}

def visit(adj_list, visited, n, result):
    q = []
    if visited[n] == False:
        visited[n] = 1
        q.append(n)

        for neighbour in adj_list[n]['adj_list']:
            visit(adj_list, visited, neighbour, result)
    
        visited[n] = True
        result.append(q.pop())
    

    
def dfs(adj_list):

    result = []

    adj_list = convert_adj_list(adj_list)

    visited = {node: False for node in adj_list.keys()}
    while len([el for el in visited if visited[el] == False]):

        n= [el for el in visited if visited[el] == False][0]
        visit(adj_list, visited, n, result)

    return result
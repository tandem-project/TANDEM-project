The π-edge continuum manager is the management part of π-edge. Initially, there is the service functions catalogue and the PaaS Services Catalogue. The service functions catalogue contains a number of available services that the user can request. The catalog defines the amount of resources (CPU, RAM, etc.) required by the service. The user can define parameters regarding the scaling policy, storage capacity, and the number of copies. The PaaS Services Catalogue includes the available PaaS Services offered to users. A PaaS Service is defined by a list of Services from the service functions catalogue. As before, the user can define parameters regarding the scaling policy, storage capacity, and the number of copies.

To determine the ideal node that will host the user's request, various hard and soft requirements are taken into account. These requirements may include minimizing latency, maximizing bandwidth, relieving overloaded nodes/clusters, minimizing energy, and others. The soft requirements and their importance create the optimization strategy that is taken into account when placing the service. There is a list of optimization strategies in the system, and each one serves a different purpose (e.g., minimizing delay, relieving overloaded systems, etc.).

In the attempt to assign a request to a node, the algorithm takes into account the hard and soft requirements. In the case of a service request, all available nodes are checked, and a list is created of the nodes that meet the hard requirements. In the case of a PaaS Service Request, due to the requirement that the entire PaaS Service must be placed in the same cluster, a list of available clusters is created. Then, taking into account the optimization strategy, in the case of the service request, a score is assigned to each node, and the node with the highest score is selected for placement. For the PaaS Request case, the clusters near the requested coverage area are selected, and then, iteratively, each service is placed (virtually) on the best node of the cluster under evaluation. Then, the scores of each service placement are summed up to determine the overall score of the cluster for the placement of the PaaS Service. In the end, the branch with the highest score is selected.

To request a service to deploy. Body example:

```
{
    “service_name”: “demo-paas_two_volumes”,
    “autoscaling_type”: “maximize_performance”,
    “eval_metric_name”: “default_metric”,
    “count_min”: 1,
    “count_max”: 5,
    “location”: “Peania_Athens_19002”
}
```

To request a paas service to deploy. Body example:

```
{
    “paas_service_name”: “EdgeX”,
    “autoscaling_type”: “maximize_performance”,
    “eval_metric_name”: “default_metric”,
    “count_min”: 1,
    “count_max”: 5,
    “location”: “Peania_Athens_19002”
}
```

To enable the algorithm to decide on the optimal cluster and node for placing a service, it utilizes certain metrics that we have defined, which make up the optimization strategy. These are:

* CPU: The computing power the service intends to use. If the node under consideration cannot provide the required computing power to the service, it is automatically rejected.
* RAM: The memory the service intends to use. If the node under consideration cannot provide the required memory to the service, it is automatically rejected.
* Latency: The delay between the controlled node and the end user of the service. Latency is one of the most important parameters. It functions both as a hard requirement, meaning that the service to be placed must have at most X delay from the end user, and as a soft requirement, meaning we try to minimize it as much as possible. Since we have not yet found a way to calculate latency, a random value is fictitiously assigned to the nodes.
* Bandwidth: The network capacity. Also an important metric which can be used both as a hard requirement and as a soft requirement when placing a service. It is not currently available in π-edge and is therefore not used.
* Energy: The metric related to energy consumption. According to related research (which may be outdated), idle processors consume relatively little energy, and this increases sharply when the processor starts to be used, and then the increase is relatively linear. Therefore, when taking this metric into account, the algorithm tries to place services on nodes that are not idle.
* Duplication Space: This metric exists in order to prefer nodes that will allow the service to create more copies of itself on the node where it will be placed, if needed.
* Prioritize Full: This metric, if used in the optimization strategy, gives points to nodes that tend to fill up with memory and computing power demands.
* Prioritize Empty: This metric, if used in the optimization strategy, gives points to nodes that are not using a large percentage of their computing power and memory.
* Location Requested: If the user requests their service to be placed in a specific cluster, this metric will give more weight to the nodes of that cluster.
* Prioritize Underloaded clusters: This metric gives weight to placing services in clusters that are less loaded.
* Load Prediction: This metric collaborates with predictive neural networks to estimate the consumption of nodes at a future time. Based on the other metrics and the estimates of neural networks, the future state of the nodes is taken into account for placing the service. It has not yet been implemented.
* Same Node Bias: When we have a PaaS Service, which consists of many services, often for simplicity, we want the services to be placed on the same node. This metric examines up to what % worse the node where we placed the previous service can be, in order to place the next one there.


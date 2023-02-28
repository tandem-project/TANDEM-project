# Location APIs

## Description
This is a small repo to experiment with the implementation of the Location APIs that will be available in π-edge.

At this stage, the following 3 web services have been created:

1. MEC Platform
2. MEC application - service producer
3. MEC application - service consumer

The above web services are being used in the following 2 scenarios:
1. Service Consumer able to consume MEC Location API services from the MEC Platform. It needs to communicate the MEC Platform and get the results that the MEC Platform makes available. For that, MEC Platform can use dummy datasets as mentioned above, but the way that the communication will take place, will need to follow the MEC APIs and MEC data models and schema of information

2. Service Consumer able to consume a (dummy/hello world) service by another application, i.e., the service producer. It will have to go to the MEC Platform, to fetch catalogue info about that service, and when it knows e.g. its URL, it will be able to talk directly to the service producer and consume its service

## Install dependencies
1. Create conda environment
    ```
    conda create --name <myenv>
    ```
2. Activate conda environment
    ```
    conda activate <myenv>
    ```
3. Install dependencies through requirements.yml file
    ```
    conda install --file requirements.yml
    ```

4. Create a base database locally
    ```
    initdb -D locapi_db
    ```
5. Now start the server modus/instance of postgres
    ```
    pg_ctl -D locapi_db -l logfile start
    ```

6. Create a non-superuser 
    ```
    createuser --encrypted --pwprompt mynonsuperuser
    ```

7. Using this super user, create inner database inside the base database
    ```
    createdb --owner=mynonsuperuser my_locapi_db
    ```

## Implemented features
The current project enables service consumers to:
    1. access Location APIs provided by the MEC Platform
    2. get service availability information about services provided by service producers registered in the MEC Platform
    3. obtain infromation on how to access the web services provided by the service producers

It also enables the service producers to:
    1. register their services to the MEC Platform
    2. update the relevant Service Information

The above features are enabled by implementing the below APIs as described by [ETSI MEC](https://forge.etsi.org/rep/mec):


| API  | Description | Spec Doc
|---|---| --- |
|  **Location APIs** |    | [Swagger](https://forge.etsi.org/swagger/ui/?url=https://forge.etsi.org/rep/mec/gs013-location-api/raw/v2.2.1/LocationAPI.yaml#/) [Spec Doc](https://www.etsi.org/deliver/etsi_gs/MEC/001_099/013/02.02.01_60/gs_MEC013v020201p.pdf) |
|  GET /queries/distance | Compute distance between terminals or a terminal and a location |  7.3.9 |
|  GET /queries/users |  Location Lookup of a specific UE or group of UEs | 7.3.2 |
|  **MEC Service Management APIs** |    | [Swagger](https://forge.etsi.org/swagger/ui/?url=https://forge.etsi.org/rep/mec/gs011-app-enablement-api/raw/v2.2.1/MecServiceMgmtApi.yaml#/) [Spec Doc](https://www.etsi.org/deliver/etsi_gs/MEC/001_099/011/02.01.01_60/gs_MEC011v020101p.pdf)|
|  GET /applications/{appInstanceId}/services |  retrieve information about a list of mecService resources. | 8.2.6 |
|  POST /applications/{appInstanceId}/services |  create a mecService resource - "service availability update/ new service registration" | 8.2.6 |
|  PUT /applications/{appInstanceId}/services/{serviceId} |  update the information about a mecService resource | 8.2.6 |
|  DELETE /applications/{appInstanceId}/services/{serviceId} | delete a mecService resource  | 8.2.6 |
<!-- |---|---| --- | -->


## Usage
Assuming the dependencies have been installed and the virtual environment has been activated:
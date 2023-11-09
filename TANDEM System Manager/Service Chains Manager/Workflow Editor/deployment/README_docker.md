# Build image
sudo docker build --build-arg http_proxy=http://icache.intracomtel.com:80/ --build-arg https_proxy=http://icache.intracomtel.com:80/ --no-cache -t workfloweditor .

# Tag and push image
docker tag workfloweditor gsamaras/workflow-editor:workfloweditortag1
sudo docker login -u gsamaras
sudo docker push gsamaras/workflow-editor:workfloweditortag1

# Update deployment in Kubernetes cluster
kubectl apply -f workflow_editor_deployment.yaml -n admin

# See node that a pod is running into (in namespace admin)
kubectl -n admin get pods -o wide

# Get deployed services (in namespace admin)
kubectl get svc -n admin

# Delete pods (in namespace admin)
kubectl delete pod -n admin tandem-pipeline-7fss4-3955581220 tandem-pipeline-7fss4-1772728583
kubectl get pods -n admin | awk '/^tandem-pipeline-gfd9h/{system("kubectl delete pod -n admin " $1)}'

# Remove stopped containers
docker container prune

# Remove dangling images:
docker image prune

# If disk full, free up space by:
docker system prune

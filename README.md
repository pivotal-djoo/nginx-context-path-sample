# NGINX Context Path Sample

Sample project for using NGINX to access both a web app and a backend app using one domain name.

Included [nginx.conf](web/nginx/nginx.conf) routes the below paths to corresponding web / server app.

https://domain.com/ -> web app  
https://domain.com/api/ -> server app  
https://domain.com/api/endpoint -> server app  
https://domain.com/non-api-route/ -> web app  

Using this method, can allow access to any number of apps accessible from a K8s cluster. Only needs to be exposed internally via services.

## Getting Started

Set up a local kubernetes cluster using Kind, Minikube, K3s, etc.. Below guide uses [Kind](https://kind.sigs.k8s.io/).


## Deploy Server App

Build server app image
```bash
cd server
docker build -t example-server:latest .
```

Load docker image into Kind
```bash
kind load docker-image example-server:latest
```

Deploy server app in K8s cluster
```bash
kubectl apply -f ./example-server-deployment.yaml
```

Expose server deployment using a service
```bash
kubectl expose deployment/example-server --port 80 --target-port=3000
```

## Deploy Web App

Build web app image
```bash
cd web
docker build -t example-web:latest .
```

Load docker image into Kind
```bash
kind load docker-image example-web:latest
```

Deploy web app in K8s cluster
```bash
kubectl apply -f ./example-web-deployment.yaml
```

## Test Access to Web and Server Apps

Create a port forward for example-web app
```bash
kubectl port-forward deployment/example-web 8080:80
```

Open the web app in browser  
http://localhost:8080   

Open the server endpoint  
http://localhost:8080/api/endpoint  


Even though only web app is exposed, server app is accessed through NGINX proxy.


--

  
# Troubleshooting

### Verify docker image using Docker
```bash
docker run -d -p 3000:3000 example-server
```

### View Docker images loaded in Kind
```bash
kubectl get nodes
docker exec -ti <nodename> bash
crictl images
```

### Try calling server endpoint from web app container
```bash
kubectl get pods
kubectl exec [web app pod name] -- curl -v http://example-server.default.svc.cluster.local
```

Example:
```bash
kubectl exec example-web-74fc448776-sqkcv -- curl http://example-server.default.svc.cluster.local
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    60  100    60    0     0  18072      0 --:--:-- --:--:-- --:--:-- 20000
{"status":"Running","message":"Hello from backend api app!"}
```
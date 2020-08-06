apiVersion: apps/v1
kind: Deployment
metadata:
  name: rc-user-service-deployment
  namespace: runtime-chick
  labels: 
    app: rc
    service: user-service
    deployment: uat
spec:
  replicas: 2
  selector:
    matchLabels:
      app: rc
      service: user-service
  template:
    metadata:
      labels:
        app: rc
        service: user-service
    spec:
      containers:
      - name: rc-user-service
        image: gcr.io/tenacious-text-279818/rc-user-service:COMMIT_SHA
        imagePullPolicy: Always
        env:
        - name: RC_HOST
          value: "34.86.141.95"
        - name: RC_DATABASE
          value: "postgres"
        - name: RC_USER
          value: "postgres"
        - name: USER_BASE_PATH
          value: "/user-service"
        - name: USER_SERVICE_HOST
          value: "http://rc-user-service-service:3003/user-service"
        - name: RC_PASSWORD
          value: 
        ports:
        - containerPort: 3003
        livenessProbe:
          httpGet:
            path: /health
            port: 3003
          initialDelaySeconds: 3
          periodSeconds: 3
        readinessProbe:
          httpGet:
            path: /health
            port: 3003
          initialDelaySeconds: 3
          periodSeconds: 3
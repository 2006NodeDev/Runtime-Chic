apiVersion: apps/v1
kind: Deployment
metadata:
  name: rc-messageboard-service-deployment
  namespace: runtime-chick
  labels: 
    app: rc
    service: messageboard-service
    deployment: uat
spec:
  replicas: 2
  selector:
    matchLabels:
      app: rc
      service: messageboard-service
  template:
    metadata:
      labels:
        app: rc
        service: messageboard-service
    spec:
      containers:
      - name: rc-messageboard-service
        image: gcr.io/message-board-284300/rc-messageboard-service:COMMIT_SHA
        imagePullPolicy: Always
        env:
        - name: MB_HOST
          value: "10.58.96.3"
        - name: MB_DATABASE
          value: "lb-micro"
        - name: MB_USER
          value: "postgres"
        - name: MB_BASE_PATH
          value: "/messageboard-server"
        - name: MB_USER_SERVICE_HOST
          value: "http://rc-user-service-service:3003/user-service"
        - name: MB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: lb-user-service-secrets
              key: password
        ports:
        - containerPort: 2007
        livenessProbe:
          httpGet:
            path: /health
            port: 2007
          initialDelaySeconds: 3
          periodSeconds: 3
        readinessProbe:
          httpGet:
            path: /health
            port: 2007
          initialDelaySeconds: 3
          periodSeconds: 3
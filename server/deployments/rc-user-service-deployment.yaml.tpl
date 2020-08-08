--- 
apiVersion: apps/v1
kind: Deployment
metadata: 
  labels: 
    app: rc
    deployment: uat
    service: user-service
  name: rc-user-service-deployment
  namespace: runtime-chick
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
        - 
          env: 
            - 
              name: RC_HOST
              value: "34.86.141.95"
            - 
              name: RC_DATABASE
              value: postgres
            - 
              name: RC_USER
              value: postgres
            - 
              name: USER_BASE_PATH
              value: /user-service
            - 
              name: USER_SERVICE_HOST
              value: "http://rc-user-service-service:3003/user-service"
            - 
              name: jwtSecret
              value: Cat123
            - 
              name: RC_PASSWORD
              value: NodeDev2006
          image: "gcr.io/tenacious-text-279818/rc-user-service:COMMIT_SHA"
          imagePullPolicy: Always
          livenessProbe: 
            httpGet: 
              path: /health
              port: 3003
            initialDelaySeconds: 3
            periodSeconds: 3
          name: rc-user-service
          ports: 
            - 
              containerPort: 3003
          readinessProbe: 
            httpGet: 
              path: /health
              port: 3003
            initialDelaySeconds: 3
            periodSeconds: 3
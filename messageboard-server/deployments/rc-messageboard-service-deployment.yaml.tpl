--- 
apiVersion: apps/v1
kind: Deployment
metadata: 
  labels: 
    app: rc
    deployment: uat
    service: messageboard-service
  name: rc-messageboard-service-deployment
  namespace: runtime-chick
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
        - 
          env: 
            - 
              name: MB_HOST
              value: "10.7.80.5"
            - 
              name: MB_DATABASE
              value: message-board
            - 
              name: MB_USER
              value: postgres
            - 
              name: MB_BASE_PATH
              value: /messageboard-server
            - 
              name: RC_BASE_PATH
              value: /user-service
            - 
              name: USER_SERVICE_HOST
              value: "http://rc-user-service-service:3003/user-service"
            - 
              name: MESSAGEBOARD_SERVICE_HOST
              value: "http://rc-messageboard-service-service:2007/messageboard-service"
            - 
              name: jwtSecret
              value: Cat123
            - 
              name: MB_PASSWORD
              value: 2006NodeDev
          image: "gcr.io/message-board-284300/rc-messageboard-service:COMMIT_SHA"
          imagePullPolicy: Always
          livenessProbe: 
            httpGet: 
              path: /health
              port: 2007
            initialDelaySeconds: 3
            periodSeconds: 3
          name: rc-messageboard-service
          ports: 
            - 
              containerPort: 2007
          readinessProbe: 
            httpGet: 
              path: /health
              port: 2007
            initialDelaySeconds: 3
            periodSeconds: 3

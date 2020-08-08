FROM node:12.18

RUN mkdir /rc-user-service
WORKDIR  /rc-user-service
COPY server/package*.json ./
COPY server/. .
RUN npm install
EXPOSE 3003
CMD ["npm", "run", "server"]
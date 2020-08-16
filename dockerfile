FROM node:12
WORKDIR /bogapi
COPY . .
RUN npm install
RUN npm run build-pipeline 
EXPOSE 8080
ENTRYPOINT ["node", "./bin/index.js"]
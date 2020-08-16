FROM node:12
WORKDIR /bogapi
COPY . .
RUN npm install
RUN tsc 
EXPOSE 8080
ENTRYPOINT ["node", "./bin/index.js"]
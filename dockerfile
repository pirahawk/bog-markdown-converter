FROM node:12
    WORKDIR /usr/bogMdConverter
    COPY package.json .
    RUN npm install
    COPY . .
    RUN tsc
    CMD ["node", "./bin/index.js"]
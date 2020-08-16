FROM node:12
    WORKDIR /usr/bogMdConverter
    COPY package.json .
    RUN npm install && npm install tsc -g
    COPY . .
    RUN tsc
    CMD ["node", "./bin/index.js"]
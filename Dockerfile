FROM node:latest  
MAINTAINER lisd199001@gmail.com


COPY . /data/noderoot/adr  
WORKDIR /data/noderoot/adr

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 8000
EXPOSE 3060

CMD ["npm", "start"]  
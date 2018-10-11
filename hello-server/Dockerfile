
# 이미지를 

# docker build -t 0zoo/hello-server .

# 이미지를 만드는 명령






# Docker 이미지 지정

# Docker Image 지정한다.
FROM node:10.10.0-alpine

# mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app

# cd /usr/src/app
WORKDIR /usr/src/app

# package.json을 파일 이미지에 복가
COPY package.json /usr/src/app

# npm install
RUN npm install

COPY . /usr/src/app

#  CMD : 인스턴스가 생성된 후 수행할 명령
# npm run publish
Expose 3000
CMD ["npm", "run", "publish"]

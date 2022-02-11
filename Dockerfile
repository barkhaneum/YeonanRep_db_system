# FROM node:12-alpine 
# RUN npm install -g serve
# RUN mkdir ./build
# COPY ./build ./build
# ENTRYPOINT ["serve", "-s", "build"]


FROM node:14
WORKDIR /app/server
# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules
COPY package*.json /app 
RUN npm install 
COPY . /app
CMD [ "npm", "start" ]
# EXPOSE 3002


# # node.js 압축 이미지를 설치합니다
# FROM node:14
# # 이미지 내부 작업 경로를 설정합니다
# WORKDIR /usr/app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules

# # 필수 패키지 파일을 이미지 내부로 복사하고, npm 명령어로 설치합니다
# COPY package*.json ./

# RUN npm install

# # 앱 시작 명령어를 시작합니다.
# CMD ["npm", "start"]

# # Terminal에서 아래 명령어 실행
# # docker-compose up -d --build
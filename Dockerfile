FROM node:12

ENV HOME /usr/src/

WORKDIR /usr/app

COPY ["package.json", "yarn.lock", "$home/"]

RUN node -v \
    && yarn install --pure-lockfile 
    
COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
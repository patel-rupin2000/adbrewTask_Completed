# set base image (host OS)
FROM python:3.8
FROM node:16

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update && apt-get install -y openssl
RUN apt-get install -y curl nano wget nginx git

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list


# Mongo
RUN ln -s /bin/echo /bin/systemctl
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
RUN apt-get -y update
RUN apt-get update && apt-get install -y libssl1.1=1.1.1n-0+deb10u6

# Install libssl-dev and other dependencies
RUN apt-get install -y libssl-dev
RUN apt-get install -y mongodb-org

# Install Yarn
RUN apt-get install -y yarn

RUN export NODE_OPTIONS=--openssl-legacy-provider

# Install PIP
RUN apt-get update && apt-get install -y python3-pip


ENV ENV_TYPE staging
ENV MONGO_HOST mongo
ENV MONGO_PORT 27017
##########

ENV PYTHONPATH=$PYTHONPATH:/src/

# copy the dependencies file to the working directory
COPY src/requirements.txt .

# install dependencies
RUN pip3 install -r requirements.txt

COPY src/app .
COPY src/rest .
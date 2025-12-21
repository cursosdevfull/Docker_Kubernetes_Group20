FROM node:alpine3.23 AS stage-build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=stage-build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]


# FROM node:alpine3.23

# RUN mkdir /app

# COPY ./package*.json /app

# RUN cd /app && npm install

# COPY ./ /app

# RUN cd /app && npm run build


# FROM node:alpine3.23

# RUN mkdir /app

# COPY ./ /app

# RUN cd /app && npm install && npm run build
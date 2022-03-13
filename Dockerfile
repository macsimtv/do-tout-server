FROM node:16

WORKDIR /app

ARG PORT=${PORT}
ARG MONGODB_URL=${MONGODB_URL}
ARG COOKIE_SECRET=${COOKIE_SECRET}
ARG JWT_SECRET=${JWT_SECRET}

COPY ./package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]

EXPOSE ${PORT}

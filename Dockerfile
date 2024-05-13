FROM node:lts-iron

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
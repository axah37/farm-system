FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY ./backend/package*.json .
COPY ./backend/tsconfig.json .

RUN npm install

COPY ./backend/src ./src

RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json .
COPY --from=builder /usr/src/app/build ./build

RUN npm install

EXPOSE 3000

CMD ["node", "build/app.js"]


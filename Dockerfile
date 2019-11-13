#############################
## STEP 1 build executable binary
#############################
FROM node AS builder
ARG REACT_APP_GRAPHQL_ENDPOINT=/api

WORKDIR /build
COPY . .

RUN yarn install
RUN yarn build

FROM node AS runtime
WORKDIR /app
COPY --from=builder /build /app

EXPOSE 5000

CMD [ "node", "Server.js" ]

#############################
## STEP 1 build executable binary
#############################
FROM node AS builder
ARG GRAPHQL_ENDPOINT

WORKDIR /build
COPY ./web-admin ./

RUN yarn install
RUN yarn build

FROM node AS runtime
WORKDIR /app
COPY --from=builder /build /app
RUN yarn global add serve

EXPOSE 5000

CMD [ "serve", "-s",  "/app/build"]

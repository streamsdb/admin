export let config = {
  graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || "/api",
  sentryDsn: process.env.REACT_APP_SENTRY_DSN,
  gaId: process.env.REACT_APP_GA_ID
}


import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { ChildDataProps, graphql } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { Query, QueryResult } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

type Props = {
  database: string;
}

const query = gql`
query StreamsQuery{
  database(name: "default") {
    id,
    name,
    streams {
      total
      names
    }
  },
}`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/query',
  }),
cache: new InMemoryCache(),
  // for SSR, use:
  // cache: new Cache().restore(window.__APOLLO_STATE__ || {})
});

export const Streams: FunctionComponent<Props> = ({ database}) => <aside>
  <ApolloProvider client={client}>
  <h2>{ database }</h2>
  <Query query={query} variables={{}}>
    {({ data, error, loading }: QueryResult<any>) => (<div>{JSON.stringify({
      data,
    loading,
    error})}</div>)}
  </Query>
  </ApolloProvider>
</aside>

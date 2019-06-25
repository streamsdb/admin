import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Streams } from "./Streams";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Stream } from "./stream"

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/query',
  }),
  cache: new InMemoryCache(),
});


function BasicExample() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/db/default/streams">Streams</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route exact path="/db/:database/streams" render={( {match}: any) => (<Streams database={match.params.database} /> )} />
          <Route exact path="/db/:database/streams/:stream/:from" render={( {match}: any) => 
            (<Stream database={match.params.database} stream={match.params.stream} from={match.params.from} /> )} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

export default BasicExample;

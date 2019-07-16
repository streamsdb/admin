import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { config } from "./Config";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { setContext } from 'apollo-link-context'; 
import { onError } from "apollo-link-error";
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0091ea',
    },
    secondary: {
      main: '#eeeeee',
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )

      if (message === "Unauthenticated") {
			  localStorage.removeItem('token');
        history.push('/login');
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// the auth token is sent to the server on each request due to this middleware
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    errorLink,
    new HttpLink({
      uri: config.graphqlEndpoint,
    })]),
  cache: new InMemoryCache(),
  defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }
});


ReactDOM.render(
  <ApolloProvider client={client}>
  <Router>
  <ThemeProvider theme={theme}>
  <SnackbarProvider maxSnack={10}>
  <App />
  </SnackbarProvider>
  </ThemeProvider>
  </Router>
  </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

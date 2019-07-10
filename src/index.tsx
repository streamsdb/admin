import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { config } from "./Config";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


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

const client = new ApolloClient({
  link: new HttpLink({
    uri: config.graphqlEndpoint,
  }),
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
  <Router>
  <ThemeProvider theme={theme}>
  <App />
  </ThemeProvider>
  </Router>
  </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

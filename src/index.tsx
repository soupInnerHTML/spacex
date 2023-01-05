import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/media.css';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.spacex.land/graphql/',
  connectToDevTools: false
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider {...{client}}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      name
    }
  }
`;

export const GET_QUOTES = gql`
  query getQuotes {
    quotes {
      id
      author {
        name
      }
      book
      quote
      publisher
    }
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

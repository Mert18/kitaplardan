import "./App.css";
import { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { graphql } from "graphql";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [index, setIndex] = useState(0);
  const [quotes, setQuotes] = useState("");
  client
    .query({
      query: gql`
        {
          authors {
            id
            name
          }
        }
      `,
    })
    .then((result) => setQuotes(result));

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <div className="app">
          <div className="app-header"></div>
          <div className="app-main"></div>
          <div className="app-footer"></div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;

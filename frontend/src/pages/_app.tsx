import Layout from "@/components/Layout";
import { AuthContext } from "@/contexts/authContext";
import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// function to recreate an uri object for apollo which is needed when using link instead of uri
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // we get our token from the localstorage
  const token = localStorage.getItem("token");

  // we return a headers with token added if it exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // we concat the headers with the new uri to create automatically our requests with our token, sending automatically our token to the backend when using a query/mutation
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });

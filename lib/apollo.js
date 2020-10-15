/*
*   This file is used to provide data to your components
*   via from a GraphQL api using Apollo. You can update
*   the uri used to connect to the server via the GRAPHQL_URI
*   property in the .env file found in the route of this project.
*   If connecting to Mongo DB and building your own API you can
*   update GRAPHQL_API to be http://localhost:3000/api/graphql
*/

import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState)

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  WithApollo.getInitialProps = async (ctx) => {
    const { AppTree } = ctx
    const apolloClient = (ctx.apolloClient = initApolloClient())

    let pageProps = {}
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx)
    }

    if (typeof window === "undefined") {
      if (ctx.res && ctx.res.finished) {
        return pageProps
      }

      try {
        const { getDataFromTree } = await import('@apollo/react-ssr')
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        )
      } catch (error) {
        console.error(error)
      }

      Head.rewind()
    }

    const apolloState = apolloClient.cache.extract()

    return {
      ...pageProps,
      apolloState
    }
  }

  return WithApollo
}

const initApolloClient = (initialState = {}) => {
  const cache = new InMemoryCache().restore(initialState);
  const link = new HttpLink({
    uri: process.env.GRAPHQL_URI
  });
  const client = new ApolloClient({
    link,
    cache,
    fetch
  })
  return client;
};
import Head from 'next/head'

import { withApollo } from '../lib/apollo'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Burton Media | NextJs Starter | Home Page</title>
      </Head>

      <main>
        <h1>Welcome, <strong>Jesse</strong></h1>
      </main>

      <footer>
        <p>copyright &copy; 2020 ~ BURTON<strong>MEDIA</strong></p>
      </footer>
    </div>
  )
}

export default withApollo(Home)
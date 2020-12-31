import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>kosu-cloud</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

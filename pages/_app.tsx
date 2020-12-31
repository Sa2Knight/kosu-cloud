import { AppProps } from 'next/dist/next-server/lib/router/router'
import Sidebar from '../components/Sidebar'
import Head from 'next/head'
import 'normalize.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

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
      <div className="app-wrapper">
        <aside className="sidebar-wrapper">
          <Sidebar />
        </aside>
        <main className="router-component-wrapper">
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </main>
      </div>

      <style jsx>{`
        .app-wrapper {
          display: flex;
          height: 100vh;
          .sidebar-wrapper {
            width: 260px;
            height: 100%;
          }
          .router-component-wrapper {
            width: calc(100% - 260px);
            height: 100%;
          }
        }
      `}</style>
    </>
  )
}

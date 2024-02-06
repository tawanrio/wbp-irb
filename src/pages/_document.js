import { Html, Head, Main, NextScript } from 'next/document'
import ContextPage from '@/context/pageData'

export default function Document() {
 
  return (
    <Html lang="pt_BR">
      <Head>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}

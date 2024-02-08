import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
 
  return (
    <Html lang="pt_BR">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main/>S
        <NextScript />
      </body>
    </Html>
  )
}

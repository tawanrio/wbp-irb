import '@/styles/globals.css'
// import '@/layouts/irb/Footer/footer.css'
// import '@/layouts/irb/Header/header.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import ContextPage from '@/context/pageData';
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import '@/styles/root.css';

export default function App({ Component, pageProps }) {
  return (
    <ContextPage >
      <main className={inter.className}>
      <Component {...pageProps} />
      </main>
    </ContextPage>
  )
}

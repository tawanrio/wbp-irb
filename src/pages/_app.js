import '@/styles/globals.css'
// import '@/layouts/irb/Footer/footer.css'
// import '@/layouts/irb/Header/header.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import ContextPage from '@/context/pageData';

import '@/styles/root.css';

export default function App({ Component, pageProps }) {
  return (
    <ContextPage >
      <Component {...pageProps} />
    </ContextPage>
  )
}

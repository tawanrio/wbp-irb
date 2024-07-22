import '@/styles/globals.css'
import '@/styles/root.css';
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <IntlProvider locale={locale}>
      <Component {...pageProps} />
    </IntlProvider>
  )
}

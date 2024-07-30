import '@/styles/globals.css'
import '@/styles/root.css'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'

import en from '@/lang/en.json'
import pt from '@/lang/pt.json'

const messages = {
  en,
  pt,
}

function getDirection(locale) {
  if (locale === 'ar') {
    return 'rtl'
  }
  return 'ltr'
}

export default function App({ Component, pageProps }) {
  const { locale } = useRouter()

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} dir={getDirection(locale)} />
    </IntlProvider>
  )
}

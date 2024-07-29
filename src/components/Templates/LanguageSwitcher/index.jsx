import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale } = router
  const { formatMessage } = useIntl()

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang })
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-2 ${locale === 'en' ? 'font-bold' : ''}`}
      >
        {formatMessage({ id: 'language.english', defaultMessage: 'English' })}
      </button>
      <button
        onClick={() => changeLanguage('pt')}
        className={`px-4 py-2 ${locale === 'pt' ? 'font-bold' : ''}`}
      >
        {formatMessage({
          id: 'language.portuguese',
          defaultMessage: 'Portuguese',
        })}
      </button>
    </div>
  )
}

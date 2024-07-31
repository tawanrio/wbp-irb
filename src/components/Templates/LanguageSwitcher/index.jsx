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
    <section className="flex justify-center bg-[#22326e]" id={`contactLine`}>
      <div
        className="relative flex flex-1 justify-center text-white md:max-w-7xl md:justify-end md:px-[52px]"
        id="containerBanner"
      >
        <button
          onClick={() => changeLanguage('en')}
          className={`px-4 py-[2px] text-sm ${locale === 'en' ? 'font-bold' : ''}`}
        >
          {formatMessage({ id: 'language.english', defaultMessage: 'English' })}
        </button>
        <button
          onClick={() => changeLanguage('pt')}
          className={`px-4 py-[2px] text-sm ${locale === 'pt' ? 'font-bold' : ''}`}
        >
          {formatMessage({
            id: 'language.portuguese',
            defaultMessage: 'Português',
          })}
        </button>
      </div>
    </section>
  )
}

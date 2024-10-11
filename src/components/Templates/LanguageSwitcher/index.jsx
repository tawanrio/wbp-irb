import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Select from 'react-select'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale } = router
  const [selectedLanguage, setSelectedLanguage] = useState(locale)
  const [loading, setLoading] = useState(false) // Estado de loading

  const options = [
    {
      value: 'en',
      label: (
        <div className="flex items-center">
          <Image
            src="/images/templates/footer/united_states.svg"
            alt="Bandeira EUA"
            width={35}
            height={20}
            className="mr-2"
          />
          English
        </div>
      ),
    },
    {
      value: 'pt',
      label: (
        <div className="flex items-center">
          <Image
            src="/images/templates/footer/brazil.svg"
            alt="Bandeira Brasil"
            width={35}
            height={20}
            className="mr-2"
          />
          Português
        </div>
      ),
    },
  ]

  const changeLanguage = (selectedOption) => {
    const lang = selectedOption.value
    setSelectedLanguage(lang)
    setLoading(true)
    router
      .push(router.pathname, router.asPath, { locale: lang })
      .finally(() => {
        setLoading(false)
      })
  }

  // Customizando o estilo com a propriedade 'styles'
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      zIndex: 50,
      cursor: 'pointer',
      // right: '20px',
      // width: '11rem',
      backgroundColor: '#D9D9D926',
      border: 'none',
      boxShadow: state.isFocused ? '0 0 0 1px white' : null,
      '&:hover': {
        borderColor: 'white',
      },
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      cursor: 'pointer',
      // right: '5px',
      // width: '11rem',
      backgroundColor: 'rgba(34, 50, 110, 0)',
      zIndex: 90,
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#22326e' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: '#3b4c8b',
        color: 'white',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  }

  return (
    <section
      className="absolute mt-[13px] flex w-full justify-center bg-[#22326e00]"
      id="contactLine"
    >
      <div
        className="relative mx-7 flex flex-1 justify-end text-white md:max-w-7xl md:px-[52px]"
        id="containerBanner"
      >
        {loading ? (
          <div className="mt-[6px] flex items-center justify-center">
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span className="ml-2">Carregando...</span>
          </div>
        ) : (
          <Select
            value={options.find((option) => option.value === selectedLanguage)}
            onChange={changeLanguage}
            options={options}
            className="w-44"
            styles={customStyles}
            isSearchable={false}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        )}
      </div>
    </section>
  )
}

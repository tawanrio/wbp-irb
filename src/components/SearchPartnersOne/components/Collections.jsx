/* eslint-disable no-empty */
/* eslint-disable array-callback-return */
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatStrToUrl, getGoogleMaps } from '@/utils/functions'
import { Maps } from '@/components/Maps'
import 'tailwindcss/tailwind.css'

const Collection = ({
  collections,
  products,
  hiddenProductSearch,
  arrRoute,
  geo,
}) => {
  let stateMatch = null
  let cityMatch = null

  geo.states.filter((state) => {
    if (stateMatch || cityMatch) return

    if (formatStrToUrl(state.name) === arrRoute[1]) {
      stateMatch = state.name
    }

    if (stateMatch) {
    }
    if (!stateMatch) {
      state.cities.find((city) => {
        if (formatStrToUrl(city) === arrRoute[1]) {
          stateMatch = state.name
          cityMatch = city
        }
      })
    }
  })

  const [selectedState, setSelectedState] = useState(stateMatch || '')
  const [selectedCity, setSelectedCity] = useState(cityMatch || '')
  const [selectedProduct, setSelectedProduct] = useState('')
  const router = useRouter()

  useEffect(() => {
    setSelectedState(stateMatch)
    if (cityMatch) {
      setSelectedCity(cityMatch)
    }
  }, [stateMatch, cityMatch])

  const uniqueStates = useMemo(() => {
    let states = []
    collections &&
      collections?.map((partner) => {
        partner.geo?.states.find((state) => {
          if (state.name === '*') {
            states = geo.states.map((state) => state.name)
          } else {
            states.push(state.name)
          }
        })
      })

    return [...new Set(states)].sort()
  }, [collections, geo.states])

  const uniqueCities = useMemo(() => {
    let cities = []
    collections &&
      collections?.map((partner) => {
        partner.geo?.states.find(() => {
          geo.states.map((state) => {
            if (selectedState === state.name) {
              cities = state.cities.map((city) => city)
            }
          })
        })
      })

    return [...new Set(cities)].sort()
  }, [collections, selectedState, geo.states])

  const handleStateChange = (event) => {
    const newState = event.target?.value
    setSelectedState(newState)
    setSelectedCity('')
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target?.value)
  }

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value)
  }

  const generateUrlGeo = (geo) => {
    const url = router.asPath
    const arrUrl = url.substring(1).split('/')
    if (arrUrl[1]) {
      if (geo) return `/${arrUrl[0]}/${formatStrToUrl(geo)}`

      return `/${arrUrl[0]}`
    }
  }

  const googleMapsUrl = getGoogleMaps(selectedCity || selectedState)

  return (
    <div>
      <div className="mb-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
        {!hiddenProductSearch && (
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="mr-4 flex-1 rounded border border-gray-300 p-2"
          >
            <option value="">Selecione o produto</option>
            {products.map((product, index) => (
              <option key={index} value={product.label}>
                {product.title}
              </option>
            ))}
          </select>
        )}

        <div className="group mx-4 w-64 rounded-lg border bg-white py-2 text-center">
          <span className="relative h-full py-2">
            {stateMatch || 'Selecione o Estado'}
          </span>
          <ul className="absolute z-[99] my-2 h-0 max-h-[120px] w-64 translate-x-[-1px] list-none overflow-scroll overflow-x-hidden border border-t-0 bg-white opacity-0 duration-500 group-hover:h-max group-hover:opacity-100">
            <li>
              <Link
                href={generateUrlGeo()}
                onClick={() => handleStateChange('')}
                className="flex w-full justify-center duration-500 hover:bg-slate-200"
              >
                Todos os estados
              </Link>
            </li>
            {uniqueStates.map((state, index) => (
              <li key={index}>
                <Link
                  href={generateUrlGeo(state)}
                  onClick={() => handleStateChange(state)}
                  className="flex w-full justify-center duration-500 hover:bg-slate-200"
                >
                  {state}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="group mx-4 w-64 rounded-lg border bg-white py-2 text-center hover:rounded-b-none">
          <span className="relative py-2">
            {cityMatch || 'Selecione a Cidade'}
          </span>
          <ul className="absolute z-[99] my-2 h-0 max-h-[120px] w-64 translate-x-[-1px] list-none overflow-scroll overflow-x-hidden border border-t-0 bg-white opacity-0 duration-500 group-hover:h-max group-hover:opacity-100">
            <li>
              <Link
                href={generateUrlGeo(stateMatch || '')}
                onClick={() => handleCityChange('')}
                className="flex w-full justify-center duration-500 hover:bg-slate-200"
              >
                Todas as cidades
              </Link>
            </li>
            {uniqueCities?.map((city, index) => (
              <li key={index}>
                <Link
                  href={generateUrlGeo(city)}
                  onClick={() => handleCityChange(city)}
                  className="flex w-full justify-center duration-500 hover:bg-slate-200"
                >
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Maps googleMapsUrl={googleMapsUrl} collections={collections} />
    </div>
  )
}

export default Collection

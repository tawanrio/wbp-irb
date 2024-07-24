/* eslint-disable no-empty */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from 'react'
import Card from './Card'
import { useRouter } from 'next/router'

import 'tailwindcss/tailwind.css'

// util
import { formatStrToUrl } from '@/utils/functions'
import { logging } from '../../../../next.config'
import Link from 'next/link'

const Collection = ({
  collections,
  products,
  hiddenProductSearch,
  arrRoute,
  geo,
}) => {
  let stateMatch = null
  let cityMatch = null
  // console.log(collections);

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

  // collections.filter(collection =>{
  //    arrRoute && collection.geo.states.find(state =>{
  //     console.log(state);
  //     if(formatStrToUrl(state.name) === arrRoute[1]){
  //       stateMatch = address.state
  //     }
  //    }
  //       ) !== undefined

  //  arrRoute && collection.info.address.find(
  //       (address) => {
  //       if(address.label === 'default' && formatStrToUrl(address.state) === arrRoute[1]) {
  //         stateMatch = address.state
  //       }
  //       }
  //     ) !== undefined

  //     if(!stateMatch){

  //      arrRoute && collection.info.address.filter(
  //         (address) => {
  //           if(address.label === 'default' && formatStrToUrl(address.city) === arrRoute[1]) {
  //             stateMatch = address.state
  //             cityMatch = address.city
  //           }
  //         }
  //         ) !== undefined
  //       }
  // }
  // )

  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState(stateMatch || '')
  const [selectedCity, setSelectedCity] = useState(cityMatch || '')
  const [selectedProduct, setSelectedProduct] = useState('')
  const router = useRouter()

  // useEffect
  useEffect(() => {
    setSelectedState(stateMatch)
    if (cityMatch) {
      setSelectedCity(cityMatch)
    }
  }, [stateMatch, cityMatch])

  // Filtrar coleções com base no termo de pesquisa, estado e cidade
  // const filteredCollections = collections?.filter((collection) => {
  //   const searchTermMatch = collection.name.toLowerCase().includes(searchTerm.toLowerCase());

  //   // const stateMatch = selectedState
  //   //   ? collection.info.address.find(
  //   //       (address) => address.label === 'default' && address.state.toLowerCase() === selectedState.toLowerCase()
  //   //     ) !== undefined
  //   //   : true;

  //   const stateMatch = selectedState
  //   ? collection.geo.states.find( state => {
  //       // console.log(state)
  //      if( state.name === '*') return true
  //      if( state.name === selectedState) return true
  //     }
  //      )
  //     : true;

  //     const productMatch = selectedProduct
  //     ? collection.products.find(product => product.label.toLowerCase() === selectedProduct.toLowerCase()) !== undefined : true;

  //   // const cityMatch = selectedCity
  //   //   ? collection.info.address.find(
  //   //       (address) =>
  //   //         address.label === 'default' &&
  //   //         address.state.toLowerCase() === selectedState.toLowerCase() &&
  //   //         address.city.toLowerCase() === selectedCity.toLowerCase()
  //   //     ) !== undefined
  //   //   : true;

  //     return productMatch && stateMatch ;
  //     // return productMatch && stateMatch && cityMatch;
  // });

  // Filtrar estados únicos para a lista de seleção de estado
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

  // Filtrar cidades únicas para a lista de seleção de cidade, baseado no estado selecionado
  //   let uniqueCities = useMemo(() => {
  //     let cities = [];
  //     if (collections && collections[0]?.geo?.cities.find(city => city.name === "*")) {
  //         let stateMatch = selectedState?.toLowerCase(); // presumindo que stateMatch esteja definido
  //         geo.states.forEach(state => {
  //             if (formatStrToUrl(state.name) === formatStrToUrl(stateMatch)) {
  //                 state.cities.forEach(city => {
  //                     cities.push(city);
  //                 });
  //             }
  //         });
  //     } else {
  //         cities = collections?.flatMap(collection =>
  //             collection.info.address
  //                 .filter(address =>
  //                     address.label === 'default' &&
  //                     (selectedState ? address.state.toLowerCase() === selectedState.toLowerCase() : true)
  //                 )
  //                 .map(address => address.city)
  //         ) ?? [];
  //     }
  //     return [...new Set(cities)].sort();
  // }, [collections, selectedState, geo.states]);

  const uniqueCities = useMemo(() => {
    let cities = []
    // collections && collections[0]?.geo?.cities.find(city => city.name === "*")
    collections &&
      collections?.map((partner) => {
        partner.geo?.states.find((state) => {
          geo.states.map((state) => {
            if (selectedState === state.name) {
              cities = state.cities.map((city) => city)
            }
          })
        })
      })

    return [...new Set(cities)].sort()
  }, [collections, selectedState, geo.states])

  // if(collections[0].geo.states.find(state => state.name === "*")){

  //   uniqueStates = []
  //   geo.states.map(state=>{
  //     uniqueStates.push(state.name)
  //   })
  // }

  // if(collections[0].geo.cities.find(city => city.name === "*")){
  //   uniqueCities = []
  //   geo.states.map(state=>{
  //     if(formatStrToUrl(state.name) === formatStrToUrl(stateMatch)){
  //       state.cities.map(city => {
  //         uniqueCities.push(city)

  //       });
  //     }
  //   })
  // }

  // console.log(uniqueStates);
  // console.log(uniqueCities);

  // Lógica de paginação
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = collections?.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(collections?.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target?.value)
    setCurrentPage(1) // Reiniciar a página para a primeira ao aplicar o filtro
  }

  const handleStateChange = (event) => {
    const newState = event.target?.value
    setSelectedState(newState)
    setSelectedCity('') // Limpar a cidade ao mudar o estado
    setCurrentPage(1) // Reiniciar a página para a primeira ao aplicar o filtro
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target?.value)
    setCurrentPage(1) // Reiniciar a página para a primeira ao aplicar o filtro
  }

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value)
    setCurrentPage(1) // Reiniciar a página para a primeira ao aplicar o filtro
  }

  const handleClickSearch = (event) => {
    if (selectedCity) {
      navigateUrlGeo(selectedCity)
    } else if (selectedState) {
      navigateUrlGeo(selectedState)
    }
  }

  const navigateUrlGeo = (geo) => {
    const formatedGeo = formatStrToUrl(geo)
    const url = generateUrlGeo(formatedGeo)
    router.push(url)
  }

  const generateUrlGeo = (geo) => {
    const url = router.asPath
    const arrUrl = url.substring(1).split('/')
    if (arrUrl[1]) {
      if (geo) return `/${arrUrl[0]}/${formatStrToUrl(geo)}`

      return `/${arrUrl[0]}`
    }
  }

  return (
    <div>
      {/* Campos de filtro */}
      <div className="mb-4 flex flex-col justify-center gap-4 md:flex-row md:gap-0">
        {/* Campo de pesquisa
        <input
          type="text"
          placeholder="Digite para pesquisar..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded mr-4 flex-1"
        /> */}

        {/* Campo de seleção de produto */}
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

        {/* Campo de seleção de estado */}
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

        {/* Campo de seleção de cidade */}
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

        {/* <button
                className="
                px-7
                py-2
                text-black
                bg-[#D9D9D9]
                text-lg
                rounded-full
                hover:scale-110
                duration-500
                "
                onClick={handleClickSearch}
                >Buscar</button> */}
      </div>

      {/* Itens exibidos com base na pesquisa e paginação */}
      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {currentItems?.map((collection, index) => (
          <li key={index}>
            <Card collection={collection} />
          </li>
        ))}
      </ul>

      {/* Paginação */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 rounded px-3 py-2 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Collection

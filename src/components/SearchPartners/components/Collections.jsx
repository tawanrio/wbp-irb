import React, { useEffect } from 'react'
import Card from './Card'
import { useRouter } from 'next/router';


import { useState, useMemo } from 'react';
import 'tailwindcss/tailwind.css';

// util
import {formatStrToUrl} from '@/utils/functions'
import { logging } from '../../../../next.config';
import Link from 'next/link';

const Collection = ({ collections, products, hiddenProductSearch, arrRoute,geo}) => {
  let stateMatch = null
  let cityMatch = null


  arrRoute && geo.states.filter(state => {
    if(stateMatch || cityMatch) return
    
    if(formatStrToUrl(state.name) === arrRoute[1] 
    || formatStrToUrl(state.name) === arrRoute[2]){
            stateMatch = state.name
          }
          if(!stateMatch){
             state.cities.find(city => {
               if(formatStrToUrl(city) === arrRoute[1] 
               || formatStrToUrl(city) === arrRoute[2]){
                stateMatch = state.name
                cityMatch = city
              }
             })
          }
        })
  
  // collections.filter(collection =>{
  //   arrRoute && collection.info.address.find(
  //         (address) => {
  //         if(address.label === 'default' && formatStrToUrl(address.state) === arrRoute[2]) {
  //           stateMatch = address.state
  //         }
  //         }
  //       ) !== undefined
  //       if(!stateMatch){

  //         const searchCity = arrRoute
  //         && collection.info.address.filter(
  //           (address) => {
  //             if(address.label === 'default' && formatStrToUrl(address.city) === arrRoute[2]) {
  //               stateMatch = address.state
  //               cityMatch = address.city
  //             }
  //           }
  //           ) !== undefined
  //         }
  // })


  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState(stateMatch ? stateMatch : '');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const router = useRouter();

  // useEffect
  useEffect(() => {
    setSelectedState(stateMatch)
    if(cityMatch){
      setSelectedCity(cityMatch)
    }
  }, [stateMatch,cityMatch]);

  // Filtrar coleções com base no termo de pesquisa, estado e cidade
  // const filteredCollections = collections?.filter((collection) => {
  //   const searchTermMatch = collection.name.toLowerCase().includes(searchTerm.toLowerCase());

  //   // const stateMatch = selectedState
  //   //   ? collection.info.address.find(
  //   //       (address) => address.label === 'default' && address.state.toLowerCase() === selectedState.toLowerCase()
  //   //     ) !== undefined
  //   //   : true;
    
  //   const stateMatch = selectedState
  //     ? collection.info.address.find(
  //         (address) => address.label === 'default' && address.state.toLowerCase() === selectedState.toLowerCase()
  //       ) !== undefined
  //     : true;

  //     // console.log(stateMatch);
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

  //   return productMatch && stateMatch ;
  //   // return productMatch && stateMatch && cityMatch;
  // });

  // Filtrar estados únicos para a lista de seleção de estado
  // let uniqueStates = useMemo(() => {
  //   return [
  //     ...new Set(
  //       collections?.flatMap((collection) =>
  //           collection.info.address
  //             .filter((address) => address.label === 'default')
  //             .map((address) => address.state)
  //         )
  //     ),
  //   ].sort();
  // }, [collections]);

  const uniqueStates = useMemo(() => {
    let states = [];
    // collections && collections?.geo?.states.find(state => state.name === "*") 
    collections && collections?.map(partner => {
      partner.geo?.states.find(state => {
        if(state.name === "*"){
          states = geo?.states.map(state => state.name);
        }else{
          states?.push(state.name)
        }
      })
    })

    return [...new Set(states)].sort();
}, [collections, geo?.states]);

  

  // Filtrar cidades únicas para a lista de seleção de cidade, baseado no estado selecionado
  const uniqueCities = useMemo(() => {
    let cities = [];
    // collections && collections[0]?.geo?.cities.find(city => city.name === "*") 
    collections && collections?.map(partner => {
        partner.geo?.states.find(state => {
          geo.states.map(state => {
            if(selectedState === state.name){
              cities = state.cities.map(city => city);
            }
          });
          });
  
        });
    
    return [...new Set(cities)].sort();
  }, [collections, selectedState, geo.states]);


  // Lógica de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = collections?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(collections?.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target?.value);
    setCurrentPage(1); // Reiniciar a página para a primeira ao aplicar o filtro
  };

  const handleStateChange = (event) => {
    const newState = event.target?.value;
    setSelectedState(newState);
    setSelectedCity(''); // Limpar a cidade ao mudar o estado
    setCurrentPage(1); // Reiniciar a página para a primeira ao aplicar o filtro
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target?.value);
    setCurrentPage(1); // Reiniciar a página para a primeira ao aplicar o filtro
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    setCurrentPage(1); // Reiniciar a página para a primeira ao aplicar o filtro
  };

  const handleClickSearch = (event) => {
    if(selectedCity){ 
      navigateUrlGeo(selectedCity)
    }else if(selectedState){
      navigateUrlGeo(selectedState)
    }
  }

  const navigateUrlGeo = (geo) => {
    const formatedGeo = formatStrToUrl(geo)
      const url = generateUrlGeo(formatedGeo)
      router.push(url);
  }

  const generateUrlGeo = (geo) => {
    const url = router.asPath
    const arrUrl = url.substring(1).split('/')
    if(arrUrl[1]){
      if(geo)  return `/${arrUrl[0]}/${arrUrl[1]}/${formatStrToUrl(geo)}`
      
      return `/${arrUrl[0]}/${arrUrl[1]}`
    }
      if(geo)  return `/${arrUrl[0]}/${formatStrToUrl(geo)}`
      return `/${arrUrl[0]}`
  }

  
  return (
    <div className='flex flex-col gap-10'>
      {/* Campos de filtro */}
      <div className="mb-4 flex justify-center md:flex-row flex-col md:gap-0 gap-4">
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
            className="p-2 border border-gray-300 rounded mr-4 flex-1"
            >
            <option value="">Selecione o produto</option>
            {products.map((product, index) =>(
              <option key={index} value={product.label}>
            {product.title}
            </option>))}
              </select>
          )}
         

        {/* Campo de seleção de estado */}
        <div className="rounded-lg border mx-4 py-2 w-64 text-center bg-white group ">
    <span className=" relative h-full py-2 md:text-base text-sm">{stateMatch ? stateMatch : 'Selecione o Estado'}</span>
    <ul className="
    list-none
    w-64
    border
    border-t-0
    absolute 
    translate-x-[-1px]
    bg-white 
    z-[99] 
    opacity-0 
    group-hover:opacity-100 
    
    group-hover:h-max
    my-2
    h-0  
    max-h-[170px]
    duration-500
    overflow-scroll
    overflow-x-hidden
    ">
      <li>
        <Link href={generateUrlGeo()} onClick={() => handleStateChange('')}
        className='
        w-full
          flex
          
          justify-center
        '>
          Todos os estados
        </Link>
      </li>
      {uniqueStates.map((state, index) => (
        <li key={index}>
          <Link href={generateUrlGeo(state)} onClick={() => handleStateChange(state)}
          className='
          w-full
          flex
          hover:bg-slate-100
          justify-center
          '>
            {state}
          </Link>
        </li>
      ))}
    </ul>
  </div>

  {/* Campo de seleção de cidade */}
  <div className='rounded-lg hover:rounded-b-none border mx-4 py-2 w-64 text-center bg-white group '>
    <span className="relative py-2 md:text-base text-sm ">{cityMatch ? cityMatch : 'Selecione a Cidade'}</span>
    <ul className="
    list-none
    absolute 
    border
    translate-x-[-1px]
    border-t-0
    w-64
    bg-white 
    z-[99] 
    opacity-0 
    group-hover:opacity-100 
    group-hover:h-max
    my-2
    h-0  
    max-h-[170px]
    duration-500
    overflow-scroll
    overflow-x-hidden
    ">
      <li>
      <Link href={generateUrlGeo(stateMatch ? stateMatch : '')} onClick={() => handleCityChange('')}
      className='
      w-full
          flex
          justify-center
      '>
          Todas as cidades
        </Link>
      </li>
      {uniqueCities?.map((city, index) => (
        <li key={index}>
          <Link href={generateUrlGeo(city)} onClick={() => handleCityChange(city)}
          className='
          w-full
          flex
          justify-center
          hover:bg-slate-100
          '>
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
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {currentItems?.map((collection, index) => (
          <div className="" key={index}>
            <Card collection={collection} />
          </div>
        ))}
      </div>
      

      {/* Paginação */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-2 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default Collection;


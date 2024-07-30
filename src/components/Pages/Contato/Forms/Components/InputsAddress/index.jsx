/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import InputMask from 'react-input-mask'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'
import { useIntl } from 'react-intl'

export default function InputsAddress({ setAddress, resetInputs }) {
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [cep, setCep] = useState('')

  const intl = useIntl()
  const messages = intl.messages

  useEffect(() => {
    const address = {
      street,
      number,
      neighborhood,
      city,
      state,
      cep,
    }
    setAddress(address)
  }, [street, number, neighborhood, city, state, cep])

  useEffect(() => {
    reset()
  }, [resetInputs])

  const reset = () => {
    setStreet('')
    setNumber('')
    setNeighborhood('')
    setCity('')
    setState('')
    setCep('')
  }

  const handleBlur = async () => {
    const cleanedValue = cep.replace(/\D/g, '')
    if (cleanedValue.length != 8) return

    const fullAddress = await fetchAddress(cleanedValue)

    if (fullAddress.erro) {
      return toast.error('CEP não encontrado!')
    } else {
      insertAddress(fullAddress)
    }
  }

  const insertAddress = (fullAddress) => {
    setStreet(fullAddress.logradouro)
    setNeighborhood(fullAddress.bairro)
    setCity(fullAddress.localidade)
    setState(fullAddress.uf)
  }

  const fetchAddress = async (cleanedValue) => {
    try {
      const url = `https://viacep.com.br/ws/${cleanedValue}/json/`
      const returnAddress = await fetch(url).then((response) => {
        return response.json()
      })

      // setAddress(returnAddress);
      return returnAddress
    } catch (error) {
      return null
    }
  }

  return (
    <div className="flex w-full flex-row flex-wrap justify-between">
      <div className="mt-2 flex w-[48%] flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="cep">
          <InsertTranslationMsg keyTrans={'component.address.input.cep'} />
        </label>
        <InputMask
          mask="99999-999"
          maskPlaceholder=""
          id="cep"
          placeholder={messages['component.address.input.cep']}
          className="border px-4 py-2"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
      <div className="mt-2 flex w-[48%] flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="street">
          <InsertTranslationMsg keyTrans={'component.address.input.street'} />
        </label>
        <input
          type="text"
          id="street"
          placeholder={messages['component.address.input.street']}
          className="border px-4 py-2"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      <div className="mt-2 flex w-[48%] flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="number">
          <InsertTranslationMsg keyTrans={'component.address.input.number'} />
        </label>
        <input
          type="text"
          id="number"
          placeholder={messages['component.address.input.number']}
          className="border px-4 py-2"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className="mt-2 flex w-[48%] flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="neighborhood">
          <InsertTranslationMsg keyTrans={'component.address.input.district'} />
        </label>
        <input
          type="text"
          id="neighborhood"
          placeholder={messages['component.address.input.district']}
          className="border px-4 py-2"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </div>

      <div className="mt-2 flex w-[48%] flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="city">
          <InsertTranslationMsg keyTrans={'component.address.input.city'} />
        </label>
        <input
          type="text"
          id="city"
          placeholder={messages['component.address.input.city']}
          className="border px-4 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="mt-2 flex w-[48%] flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="state">
          <InsertTranslationMsg keyTrans={'component.address.input.state'} />
        </label>
        <input
          type="text"
          id="state"
          placeholder={messages['component.address.input.state']}
          className="border px-4 py-2"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </div>
  )
}

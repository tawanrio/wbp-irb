/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'
import { useIntl } from 'react-intl'

export default function InputsAddress({ setAddress, resetInputs }) {
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [cep, setCep] = useState('')

  const zipCodeRef = useRef(null)
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
    if (cleanedValue.length !== 8) return

    const fullAddress = await fetchAddress(cleanedValue)

    if (fullAddress.erro) {
      return toast.error('CEP não encontrado!')
    } else {
      insertAddress(fullAddress)
    }
  }

  const insertAddress = (fullAddress) => {
    setStreet(fullAddress.result.street)
    setNeighborhood(fullAddress.result.district)
    setCity(fullAddress.result.city)
    setState(fullAddress.result.state)
  }

  const fetchAddress = async (cleanedValue) => {
    try {
      const url = `https://api.brasilaberto.com/v1/zipcode/${cleanedValue}`
      const returnAddress = await fetch(url).then((response) => {
        return response.json()
      })

      return returnAddress
    } catch (error) {
      return null
    }
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="cep">
          <InsertTranslationMsg keyTrans={'component.address.input.cep'} />
        </label>
        <InputMask
          id="cep"
          mask="99999-999"
          ref={zipCodeRef}
          placeholder={messages['component.address.input.cep.placeholder']}
          className="border px-4 py-2"
          required
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="street">
          <InsertTranslationMsg
            keyTrans={'component.address.input.street.placeholder'}
          />
        </label>
        <input
          id="street"
          type="text"
          required
          id="street"
          required
          placeholder={messages['component.address.input.street.placeholder']}
          className="border px-4 py-2"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="number">
          <InsertTranslationMsg
            keyTrans={'component.address.input.number.placeholder'}
          />
        </label>
        <input
          id="number"
          type="text"
          required
          id="number"
          placeholder={messages['component.address.input.number.placeholder']}
          className="border px-4 py-2"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="neighborhood">
          <InsertTranslationMsg
            keyTrans={'component.address.input.district.placeholder'}
          />
        </label>
        <input
          id="neighborhood"
          placeholder={messages['component.address.input.district.placeholder']}
          className="border px-4 py-2"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="city">
          <InsertTranslationMsg
            keyTrans={'component.address.input.city.placeholder'}
          />
        </label>
        <input
          id="city"
          type="text"
          required
          id="city"
          placeholder={messages['component.address.input.city.placeholder']}
          className="border px-4 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="state">
          <InsertTranslationMsg
            keyTrans={'component.address.input.state.placeholder'}
          />
        </label>
        <input
          id="state"
          type="text"
          required
          placeholder={messages['component.address.input.state.placeholder']}
          className="border px-4 py-2"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </div>
  )
}

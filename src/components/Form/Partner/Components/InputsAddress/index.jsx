/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function InputsAddress({ setAddress, resetInputs }) {
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [cep, setCep] = useState('')

  const zipCodeRef = useRef(null)

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
          CEP
        </label>
        <InputMask
          id="cep"
          mask="99999-999"
          ref={zipCodeRef}
          placeholder="CEP"
          className="border px-4 py-2"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="street">
          {' '}
          Rua/Avenida
        </label>
        <input
          type="text"
          required
          id="street"
          placeholder="Rua/Avenida"
          className="border px-4 py-2"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="number">
          Número
        </label>
        <input
          type="text"
          required
          id="number"
          placeholder="Número"
          className="border px-4 py-2"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="neighborhood">
          Bairro
        </label>
        <input
          type="text"
          id="neighborhood"
          placeholder="Bairro"
          className="border px-4 py-2"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="city">
          Cidade
        </label>
        <input
          type="text"
          required
          id="city"
          placeholder="Cidade"
          className="border px-4 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold capitalize" htmlFor="state">
          Estado
        </label>
        <input
          type="text"
          id="state"
          required
          placeholder="Estado"
          className="border px-4 py-2"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </div>
  )
}
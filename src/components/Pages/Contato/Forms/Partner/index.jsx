/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import FormAutoparts from '@/components/Pages/Register/Forms/Autoparts'
import FormDistributor from '@/components/Pages/Register/Forms/Distributor'
import FormMechanics from '@/components/Pages/Register/Forms/Mechanics'

export default function FormPartner({ resetInputs, setInputs }) {
  const [partnerType, setPartnerType] = useState('')

  const handlePartnerType = (value) => {
    setPartnerType(value)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-10">
      <div className="flex w-full flex-col">
        <label className="text-lg font-bold" htmlFor="partnerType">
          Tipo de parceiro
        </label>
        <select
          id="partnerType"
          className="border px-4 py-2"
          value={partnerType}
          required
          onChange={(e) => handlePartnerType(e.target.value)}
        >
          <option value="">Área de Atuação</option>
          <option value="distribuidoras">Distribuidoras</option>
          <option value="mecanicas">Mecânicas</option>
          <option value="autopecas">Autopeças</option>
        </select>
      </div>

      {partnerType === 'distribuidoras' && (
        <FormDistributor
          setInputs={setInputs}
          resetInputs={resetInputs}
          partnerType={partnerType}
        />
      )}
      {partnerType === 'mecanicas' && (
        <FormMechanics
          setInputs={setInputs}
          resetInputs={resetInputs}
          partnerType={partnerType}
        />
      )}
      {partnerType === 'autopecas' && (
        <FormAutoparts
          setInputs={setInputs}
          resetInputs={resetInputs}
          partnerType={partnerType}
        />
      )}
    </div>
  )
}

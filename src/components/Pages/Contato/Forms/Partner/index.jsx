import { useState } from 'react'
import FormAutoparts from '@/components/Pages/Register/Forms/Autoparts'
import FormDistributor from '@/components/Pages/Register/Forms/Distributor'
import FormMechanics from '@/components/Pages/Register/Forms/Mechanics'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'

export default function FormPartner({ resetInputs, setInputs }) {
  const [partnerType, setPartnerType] = useState('')

  const handlePartnerType = (value) => {
    setPartnerType(value)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-10">
      <div className="flex w-full flex-col">
        <label className="text-lg font-bold" htmlFor="partnerType">
          <InsertTranslationMsg keyTrans={'component.form.partner.select'} />
        </label>
        <select
          id="partnerType"
          className="appearance-none border bg-custom-arrow bg-[calc(100%-1rem)_center] bg-no-repeat px-4 py-2"
          value={partnerType}
          required
          onChange={(e) => handlePartnerType(e.target.value)}
        >
          <InsertTranslationMsg
            keyTrans={'component.form.partner.select.area'}
            tag="option"
            value=""
            disabled
          />
          <InsertTranslationMsg
            keyTrans={'component.form.partner.select.distributor'}
            tag="option"
            value="distribuidoras"
          />
          <InsertTranslationMsg
            keyTrans={'component.form.partner.select.mechanic'}
            tag="option"
            value="mecanicas"
          />
          <InsertTranslationMsg
            keyTrans={'component.form.partner.select.autopart'}
            tag="option"
            value="autopecas"
          />
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

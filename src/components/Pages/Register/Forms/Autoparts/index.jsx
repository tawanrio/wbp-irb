/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import InputsAddress from './../Components/InputsAddress'
import InputsInfo from '../Components/InputsInfo'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'
import { useIntl } from 'react-intl'

export default function FormAutoparts({ setInputs, resetInputs, partnerType }) {
  const [address, setAddress] = useState({})
  const [info, setInfo] = useState({})
  const [whereToBuy, setWhereToBuy] = useState('')
  const intl = useIntl()
  const messages = intl.messages

  useEffect(() => {
    const updatedInfo = {
      ...info,
      whereToBuy,
    }

    setInfo(updatedInfo)

    setInputs({
      info: updatedInfo,
      address,
    })
  }, [info, address, whereToBuy])

  return (
    <div className="flex w-full flex-col justify-between gap-4 md:my-0 md:gap-2 md:px-0">
      <InputsInfo
        setInfo={setInfo}
        resetInputs={resetInputs}
        partnerType={partnerType}
      />
      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold" htmlFor="partnerType">
          <InsertTranslationMsg
            keyTrans={'component.form.partner.input.autopart.whereToBuy'}
          />
        </label>
        <input
          type="text"
          id="whereToBuy"
          placeholder={
            messages[
              'component.form.partner.input.autopart.whereToBuy.placeholder'
            ]
          }
          className="border px-4 py-2"
          required
          value={whereToBuy}
          onChange={(e) => setWhereToBuy(e.target.value)}
        />
      </div>
      <InputsAddress setAddress={setAddress} />
    </div>
  )
}

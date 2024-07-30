/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import InputsInfo from '../Components/InputsInfo'
import InputsAddress from './../Components/InputsAddress'
import Requirements from './Requirements'

export default function FormMechanics({ setInputs, resetInputs, partnerType }) {
  const [requirements, setRequiments] = useState({})
  const [address, setAddress] = useState({})
  const [info, setInfo] = useState({})

  useEffect(() => {
    setInputs({
      info,
      address,
      requirements,
    })
  }, [info, address])

  return (
    <div className="flex w-full flex-col justify-between gap-4 md:my-0 md:gap-2 md:px-0">
      <InputsInfo
        setInfo={setInfo}
        resetInputs={resetInputs}
        partnerType={partnerType}
      />
      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
      <Requirements setRequiments={setRequiments} resetInputs={resetInputs} />
    </div>
  )
}

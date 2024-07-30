/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import InputsAddress from './../Components/InputsAddress'
import InputsInfo from '../Components/InputsInfo'

export default function FormDistributor({
  setInputs,
  resetInputs,
  partnerType,
}) {
  const [address, setAddress] = useState({})
  const [info, setInfo] = useState({})

  useEffect(() => {
    setInputs({
      info,
      address,
    })
  }, [info, address])

  return (
    <div className="flex w-full flex-col justify-between gap-2 md:my-0 md:gap-2 md:px-0">
      <InputsInfo
        setInfo={setInfo}
        resetInputs={resetInputs}
        partnerType={partnerType}
      />
      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import InputsAddress from './../Components/InputsAddress'
import InputsInfo from '../Components/InputsInfo'

export default function FormAutoparts({ setInputs, resetInputs, partnerType }) {
  const [address, setAddress] = useState({})
  const [info, setInfo] = useState({})
  const [whereToBuy, setWhereToBuy] = useState('')

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

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  const resetForm = () => {
    setWhereToBuy('')
    setInfo({})
    setAddress({})
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 md:my-0 md:gap-2 md:px-0">
      <InputsInfo
        setInfo={setInfo}
        resetInputs={resetInputs}
        partnerType={partnerType}
      />
      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}

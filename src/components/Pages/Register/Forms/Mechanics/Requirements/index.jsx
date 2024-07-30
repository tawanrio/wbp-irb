/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import { EQUIPMENTS } from '@/utils/constants'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'
import { useIntl } from 'react-intl'

export default function Requirements({ setRequiments, resetInputs }) {
  const [certificateImg, setCertificateImg] = useState('')
  const [elevatorImg, setElevatorImg] = useState('')
  const [selectedEquipments, setSelectedEquipments] = useState([])
  const intl = useIntl()
  const messages = intl.messages

  useEffect(() => {
    setRequiments({ certificateImg, elevatorImg, selectedEquipments })
  }, [certificateImg, elevatorImg, selectedEquipments])

  useEffect(() => {
    setCertificateImg('')
    setElevatorImg('')
    setSelectedEquipments([])
  }, [resetInputs])

  const handleImg = (event, setState) => {
    const file = event.target.files[0]
    setState(file)
  }

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target

    setSelectedEquipments((prevSelectedEquipments) => {
      if (checked) {
        return [...prevSelectedEquipments, value]
      } else {
        return prevSelectedEquipments.filter((equipment) => equipment !== value)
      }
    })
  }

  return (
    <div className="mt-10">
      <SectionTitle
        title={messages['component.form.partner.input.autopart.requeriments']}
        line={true}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            <InsertTranslationMsg
              keyTrans={
                'component.form.partner.input.autopart.requeriments.certificate'
              }
            />
          </label>
          <span className="text-sm text-slate-400">
            <InsertTranslationMsg
              keyTrans={
                'component.form.partner.input.autopart.requeriments.certificate.placeholder'
              }
            />
          </span>
          <input
            type="file"
            id="logo"
            className="mt-2"
            accept="image/png, image/jpeg, application/pdf"
            onChange={(event) => handleImg(event, setCertificateImg)}
          />
          <span className="mt-1 text-sm text-slate-400">
            <InsertTranslationMsg keyTrans={'component.form.mediaFormats'} />
          </span>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            <InsertTranslationMsg
              keyTrans={
                'component.form.partner.input.autopart.requeriments.elevator'
              }
            />
          </label>
          <span className="text-sm text-slate-400">
            <InsertTranslationMsg
              keyTrans={
                'component.form.partner.input.autopart.requeriments.elevator.placeholder'
              }
            />
          </span>
          <input
            type="file"
            id="logo"
            className="mt-2"
            accept="image/png, image/jpeg, application/pdf"
            onChange={(event) => handleImg(event, setElevatorImg)}
          />
          <span className="mt-1 text-sm text-slate-400">
            <InsertTranslationMsg keyTrans={'component.form.mediaFormats'} />
          </span>
        </div>
      </div>

      <div className="mt-5 flex w-full flex-col">
        <label className="text-lg font-bold">
          <InsertTranslationMsg
            keyTrans={
              'component.form.partner.input.autopart.requeriments.tools'
            }
          />
        </label>
        <span className="text-sm text-slate-400">
          <InsertTranslationMsg
            keyTrans={
              'component.form.partner.input.autopart.requeriments.tools.placeholder'
            }
          />
        </span>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {EQUIPMENTS.map((equipment, index) => (
            <label key={index} className="flex flex-row items-center">
              <input
                type="checkbox"
                value={messages[equipment]}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">{messages[equipment]}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

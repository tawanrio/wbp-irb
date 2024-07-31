/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import { EQUIPMENTS } from '@/utils/constants'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'
import { useIntl } from 'react-intl'

export default function Requirements({ setRequiments, resetInputs }) {
  const [certificateImg, setCertificateImg] = useState(null)
  const [elevatorImg, setElevatorImg] = useState(null)
  const [selectedEquipments, setSelectedEquipments] = useState([])
  const certificateImgRef = useRef(null)
  const elevatorImgRef = useRef(null)
  const checkboxRefs = useRef([])

  const intl = useIntl()
  const messages = intl.messages

  useEffect(() => {
    setRequiments({ certificateImg, elevatorImg, selectedEquipments })
  }, [certificateImg, elevatorImg, selectedEquipments])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  useEffect(() => {
    updateCheckboxRequiredStatus()
  }, [selectedEquipments])

  const resetForm = () => {
    setCertificateImg(null)
    setElevatorImg(null)
    setSelectedEquipments([])

    if (certificateImgRef.current) {
      certificateImgRef.current.value = ''
    }

    if (elevatorImgRef.current) {
      elevatorImgRef.current.value = ''
    }

    checkboxRefs.current.forEach((checkbox) => {
      if (checkbox) {
        checkbox.checked = false
      }
    })
    updateCheckboxRequiredStatus()
  }

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

  const handleLiClick = (index) => {
    const checkbox = checkboxRefs.current[index]
    if (checkbox) {
      checkbox.checked = !checkbox.checked
      const event = { target: checkbox }
      handleCheckboxChange(event)
    }
  }

  const updateCheckboxRequiredStatus = () => {
    const anyChecked = selectedEquipments.length > 0
    checkboxRefs.current.forEach((checkbox) => {
      if (checkbox) {
        checkbox.required = !anyChecked
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
            id="logo"
            type="file"
            required
            className="mt-2"
            ref={certificateImgRef}
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
            id="logo"
            type="file"
            required
            className="mt-2"
            ref={elevatorImgRef}
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
        <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {EQUIPMENTS.map((equipment, index) => (
            <li
              key={index}
              className="flex w-fit cursor-pointer flex-row items-center"
              onClick={() => handleLiClick(index)}
            >
              <input
                type="checkbox"
                value={messages[equipment]}
                onChange={handleCheckboxChange}
                ref={(el) => (checkboxRefs.current[index] = el)}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer"
              />
              <span className="ml-2">{messages[equipment]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

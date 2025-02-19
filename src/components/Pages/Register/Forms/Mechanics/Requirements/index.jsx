/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { EQUIPMENT_LIST } from '@/utils/constants'

export default function Requirements({ setRequiments, resetInputs }) {
  const [certificateImg, setCertificateImg] = useState(null)
  const [elevatorImg, setElevatorImg] = useState(null)
  const [selectedEquipments, setSelectedEquipments] = useState([])

  const certificateImgRef = useRef(null)
  const elevatorImgRef = useRef(null)
  const checkboxRefs = useRef([])

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
      <legend className="mb-8 font-['Libre_Baskerville'] text-4xl italic text-white">
        Pré-Requisitos
      </legend>
      <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
        <fieldset className="flex flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            Certificação Profissional *
          </label>
          <span className="text-sm text-slate-400">
            Anexar o seu certificado{' '}
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
            Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 5MB.
          </span>
        </fieldset>
        <fieldset className="flex flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            Equipamento: Elevador *
          </label>
          <span className="text-sm text-slate-400">
            Anexar uma foto do seu elevador
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
            Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 5MB.
          </span>
        </fieldset>
      </div>

      <div className="mt-8 flex w-full flex-col">
        <label className="text-lg font-bold">Ferramentas:</label>
        <span className="text-sm text-slate-400">
          Preencher quais ferramentas você possui
        </span>
        <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {EQUIPMENT_LIST.map((equipment, index) => (
            <li
              key={index}
              className="flex w-fit cursor-pointer flex-row items-center"
              onClick={() => handleLiClick(index)}
            >
              <input
                type="checkbox"
                value={equipment}
                onChange={handleCheckboxChange}
                ref={(el) => (checkboxRefs.current[index] = el)}
                onClick={(e) => e.stopPropagation()}
                className="min-h-[0.813rem] min-w-[0.813rem] cursor-pointer"
              />
              <label className="ml-2 cursor-pointer">{equipment}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

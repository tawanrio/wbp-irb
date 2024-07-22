/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import FormAutoparts from '@/components/Pages/Register/Forms/Autoparts'
import FormDistributor from '@/components/Pages/Register/Forms/Distributor'
import FormMechanics from '@/components/Pages/Register/Forms/Mechanics'
import ReactDOMServer from 'react-dom/server'
import TemplateMailPartner from './TemplateMail'
import { generateUniqueIdByCnpj, generateActionsLink } from '@/utils/functions'

export default function FormPartner({ formData, setFormData }) {
  const [partnerType, setPartnerType] = useState('')
  const [resetInputs, setResetInputs] = useState(false)
  const [html, setHtml] = useState('')
  const [structureMail, setStructureMail] = useState({})
  const [inputs, setInputs] = useState(null)
  const [uniqueId, setUniqueId] = useState('')
  const [actionsLink, setActionsLink] = useState('')

  const handlePartnerType = (value) => {
    setPartnerType(value)
  }

  useEffect(() => {
    if (formData.inputs?.info.cnpj) {
      setUniqueId(generateUniqueIdByCnpj(formData.inputs?.info?.cnpj))
      setActionsLink(generateActionsLink(formData.inputs?.info?.cnpj, uniqueId))
    }
    setHtml(
      ReactDOMServer.renderToString(
        <TemplateMailPartner
          data={formData}
          uniqueId={uniqueId}
          actionsLink={actionsLink}
        />,
      ),
    )

    setStructureMail({
      html,
      to: 'marketing@irbauto.com.br',
      cco: 'tawan.rio@webfoco.com',
      from: 'formData.inputs.info.tradingName',
      subject: 'Solicitação de cadastro de parceiro',
    })

    setFormData({
      inputs,
      structureMail,
      uniqueId,
    })
  }, [inputs])

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

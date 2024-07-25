/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function TemplateMailPartner({ data, actionsLink }) {
  const { address = {}, info = {}, requirements = {} } = data.inputs || {}

  const renderInfo = (label, value) => {
    return value ? (
      <p style={{ margin: '10px 0', color: '#333' }}>{`${label}: ${value}`}</p>
    ) : null
  }

  const renderImage = (label, src, alt) => {
    return src ? (
      <div style={{ margin: '10px 0' }}>
        <p style={{ color: '#333' }}>{label}</p>
        <img
          src={src}
          alt={alt}
          style={{
            display: 'block',
            margin: '20px auto',
            maxWidth: '100%',
            color: '#333',
          }}
        />
      </div>
    ) : null
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#fff',
        padding: '20px',
        border: '1px solid #dddddd',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
          Solicitação de cadastro de parceiro IRB
        </h1>
      </div>
      <p style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
        Email enviado através do site:{' '}
        <a
          href="http://irbauto.com.br"
          style={{ color: '#4CAF50', textDecoration: 'none' }}
        >
          irbauto.com.br
        </a>
      </p>
      <div style={{ lineHeight: '1.6', color: '#333' }}>
        {info.partnerType && (
          <h2 style={{ fontSize: '18px' }}>{info.partnerType}</h2>
        )}
        {renderInfo('CNPJ', info.cnpj)}
        {renderInfo('Razão Social', info.companyName)}
        {renderInfo('Nome Fantasia', info.tradingName)}
        {renderInfo('Email', info.email)}
        {renderInfo('Telefone', info.phone)}
        {address.street &&
          address.number &&
          address.neighborhood &&
          address.city &&
          address.state &&
          address.cep && (
            <p style={{ margin: '10px 0', color: '#333' }}>
              Endereço: {address.street}, {address.number} -{' '}
              {address.neighborhood}, {address.city} - {address.state}, CEP:{' '}
              {address.cep}
            </p>
          )}
        {renderImage('Logomarca', info.logo, 'Logo da Empresa')}
        {requirements && (
          <div>
            <h2 style={{ fontSize: '18px', marginTop: '20px', color: '#333' }}>
              Pré-requisitos
            </h2>
            {renderImage(
              'Certificação Profissional',
              requirements.certificateImg,
              'Foto do Certificação Profissional',
            )}
            {renderImage(
              'Equipamento',
              requirements.elevatorImg,
              'Foto do Equipamento',
            )}
            {requirements.selectedEquipments && (
              <p style={{ margin: '10px 0', color: '#333' }}>
                Ferramentas: {requirements.selectedEquipments.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {actionsLink?.accept && (
          <a
            href={actionsLink.accept}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#22326e',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              margin: '0 5px',
              transition: 'background-color 0.3s',
            }}
          >
            Aceitar
          </a>
        )}
        {actionsLink?.refuse && (
          <a
            href={actionsLink.refuse}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#c12025',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              margin: '0 5px',
              transition: 'background-color 0.3s',
            }}
          >
            Recusar
          </a>
        )}
      </div>
    </div>
  )
}

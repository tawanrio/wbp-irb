/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function TemplateMailPartner({ data, actionsLink }) {
  const { address = {}, info = {}, requirements = {} } = data.inputs || {}

  const renderInfo = (label, value) => {
    return value ? (
      <p style={{ margin: '10px 0', color: '#333' }}>
        <strong>{label}:</strong> {value}
      </p>
    ) : null
  }

  const renderFile = (label, src, alt) => {
    if (!src) return null

    const fileExtension = src.split('.').pop().toLowerCase()
    if (fileExtension === 'pdf') {
      return (
        <div style={{ margin: '20px 0' }}>
          <strong style={{ color: '#333' }}>{label}</strong>
          <a
            href={src}
            target="_blank"
            rel="noopener"
            style={{ display: 'block', margin: '10px auto' }}
          >
            Abrir PDF
          </a>
        </div>
      )
    }

    return (
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <strong style={{ color: '#333' }}>{label}</strong>
        <img
          src={src}
          alt={alt}
          border="0"
          style={{
            display: 'block',
            margin: '10px auto',
            maxHeight: '150px',
            maxWidth: '300px',
            width: 'auto',
            height: 'auto',
            color: '#333',
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        border: '1px solid #dddddd',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        padding: '20px',
        margin: '20px auto',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          margin: 0,
          fontSize: '24px',
          color: '#333',
          paddingBottom: '20px',
        }}
      >
        Solicitação de cadastro de parceiro IRB
      </h2>
      <p style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
        Email enviado através do site:{' '}
        <a
          href="http://irbauto.com.br"
          style={{ color: '#4CAF50', textDecoration: 'none' }}
        >
          irbauto.com.br
        </a>
      </p>
      <div style={{ lineHeight: '1.6' }}>
        {info.partnerType && (
          <h2
            style={{
              fontSize: '18px',
              textTransform: 'capitalize',
              color: '#333',
            }}
          >
            {info.partnerType}
          </h2>
        )}
        {info?.whereToBuy &&
          renderInfo('Distribuidor dos Produtos IRB', info.whereToBuy)}
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
              <strong>Endereço:</strong> {address.street}, {address.number} -{' '}
              {address.neighborhood}, {address.city} - {address.state}, CEP:{' '}
              {address.cep}
            </p>
          )}
        {renderFile('Logomarca', info.logo, 'Logo da Empresa')}
        {Object.keys(requirements).length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '18px', color: '#333' }}>Pré-requisitos</h2>
            {renderFile(
              'Certificação Profissional',
              requirements.certificateImg,
              'Foto do Certificação Profissional',
            )}
            {renderFile(
              'Equipamento: Elevador',
              requirements.elevatorImg,
              'Foto do Equipamento',
            )}
            <p style={{ margin: '10px 0', color: '#333' }}>
              <strong>Ferramentas:</strong>{' '}
              {requirements.selectedEquipments.join(', ')}
            </p>
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

/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function TemplateMailPartner({ data, actionsLink }) {
  const { address = {}, info = {}, requirements = {} } = data.inputs || {}
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
        {info.cnpj && (
          <p style={{ margin: '10px 0', color: '#333' }}>CNPJ: {info.cnpj}</p>
        )}
        {info.companyName && (
          <p style={{ margin: '10px 0', color: '#333' }}>
            Razão Social: {info.companyName}
          </p>
        )}
        {info.tradingName && (
          <p style={{ margin: '10px 0', color: '#333' }}>
            Nome Fantasia: {info.tradingName}
          </p>
        )}
        {info.email && (
          <p style={{ margin: '10px 0', color: '#333' }}>Email: {info.email}</p>
        )}
        {info.phone && (
          <p style={{ margin: '10px 0', color: '#333' }}>
            Telefone: {info.phone}
          </p>
        )}
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
        {info.logo && (
          <div>
            <p style={{ margin: '10px 0', color: '#333' }}>Logomarca</p>
            <img
              src={info.logo}
              alt="Logo da Empresa"
              style={{
                display: 'block',
                margin: '20px auto',
                maxWidth: '100%',
                color: '#333',
              }}
            />
          </div>
        )}
        {requirements && (
          <div>
            <h2 style={{ fontSize: '18px', marginTop: '20px', color: '#333' }}>
              Pré-requisitos
            </h2>

            {requirements.certificateImg && (
              <div style={{ margin: '10px 0' }}>
                <p style={{ color: '#333' }}>Certificação Profissional</p>
                <img
                  src={requirements.certificateImg}
                  alt="Foto do Certificação Profissional"
                  style={{
                    display: 'block',
                    margin: '20px auto',
                    maxWidth: '100%',
                    color: '#333',
                  }}
                />
              </div>
            )}

            {requirements.elevatorImg && (
              <div style={{ margin: '10px 0' }}>
                <p style={{ color: '#333' }}>Equipamento</p>
                <img
                  src={requirements.elevatorImg}
                  alt="Foto do Equipamento"
                  style={{
                    display: 'block',
                    margin: '20px auto',
                    maxWidth: '100%',
                    color: '#333',
                  }}
                />
              </div>
            )}

            {requirements.selectedEquipments && (
              <div style={{ margin: '10px 0' }}>
                <p style={{ color: '#333', display: 'inline-block' }}>
                  Ferramentas: {requirements.selectedEquipments?.join(', ')}
                </p>
              </div>
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

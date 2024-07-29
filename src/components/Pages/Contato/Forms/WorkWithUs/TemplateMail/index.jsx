import React from 'react'

export default function TemplateMailWorkWithUs({ data }) {
  const { info = {} } = data.inputs || {}

  const renderInfo = (label, value) => {
    return value ? (
      <p style={{ margin: '10px 0', color: '#666' }}>
        <strong>{label}:</strong> {value}
      </p>
    ) : null
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ color: '#333' }}>Trabalhar na IRB</h2>
      <p style={{ color: '#666' }}>
        <strong>Email enviado através do site:</strong>{' '}
        <a href="http://irbauto.com.br">irbauto.com.br</a>
      </p>

      {renderInfo('Nome Completo', info.fullName)}
      {renderInfo('Email', info.email)}
      {renderInfo('Telefone', info.phone)}

      <p style={{ margin: '10px 0', color: '#666' }}>
        <strong>Currículo:</strong> <a href={info.curriculum}>Abrir PDF</a>
      </p>

      {data.inputs?.address.street &&
        data.inputs?.address.number &&
        data.inputs?.address.neighborhood &&
        data.inputs?.address.city &&
        data.inputs?.address.state &&
        data.inputs?.address.cep && (
          <p style={{ color: '#666', marginBottom: '10px' }}>
            <strong>Endereço:</strong> {data.inputs?.address.street},{' '}
            {data.inputs?.address.number} - {data.inputs?.address.neighborhood},{' '}
            {data.inputs?.address.city} - {data.inputs?.address.state}, CEP:{' '}
            {data.inputs?.address.cep}
          </p>
        )}
    </div>
  )
}

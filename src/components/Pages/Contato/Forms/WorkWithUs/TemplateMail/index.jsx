import React from 'react'

export default function TemplateMailWorkWithUs({ data }) {
  const { info = {} } = data.inputs || {}

  const renderInfo = (label, value) => {
    return value ? (
      <p style={{ margin: '10px 0', color: '#333' }}>
        <strong>{label}:</strong> {value}
      </p>
    ) : null
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
        Trabalhar na IRB
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

      {renderInfo('Nome Completo', info.fullName)}
      {renderInfo('Email', info.email)}
      {renderInfo('Telefone', info.phone)}

      <p style={{ margin: '10px 0', color: '#333' }}>
        <strong>Currículo:</strong> <a href={info.curriculum}>Abrir PDF</a>
      </p>

      {data.inputs?.address.street &&
        data.inputs?.address.number &&
        data.inputs?.address.neighborhood &&
        data.inputs?.address.city &&
        data.inputs?.address.state &&
        data.inputs?.address.cep && (
          <p style={{ color: '#333', marginBottom: '10px' }}>
            <strong>Endereço:</strong> {data.inputs?.address.street},{' '}
            {data.inputs?.address.number} - {data.inputs?.address.neighborhood},{' '}
            {data.inputs?.address.city} - {data.inputs?.address.state}, CEP:{' '}
            {data.inputs?.address.cep}
          </p>
        )}
    </div>
  )
}

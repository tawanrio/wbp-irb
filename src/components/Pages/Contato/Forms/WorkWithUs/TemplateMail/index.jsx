import React from 'react'

export default function TemplateMailWorkWithUs({ data }) {
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
      <h1 style={{ color: '#333' }}>Trabalhar na IRB</h1>
      <span>
        Email enviado através do site:{' '}
        <a href="http://irbauto.com.br">irbauto.com.br</a>
      </span>

      {data.inputs?.info.fullName && (
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Nome completo: {data.inputs?.info.fullName}
        </p>
      )}

      {data.inputs?.info.email && (
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Email: {data.inputs?.info.email}
        </p>
      )}

      {data.inputs?.info.phone && (
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Telefone: {data.inputs?.info.phone}
        </p>
      )}

      {data.inputs?.info.curriculum && (
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Currículo: {data.inputs?.info.curriculum}
        </p>
      )}

      {data.inputs?.address.street &&
        data.inputs?.address.number &&
        data.inputs?.address.neighborhood &&
        data.inputs?.address.city &&
        data.inputs?.address.state &&
        data.inputs?.address.cep && (
          <p style={{ color: '#666', marginBottom: '10px' }}>
            Endereço: {data.inputs?.address.street},{' '}
            {data.inputs?.address.number} - {data.inputs?.address.neighborhood},{' '}
            {data.inputs?.address.city} - {data.inputs?.address.state}, CEP:{' '}
            {data.inputs?.address.cep}
          </p>
        )}
    </div>
  )
}

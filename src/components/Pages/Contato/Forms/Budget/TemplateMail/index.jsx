import React from 'react'

export default function TemplateMailBudget({ data }) {
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
        Pedido de orçamento
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

      {renderInfo('Nome', info.fullName)}
      {renderInfo('Email', info.email)}
      {renderInfo('Telefone', info.phone)}
      {renderInfo('Produto', info.product)}
      {renderInfo('Linha de produto', info.productLine)}
      {renderInfo('Mensagem', info.message)}
    </div>
  )
}

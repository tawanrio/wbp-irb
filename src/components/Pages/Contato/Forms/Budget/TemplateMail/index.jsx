import React from 'react'

export default function TemplateMailBudget({ data }) {
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
      <h2 style={{ color: '#333' }}>Pedido de orçamento</h2>
      <p style={{ color: '#666' }}>
        <strong>Email enviado através do site:</strong>{' '}
        <a href="http://irbauto.com.br">irbauto.com.br</a>
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

import React from 'react'

export default function TemplateMailSuccessRegister({ data }) {
  const { info = {} } = data.inputs || {}

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
          color: '#22326e',
          paddingBottom: '20px',
        }}
      >
        Cadastro Realizado
      </h2>
      <div style={{ lineHeight: '1.6' }}>
        <p style={{ color: '#333' }}>Olá, {info.companyName}</p>
        <p style={{ color: '#333' }}>
          Seu cadastro foi realizado com sucesso. Estamos analisando suas
          informações e em breve você receberá uma confirmação de aprovação.
        </p>
        <p style={{ color: '#333' }}>
          Agradecemos pelo seu interesse e pela paciência.
        </p>
      </div>
      <div
        style={{
          textAlign: 'center',
          paddingTop: '10px',
          fontSize: '12px',
          color: '#999999',
        }}
      >
        <p>Este é um e-mail automático, por favor, não responda.</p>
        <p>
          Atenciosamente,
          <br />
          IRB Automotive.
        </p>
      </div>
    </div>
  )
}

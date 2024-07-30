import React from 'react'

export default function TemplateMailAcceptRegister({ data }) {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#ffffff',
        padding: '20px',
        border: '1px solid #dddddd',
        borderRadius: '5px',
      }}
    >
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#22326e' }}>
          Cadastro Aprovado
        </h1>
      </div>
      <div style={{ lineHeight: '1.6' }}>
        <p>Olá, {data.companyName}</p>
        <p>Seu cadastro foi aprovado com sucesso.</p>
        <p>Agradecemos pelo seu interesse.</p>
      </div>
      <div
        style={{
          textAlign: 'center',
          paddingTop: '20px',
          fontSize: '12px',
          color: '#999999',
        }}
      >
        <p>Este é um e-mail automático, por favor, não responda.</p>
        <p>
          Atenciosamente,
          <br />
          IRB Automotive
        </p>
      </div>
    </div>
  )
}

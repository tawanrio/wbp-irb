import React from 'react';

export default function TemplateMailSuccessRegister({ data }) {
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', backgroundColor: '#ffffff', padding: '20px', border: '1px solid #dddddd', borderRadius: '5px' }}>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#22326e' }}>Cadastro Realizado</h1>
      </div>
      <div style={{ lineHeight: '1.6' }}>
        <p>Olá, {data.info.companyName}</p>
        <p>Seu cadastro foi realizado com sucesso. Estamos analisando suas informações e em breve você receberá uma confirmação de aprovação.</p>
        <p>Agradecemos pelo seu interesse e pela paciência.</p>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '20px', fontSize: '12px', color: '#999999' }}>
        <p>Este é um e-mail automático, por favor, não responda.</p>
        <p>Atenciosamente,<br />IRB Automotive</p>
      </div>
    </div>
  );
}

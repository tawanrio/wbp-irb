import React from "react";

export default function TemplateMailPartner({ data, actionsLink }) {
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', backgroundColor: '#fff', padding: '20px', border: '1px solid #dddddd', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Solicitação de cadastro de parceiro IRB</h1>
      </div>
      <p style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
        Email enviado através do site: <a href="http://irbauto.com.br" style={{ color: '#4CAF50', textDecoration: 'none' }}>irbauto.com.br</a>
      </p>
      <div style={{ lineHeight: '1.6', color: '#333' }}>
        {data.inputs?.info.partnerType && (
          <h2 style={{ fontSize: '18px' }}>{data.inputs?.info.partnerType}</h2>
        )}
        {data.inputs?.info.cnpj && (
          <p style={{ margin: '10px 0' }}>CNPJ: {data.inputs?.info.cnpj}</p>
        )}
        {data.inputs?.info.companyName && (
          <p style={{ margin: '10px 0' }}>Razão Social: {data.inputs?.info.companyName}</p>
        )}
        {data.inputs?.info.tradingName && (
          <p style={{ margin: '10px 0' }}>Nome Fantasia: {data.inputs?.info.tradingName}</p>
        )}
        {data.inputs?.info.email && (
          <p style={{ margin: '10px 0' }}>Email: {data.inputs?.info.email}</p>
        )}
        {data.inputs?.info.phone && (
          <p style={{ margin: '10px 0' }}>Telefone: {data.inputs?.info.phone}</p>
        )}
        {data.inputs?.address.street && data.inputs?.address.number && data.inputs?.address.neighborhood && data.inputs?.address.city && data.inputs?.address.state && data.inputs?.address.cep && (
          <p style={{ margin: '10px 0' }}>
            Endereço: {data.inputs?.address.street}, {data.inputs?.address.number} - {data.inputs?.address.neighborhood}, {data.inputs?.address.city} - {data.inputs?.address.state}, CEP: {data.inputs?.address.cep}
          </p>
        )}
        {data.inputs?.info.logo && (
          <img
            src={data.inputs?.info?.logo?.url}
            alt="Logo da Empresa"
            style={{ display: 'block', margin: '20px auto', maxWidth: '100%' }}
          />
        )}
        {data.inputs?.requeriments && (
          <h2 style={{ fontSize: '18px', marginTop: '20px' }}>Pré-requisitos</h2>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {actionsLink?.accept && (
          <a
            href={actionsLink.accept}
            style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#22326e', color: '#fff', textDecoration: 'none', borderRadius: '5px', margin: '0 5px', transition: 'background-color 0.3s' }}
          >
            Aceitar
          </a>
        )}
        {actionsLink?.refuse && (
          <a
            href={actionsLink.refuse}
            style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#c12025', color: '#fff', textDecoration: 'none', borderRadius: '5px', margin: '0 5px', transition: 'background-color 0.3s' }}
          >
            Recusar
          </a>
        )}
      </div>
    </div>
  );
}

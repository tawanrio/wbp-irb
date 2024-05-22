import React from "react";

export default function TemplateMailPartner({ data, actionsLink}) {

  return (
    <div style={{ maxWidth: '600px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333' }}>Solicitação de cadastro de parceiro IRB</h1>
      <span>
        Email enviado através do site:{" "}
        <a href="http://irbauto.com.br">irbauto.com.br</a>
      </span>

      {data.inputs?.info.partnerType && (
        <h2 style={{ color: '#333' }}>{data.inputs?.info.partnerType}</h2>
      )}
      {data.inputs?.info.cnpj && (
        <p style={{ color: '#666', marginBottom: '10px' }}>CNPJ: {data.inputs?.info.cnpj}</p>
      )}
      {data.inputs?.info.companyName && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Razão Social: {data.inputs?.info.companyName}</p>
      )}
      {data.inputs?.info.tradingName && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Nome Fantasia: {data.inputs?.info.tradingName}</p>
      )}
      {data.inputs?.info.email && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Email: {data.inputs?.info.email}</p>
      )}
      {data.inputs?.info.phone && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Telefone: {data.inputs?.info.phone}</p>
      )}
      {data.inputs?.address.street && data.inputs?.address.number && data.inputs?.address.neighborhood && data.inputs?.address.city && data.inputs?.address.state && data.inputs?.address.cep && (
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Endereço: {data.inputs?.address.street}, {data.inputs?.address.number} - {data.inputs?.address.neighborhood}, {data.inputs?.address.city} - {data.inputs?.address.state}, CEP: {data.inputs?.address.cep}
        </p>
      )}
      {data.inputs?.info.logo && (
        <img
          src={data.inputs?.info.logo}
          alt="Logo da Empresa"
          style={{ display: 'block', margin: '20px auto', maxWidth: '100%' }}
        />
      )}
    {data.inputs?.requeriments && (
            <h2 style={{ color: '#333' }}>Pré-requisistos</h2>
          )}
          {data.inputs?.address.street && data.inputs?.address.number && data.inputs?.address.neighborhood && data.inputs?.address.city && data.inputs?.address.state && data.inputs?.address.cep && (
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Endereço: {data.inputs?.address.street}, {data.inputs?.address.number} - {data.inputs?.address.neighborhood}, {data.inputs?.address.city} - {data.inputs?.address.state}, CEP: {data.inputs?.address.cep}
        </p>
      )}

      {actionsLink && (
        <>
          {actionsLink.accept && (
            <span>
              <a
                href={actionsLink.accept}
                style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#22326e', color: '#fff', textDecoration: 'none', borderRadius: '5px', transition: 'background-color 0.3s' }}
              >
                Aceitar
              </a>
            </span>
          )}
          {actionsLink.refuse && (
            <span>
              <a
                href={actionsLink.refuse}
                style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#c12025', color: '#fff', textDecoration: 'none', borderRadius: '5px', transition: 'background-color 0.3s' }}
              >
                Recusar
              </a>
            </span>
          )}
        </>
      )}
    </div>
  );
}

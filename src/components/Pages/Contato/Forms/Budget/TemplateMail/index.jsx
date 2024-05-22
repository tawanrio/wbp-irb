import React from "react";

export default function TemplateMailBudget({ data }) {


  return (
    <div style={{ maxWidth: '600px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#333' }}>Pedido de orçamento</h2>
      <span>
        Email enviado através do site:{" "}
        <a href="http://irbauto.com.br">irbauto.com.br</a>
      </span>

      {data.inputs?.info.fullName && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Nome: {data.inputs?.info.fullName}</p>
      )}
      {data.inputs?.info.email && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Email: {data.inputs?.info.email}</p>
      )}
      {data.inputs?.info.phone && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Telefone: {data.inputs?.info.phone}</p>
      )}
      {data.inputs?.info.product && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Produto: {data.inputs?.info.product}</p>
      )}
      {data.inputs?.info.productLine && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Linha de produto: {data.inputs?.info.productLine}</p>
      )}
      {data.inputs?.info.message && (
        <p style={{ color: '#666', marginBottom: '10px' }}>Mensagem: {data.inputs?.info.message}</p>
      )}

    </div>
  );
}

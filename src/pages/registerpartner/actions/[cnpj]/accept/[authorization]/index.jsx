import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { Collection } from '@/service/model/schemas/collectionsSchema';
import { 
  formatStrToDash
 } from '@/utils/functions';
 import  TemplateMailAcceptRegister  from "@/components/Templates/Email/AcceptRegister"
 import ReactDOMServer from 'react-dom/server';
export default function AcceptRegisterPartner() {

  return (
    <>
    </>
  )
}

const acceptPartner = async (cnpj,authorization) =>{
  try{
    await connectMongoDB();
    const partner = await Collection.findOneAndUpdate(
      { cnpj: cnpj, idToValidationRegister: authorization },
      { $set: { enabled: true }},
      { new: true } // Isso garante que o documento retornado seja o atualizado
    );

    const data = {
      tradingName: formatStrToDash(partner.tradingName),
      type: partner.label,
      companyName: partner.companyName,
      email: partner.info.email
    }

    console.log(data);
   return data;

  }catch{
  }finally{
    await disconnectMongoDB();
  }
}

const sendEmailToPartner = async (data) => {
  const structureHtml = ReactDOMServer.renderToString(<TemplateMailAcceptRegister data={data} />);
  console.log(structureHtml);
  data.structureMail = {
    html: structureHtml,
    to: data.email,
    cco: 'tawan.rio@webfoco.com',
    from: 'formData.inputs.info.tradingName',
    subject: 'Cadastro Aprovado!',
  };

  const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/handlemail/sendmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      formData: data,
    }),
  });

  return response.ok;
};


export const getServerSideProps  = async (context) => {
  try {
    const {params, req, res} = context;
    const {cnpj, authorization} = params;
    
    const protocol = req[Symbol.for('NextInternalRequestMeta')].initProtocol
    const partner =  await acceptPartner(cnpj, authorization)
    
    if(!partner){
        res.writeHead(302, { Location: `${protocol}://${req.headers.host}` });
        res.end();
      }

    const responseAcceptMail = await sendEmailToPartner(partner)
    
    const fullDomain = `${protocol}://${req.headers.host}/${partner.type}/${partner?.tradingName}`;
    console.log(fullDomain);

    res.writeHead(302, { Location: fullDomain });
    res.end();

    return {
      props: {
        cnpj
      }
    };

  } catch (error) {
    console.error('Erro na página:', error);

    return {
      props: {
        content: null
      },
    };
  }
};
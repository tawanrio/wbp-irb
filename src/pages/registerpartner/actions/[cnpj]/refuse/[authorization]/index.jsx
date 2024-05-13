import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { Collection } from '@/service/model/schemas/collectionsSchema';

import { 
  formatStrToDash
 } from '@/utils/functions';

export default function RefuseRegisterPartner() {
  return (
    <></>
  )
}

const refusePartner = async (cnpj,authorization) =>{
  try{
    await connectMongoDB();

    const partner = await Collection.deleteOne(
      { cnpj: cnpj, idToValidationRegister: authorization },
      { new: true } // Isso garante que o documento retornado seja o atualizado
    );

    const data = {
      tradingName: formatStrToDash(partner.tradingName),
      type: partner.label
    }
   return data;

  }catch{
  }finally{
    await disconnectMongoDB();
  }
}
export const getServerSideProps  = async (context) => {
  try {
    const {params, req, res} = context;
    const {cnpj, authorization} = params;
    
    const protocol = req[Symbol.for('NextInternalRequestMeta')].initProtocol
     await refusePartner(cnpj, authorization)
    const fullDomain = `${protocol}://${req.headers.host}`;

   res.writeHead(301, { Location: fullDomain });
    res.end();
    
    return {
      props: {
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
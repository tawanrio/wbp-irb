import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { Collection } from '@/service/model/schemas/collectionsSchema';
import { 
  formatStrToDash
 } from '@/utils/functions';

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

    console.log(partner);
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
    
    console.log('test');
    console.log(res);

    const protocol = req[Symbol.for('NextInternalRequestMeta')].initProtocol
    const partner =  await acceptPartner(cnpj, authorization)

    if(!partner){
      res.writeHead(302, { Location: `${protocol}://${req.headers.host}` });
      res.end();
    }
    const fullDomain = `${protocol}://${req.headers.host}/${partner.type}/${partner?.tradingName}`;

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
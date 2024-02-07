// suaPagina.js
import { conectarMongoDB, desconectarMongoDB } from '@/service/db';

async function getProduct() {

    try{
      await conectarMongoDB();
    

const productSchema = new mongoose.Schema({
  title: String,
  label: String
});

const Product = mongoose.models.products || mongoose.model('products', productSchema);

    
      const products = await Product.findOne();
      
       console.log(products);
       return products;
    }finally{
      desconectarMongoDB()
    }
 
}

const SuaPagina = ({ produtos }) => (
  <div>
    <h1>Lista de Produtos</h1>
    <ul>
      {produtos.title}
     { console.log(produtos)}
    </ul>
  </div>
);

export const getStaticProps  = async () => {
  try {
    const produtos = await getProduct();

    // const produtosSerializaveis = produtos.map((produto) => {
    //   return JSON.parse(JSON.stringify(produto));
    // });
    const produtosSerializaveis = JSON.parse(JSON.stringify(produtos))


    return {
      props: {
        produtos: produtosSerializaveis,
      },
    };
  } catch (error) {
    console.error('Erro na página:', error);

    return {
      props: {
        produtos: [],
      },
    };
  }
};

export default SuaPagina;

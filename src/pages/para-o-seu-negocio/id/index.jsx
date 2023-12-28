// import { useRouter } from 'next/router';


// export default function Index({products}) {
//     const route = useRouter()

//   const pageUrl = route.asPath.replace('/','')


//     //  FUNÇÃO UTIL
//     function getProductFromUrl(products, pageUrl){
//         const product = products?.collection.filter((item) => formatString(item.title) === formatString(pageUrl) )
//        return product
//       }
      
//       function formatString(string){
//       let formatedString = string && string.toLowerCase().trim().replace('/', '').replaceAll(' ','-')
//       return formatedString
//       }
//     // fim FUNÇÃO UTIL
      
    
    
//       const product = getProductFromUrl(products, pageUrl)


//     const html = 'oi'
//   return (
//     <div>
//       {html}
//     </div>
//   )
// }
// export const getStaticPaths = async () => {
  
//     return {
//       paths: [],
//       fallback: true,
//     };
//   };

// export const getStaticProps = async ({ url }) => {
  
// const res = await fetch('http://irb.webfoco.com/api/products',{
//   method: 'get'
// });
// const data = await res.json()

// const products = data.products.collection


  
//     return {
//       props: {
//         products
//       },
//       revalidate: 60 * 30, // 30min
//     };
//   };

export default function index() {
  return (
    <div>index</div>
  )
}
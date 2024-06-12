// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Title from '@/components/Title';

// Components
import Banner from "@/components/Banner";
import ContentDescription from '@/components/ContentDescription';
import InsertVideo from '@/components/InsertVideo';
import Partners from '@/components/Partners';
import Form from '@/components/Form';
import CompanyValues from '@/components/CompanyValues';
import Categories from '@/components/Categories';
import BreadCrumb from '@/components/BreadCrumb';
import TextVideo from '@/components/TextVideo';
import {formatStrToDash} from '@/utils/functions'


// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menus} from '@/service/model/schemas/menusSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories as SchemaCategories} from '@/service/model/schemas/categoriesSchema'
import {CategoriesProducts} from '@/service/model/schemas/categoriesProductsSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Form as FormDb} from '@/service/model/schemas/formsSchema'
import { Posts } from '@/service/model/schemas/postsSchema';

// Others || functions
import { useState } from 'react';

import Utilities from '@/components/Utilities';
import Link from 'next/link';

export default function QuemSomos({content, data}) {
  console.log(content);

    const [metaTitle] = useState(content?.page?.metaTitle)
    const [metaDescription] = useState(content?.page?.metaDescription)
    const [banners] = useState(content?.page?.banners)
    const [title] = useState(content?.page?.title)
    const [video] = useState(content?.page?.video)
    const [cardsValues] = useState(content?.page?.companyValues)
    const [description] = useState(content?.page?.contentDescription)
    const [formDefault] = useState(content?.form?.forms.find(item => item.label === "default"))
    

    const [posts, setPosts] = useState(content?.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
     <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
     
     <Templates template={content?.template} page={content?.page} menus={content?.menus}>
        <Banner banners={banners} />
        <BreadCrumb/>
        <div className="max-w-6xl md:mx-auto mx-2 py-8">
        <h1 className="text-3xl font-bold mb-4">Publicações</h1>
        <div className="md:grid md:grid-cols-3 gap-4 flex flex-wrap">
        {currentPosts.map((post, key) => (
          <Link key={key} href={`/blog/${post.permaLink || formatStrToDash(post.title) }`}>
            <div className=" border p-4 hover:bg-gray-100 cursor-pointer h-full flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2 h-20 overflow-hidden" 
                >{post.title}</h2>
            
                <img src={post.featuredImg?.url} alt={post.featuredImg?.alt} className="mb-2 w-full h-52 object-cover" />
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: `${post.contentHTML.slice(0, 120)}...`}}
  
                ></p>
                {/* <p className="text-gray-700">{post.content.rendered.slice(0, 100)}...</p> */}
              </div>
              <div className="mt-auto">
                <Link className="text-blue-500 hover:underline" href={`/blog/${post.permaLink}`}>
                  Leia mais
                </Link>
              </div>
            </div>
          </Link>
        ))}
        </div>
        <ul className="flex justify-center mt-4">
        {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
          <li key={number}>
            <button onClick={() => paginate(number + 1)} className="mx-1 px-3 py-1 rounded bg-blue-500 text-white">{number + 1}</button>
          </li>
        ))}
      </ul>
        </div>
       
      </Templates>
 
    </>
  )
}

async function getDataPage(){
  try{
  await connectMongoDB();

  const page = await Page.findOne({label:"blog"}).lean();
  const menus = await Menus.find().lean();
  const template = await Template.find();
  const partners = await SchemaCategories.findOne({label:"partners"}).lean();
  const categories = await CategoriesProducts.find().lean();
  // const products = await ProductsDb.find().lean().limit(6);
  const form = await FormDb.findOne({label: "form"}).lean();
  const posts = await Posts.find().lean()


  return {
    page:JSON.parse(JSON.stringify(page)),
    partners:JSON.parse(JSON.stringify(partners)),
    categories:JSON.parse(JSON.stringify(categories)),
    form:JSON.parse(JSON.stringify(form)),
    template:JSON.parse(JSON.stringify(template)),
    menus:JSON.parse(JSON.stringify(menus)),
    posts:JSON.parse(JSON.stringify(posts))
  }
  }
  finally{
    disconnectMongoDB();
  }
}

// export async function getStaticPaths() {
//   // Busque os caminhos possíveis para pré-renderizar
//   // Por exemplo, de um banco de dados ou API

//   return {
//     paths: [],
//     fallback: false, // ou true ou 'blocking' se necessário
//   };
// }


export async function getStaticProps() {
  const content = await getDataPage();
  // const response = await fetch('https://clientes.agenciawbp.com/irb/wordpress/wp-json/wp/v2/posts?per_page=100');
  // const data = await response.json();
  const data = {}

  return {
    props: {
      content,
      data
    },
    revalidate: 2,
  };

};

// export const getServerSideProps  = async () => {
//   try {
//     const content = await getDataPage();
//     const response = await fetch('https://irbauto.com.br/wp-json/wp/v2/posts');
//     const data = await response.json();
//     return {
//       props: {
//         content,
//         data
//       }
//     };

//   } catch (error) {
//     console.error('Erro na página:', error);

//     return {
//       props: {
//         content: null
//       },
//     };
//   }
// };
// Database // Schema
// Template / Layout
import Templates from '@/components/Templates'
import Title from '@/components/Title';
import Banner from "@/components/Banner";

import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories as SchemaCategories} from '@/service/model/schemas/categoriesSchema'
import {CategoriesProducts} from '@/service/model/schemas/categoriesProductsSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Form as FormDb} from '@/service/model/schemas/formsSchema'

import { useState } from 'react'
import Link from 'next/link';

import { insertMenuInTemplate } from '@/utils/functions'
import { NextDataPathnameNormalizer } from 'next/dist/server/future/normalizers/request/next-data';
export default function Post({content,data}) {
  console.log(data);
  console.log(content);
  const [metaTitle] = useState(content?.page?.metaTitle)
    const [metaDescription] = useState(content?.page?.metaDescription)
    const [banners] = useState(content?.page?.banners)
    const [title] = useState(content?.page?.title)
    const [video] = useState(content?.page?.video)
    const [cardsValues] = useState(content?.page?.companyValues)
    const [description] = useState(content?.page?.contentDescription)
  
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template,  
    menuName: "header",
    itemTemplateName:"default",
    templateName: "header"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template,  
    menuName: "partners",
    itemTemplateName:"default",
    templateName: "footer"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template,  
    menuName: "products",
    itemTemplateName:"default",
    templateName: "footer"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template,  
    menuName: "company",
    itemTemplateName:"default",
    templateName: "footer"
  })
   
  return (
    <Templates template={content?.template} page={content?.page}>
    <Banner banners={banners} />
    <div className="max-w-3xl mx-auto py-8">
    <h1 className="text-3xl font-bold mb-4">{data?.title.rendered}</h1>
    <p className="text-gray-600 mb-4">{data?.date}</p>
    <img src={data?.yoast_head_json.og_image[0].url} alt={NextDataPathnameNormalizer.image?.alt} className="mb-2" />
    <div className="prose">
      {/* Conteúdo do post em formato de Markdown */}
      {data?.content.rendered}
    </div>
    <div className="mt-8">
      <Link href="/" className="text-blue-500 hover:underline">Voltar para a página inicial</Link>
    </div>
  </div>
  </Templates>
  )
}

async function getDataPage(){
  try{
  await connectMongoDB();

  const page = await Page.findOne({label:"blog"}).lean();
  const menu = await Menu.findOne({label:"menu"}).lean();
  const template = await Template.find();
  const partners = await SchemaCategories.findOne({label:"partners"}).lean();
  const categories = await CategoriesProducts.find().lean();
  // const products = await ProductsDb.find().lean().limit(6);
  const form = await FormDb.findOne({label: "form"}).lean();


  return {
    page:JSON.parse(JSON.stringify(page)),
    partners:JSON.parse(JSON.stringify(partners)),
    categories:JSON.parse(JSON.stringify(categories)),
    form:JSON.parse(JSON.stringify(form)),
    template:JSON.parse(JSON.stringify(template)),
    menu:JSON.parse(JSON.stringify(menu))
  }
  }
  finally{
    disconnectMongoDB();
  }
}



export const getServerSideProps  = async (context) => {
  try {
    const postId = context.resolvedUrl.split('/')
    const content = await getDataPage();
    const response = await fetch(`https://irbauto.com.br/wp-json/wp/v2/posts/${postId[2]}`);
    const data = await response.json();
    return {
      props: {
        content,
        data
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
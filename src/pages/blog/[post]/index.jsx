// Database // Schema
// Template / Layout
import Templates from '@/components/Templates'
import Title from '@/components/Title';
import Banner from "@/components/Banner/index";

import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menus} from '@/service/model/schemas/menusSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories as SchemaCategories} from '@/service/model/schemas/categoriesSchema'
import {CategoriesProducts} from '@/service/model/schemas/categoriesProductsSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Form as FormDb} from '@/service/model/schemas/formsSchema'
import { Posts } from '@/service/model/schemas/postsSchema';

// pages
import Error from '@/components/Pages/Error'
import Singlepost from '@/components/Pages/Singlepost'

import { useState } from 'react'
import Link from 'next/link';

import { insertMenuInTemplate } from '@/utils/functions'
import { NextDataPathnameNormalizer } from 'next/dist/server/future/normalizers/request/next-data';
import BreadCrumb from '@/components/BreadCrumb';

export default function Post({content}) {
    const [metaTitle] = useState(content?.page?.metaTitle)
    const [metaDescription] = useState(content?.page?.metaDescription)
    const [banners] = useState(content?.page?.banners)
    const [title] = useState(content?.page?.title)
    const [video] = useState(content?.page?.video)
    const [cardsValues] = useState(content?.page?.companyValues)
    const [description] = useState(content?.page?.contentDescription)
    const [posts, setPosts] = useState(content?.posts);
  
 
  return (
    <>
       {content?.type === 'singlepost' && (
        <>
          <Singlepost content={content}/>
   
        </>
        )}

       {content?.type === 'error' && (
        <>
          <Error content={content}/>
   
        </>
        )}
    </>
  )
}

const routeError = async (error) => {
  const template = await Template.find();
  // const menu = await Menu.findOne({label:"menu"}).lean();
  const menus = await Menus.find().lean();
  return {
    type: 'error',
    page:JSON.parse(JSON.stringify(error)),
    template: template && JSON.parse(JSON.stringify(template)),
    menus: menus && JSON.parse(JSON.stringify(menus)),
  }
}

const singlePost = async (posts) => {
  const page = await Page.findOne({label:"blog"}).lean();
  const menus = await Menus.find().lean();
  const template = await Template.find();
  const partners = await SchemaCategories.findOne({label:"partners"}).lean();
  const categories = await CategoriesProducts.find().lean();
  // const products = await ProductsDb.find().lean().limit(6);
  const form = await FormDb.findOne({label: "form"}).lean();
  


  return {
    type: "singlepost",
    page:JSON.parse(JSON.stringify(page)),
    partners:JSON.parse(JSON.stringify(partners)),
    categories:JSON.parse(JSON.stringify(categories)),
    form:JSON.parse(JSON.stringify(form)),
    template:JSON.parse(JSON.stringify(template)),
    menus:JSON.parse(JSON.stringify(menus)),
    posts:JSON.parse(JSON.stringify(posts))
  }
}

async function getDataPage(arrRoute){
  try{
  await connectMongoDB();

  const posts = await Posts.findOne({permaLink:arrRoute[1]}).lean()
  if(posts) return await singlePost(posts)

  const  error = await Page.findOne({label:'error'}).lean();
  if(error) return await routeError(error);


  }
  finally{
    disconnectMongoDB();
  }
}



export const getServerSideProps  = async (context) => {
  try {
    const arrRoute = context.resolvedUrl.replace('/', '').split('/');
    const content = await getDataPage(arrRoute);
    // const response = await fetch(`https://clientes.agenciawbp.com/irb/wordpress/wp-json/wp/v2/posts/${postId[2]}`);
    // const data = await response.json();
    return {
      props: {
        content
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
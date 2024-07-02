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
import BreadCrumb from '@/components/BreadCrumb';

import { useState } from 'react'
import Link from 'next/link';


export default function singlePost({content}) {
    const [metaTitle] = useState(content?.page?.metaTitle)
      const [metaDescription] = useState(content?.page?.metaDescription)
      const [banners] = useState(content?.page?.banners)
      const [title] = useState(content?.page?.title)
      const [video] = useState(content?.page?.video)
      const [cardsValues] = useState(content?.page?.companyValues)
      const [description] = useState(content?.page?.contentDescription)
      const [posts, setPosts] = useState(content?.posts);


  return (
    <Templates template={content?.template} page={content?.page} menus={content?.menus}>
    <Banner banners={banners} />
    <BreadCrumb/>
    <div className="max-w-7xl md:mx-auto mx-2 py-8 ">
    <h1 className="text-3xl font-bold mb-4">{posts?.title}</h1>
    <p className="text-gray-600 mb-4">{posts?._createdAt.split('T')[0]}</p>
    {/* <img src={posts?.featuredImg?.url} alt={posts?.featuredImg?.alt} className="mb-2 m-auto w-3/4 h-[500px] object-cover" /> */}
    <div className="prose overflow-hidden" dangerouslySetInnerHTML={{ __html: posts.contentHTML}}>
      {/* Conteúdo do post em formato de Markdown */}
      {/* {data?.content.rendered} */}
    </div>
    <div className="mt-8">
      <Link href="/blog" className="text-blue-500 hover:underline">Voltar para Blog</Link>
    </div>
  </div>
  </Templates>
  )
}

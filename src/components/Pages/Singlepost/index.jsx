/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Templates from '@/components/Templates'
import Title from '@/components/Title'
import Banner from '@/components/Banner/index'

import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menus } from '@/service/model/schemas/menusSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Categories as SchemaCategories } from '@/service/model/schemas/categoriesSchema'
import { CategoriesProducts } from '@/service/model/schemas/categoriesProductsSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'
import { Form as FormDb } from '@/service/model/schemas/formsSchema'
import { Posts } from '@/service/model/schemas/postsSchema'
import BreadCrumb from '@/components/BreadCrumb'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sanitizeHtml } from '@/utils/functions'

export default function singlePost({ content }) {
  const { banners } = content?.page || {}
  const { posts } = content || {}
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    if (posts) {
      setSanitizedContent(sanitizeHtml(posts.contentHTML))
    }
  }, [posts])

  return (
    <Templates
      template={content?.template}
      page={content?.page}
      menus={content?.menus}
    >
      <Banner banners={banners} />
      <BreadCrumb />
      <div className="mx-3.5 max-w-7xl py-8 md:mx-auto">
        <h1 className="mb-4 text-3xl font-bold">{posts?.title}</h1>
        <p className="mb-4 text-gray-600">{posts?._createdAt.split('T')[0]}</p>
        <div
          className="prose overflow-hidden"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></div>
        <div className="mt-8">
          <Link href="/blog" className="text-blue-500 hover:underline">
            Voltar para Blog
          </Link>
        </div>
      </div>
    </Templates>
  )
}

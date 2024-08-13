/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'

export default function singlePost({ content }) {
  const { banners } = content?.page || {}
  const { posts } = content || {}
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    if (posts) {
      setSanitizedContent(posts.contentHTML)
    }
  }, [posts])

  return (
    <>
      <Head>
        <title>{posts.metaTitle}</title>
        <meta name="description" content={posts.metaDescription} />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={banners} />
        <BreadCrumb />
        <div className="max-w-7xl px-3.5 py-8 md:mx-auto">
          <h1 className="mb-4 text-3xl font-bold">{posts?.title}</h1>
          <p className="mb-4 text-gray-600">
            {posts?._createdAt.split('T')[0]}
          </p>
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
    </>
  )
}

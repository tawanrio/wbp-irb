/* eslint-disable react-hooks/rules-of-hooks */
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'

import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { sanitizeHtml } from '@/utils/functions'

export default function singlePost({ content }) {
  const { title, metaTitle, metaDescription, contentDescription, banners } =
    content?.page || {}
  const { posts } = content || {}
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    if (posts) {
      setSanitizedContent(sanitizeHtml(posts.contentHTML))
    }
  }, [posts])

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta
          name="description"
          content={metaDescription || contentDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={banners} />
        <BreadCrumb />
        <div className="mx-3.5 max-w-7xl py-8 md:mx-auto">
          <h1 className="mb-4 text-3xl font-bold">{posts?.title}</h1>
          <p className="mb-4 text-gray-600">
            {posts?._createdAt.split('T')[0]}
          </p>
          <div
            className="prose mb-8 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Voltar para Blog
          </Link>
        </div>
      </Templates>
    </>
  )
}

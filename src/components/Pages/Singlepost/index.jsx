/* eslint-disable react-hooks/rules-of-hooks */
<<<<<<< HEAD
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'

=======
>>>>>>> cebbf8383e6ea4de98fda536d1e7e312aed202e5
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'

export default function singlePost({ content }) {
  const { title, metaTitle, metaDescription, contentDescription, banners } =
    content?.page || {}
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
<<<<<<< HEAD
        <title>{metaTitle || title}</title>
        <meta
          name="description"
          content={metaDescription || contentDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
=======
        <title>{posts.metaTitle}</title>
        <meta name="description" content={posts.metaDescription} />
>>>>>>> cebbf8383e6ea4de98fda536d1e7e312aed202e5
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={banners} />
        <BreadCrumb />
<<<<<<< HEAD
        <div className="mx-3.5 max-w-7xl py-8 md:mx-auto">
=======
        <div className="max-w-7xl px-3.5 py-8 md:mx-auto">
>>>>>>> cebbf8383e6ea4de98fda536d1e7e312aed202e5
          <h1 className="mb-4 text-3xl font-bold">{posts?.title}</h1>
          <p className="mb-4 text-gray-600">
            {posts?._createdAt.split('T')[0]}
          </p>
          <div
<<<<<<< HEAD
            className="prose mb-8 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Voltar para Blog
          </Link>
=======
            className="prose overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
          <div className="mt-8">
            <Link href="/blog" className="text-blue-500 hover:underline">
              Voltar para Blog
            </Link>
          </div>
>>>>>>> cebbf8383e6ea4de98fda536d1e7e312aed202e5
        </div>
      </Templates>
    </>
  )
}

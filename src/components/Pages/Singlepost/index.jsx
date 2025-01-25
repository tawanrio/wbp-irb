// Components
import Templates from '@/components/Templates'
import { Title } from './components/Title'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SinglePost({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')
  const [sanitizedContent, setSanitizedContent] = useState('')

  const { template, page, posts, menus } = content || {}
  const {
    components: { title: titleComponent },
    backgroundImages,
    label,
  } = page || {}

  const arrHeader = template.find((item) => item.label === 'header')
  const header = arrHeader.items.find((item) => item.label === 'redesign-home')
  const footer = template.find((item) => item.label === 'footer')
  const copyright = template.find((item) => item.label === 'copyright')

  useEffect(() => {
    if (posts) {
      setSanitizedContent(posts.contentHTML)
    }
  }, [posts])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>{posts.metaTitle}</title>
        <meta name="description" content={posts.metaDescription} />
        <link rel="canonical" href={fullUrl} />
      </Head>
      <Templates template={template} page={page} menus={menus}>
        <BackgroundImageFirst backgrounds={backgroundImages}>
          <Header content={header} page={label} />
          <Title title={titleComponent} />
        </BackgroundImageFirst>
        <div className="max-w-7xl px-5 py-12 md:mx-auto">
          <h1 className="mb-4 text-3xl font-bold">{posts?.title}</h1>
          <p className="mb-4 text-gray-600">
            {posts?._createdAt.split('T')[0]}
          </p>
          <div
            className="custom-link-container prose overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
          <div className="mt-8 w-fit cursor-pointer rounded-xl bg-[#22326E] px-5 py-2 transition-all duration-200 hover:scale-95">
            <Link href="/blog" className="text-white">
              Voltar para Blog
            </Link>
          </div>
        </div>
        <BackgroundImageLast backgrounds={backgroundImages}>
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}

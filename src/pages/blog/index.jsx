// Template / Layout
import Templates from '@/components/Templates'

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menus } from '@/service/model/schemas/menusSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Categories as SchemaCategories } from '@/service/model/schemas/categoriesSchema'
import { CategoriesProducts } from '@/service/model/schemas/categoriesProductsSchema'
import { Form as FormDb } from '@/service/model/schemas/formsSchema'
import { Posts } from '@/service/model/schemas/postsSchema'

// Components
import { Title } from './components/Title'
import { ListBlogs } from './components/ListBlogs'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others || functions
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { sanitizeHtml } from '@/utils/functions'

export default function Blog({ content }) {
  const [posts, setPosts] = useState(content?.posts)
  const [isLoading, setIsLoading] = useState(true)
  const [fullUrl, setFullUrl] = useState('')

  const {
    metaTitle,
    metaDescription,
    title,
    contentDescription: description,
    components: { title: titleComponent, surtitle },
  } = content?.page || {}

  const route = useRouter()
  const { page = 1 } = route.query
  const currentPage = parseInt(page, 10)
  const postsPerPage = 6
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const arrHeader = content?.template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )
  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
  )

  useEffect(() => {
    if (content?.posts) {
      const sanitizedPosts = content.posts.map((post) => ({
        ...post,
        contentHTML: sanitizeHtml(post.contentHTML),
      }))
      setPosts(sanitizedPosts)
    }
  }, [content])

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      const res = await fetch(`/api/getPosts?page=${currentPage}`)
      const data = await res.json()
      setPosts(data.posts)
      setIsLoading(false)
    }

    fetchPosts()
  }, [currentPage])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
  }, [route])

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <link rel="canonical" href={fullUrl} />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <Title title={titleComponent} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <ListBlogs
            posts={currentPosts}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            surtitle={surtitle}
          />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}

async function getDataPage() {
  try {
    await connectMongoDB()

    const page = await Page.findOne({ label: 'blog' }).lean()
    const menus = await Menus.find().lean()
    const template = await Template.find()
    const partners = await SchemaCategories.findOne({
      label: 'partners',
    }).lean()
    const categories = await CategoriesProducts.find().lean()
    const form = await FormDb.findOne({ label: 'form' }).lean()
    const posts = await Posts.find().lean().sort({ postId: -1 })

    return {
      page: JSON.parse(JSON.stringify(page)),
      partners: JSON.parse(JSON.stringify(partners)),
      categories: JSON.parse(JSON.stringify(categories)),
      form: JSON.parse(JSON.stringify(form)),
      template: JSON.parse(JSON.stringify(template)),
      menus: JSON.parse(JSON.stringify(menus)),
      posts: JSON.parse(JSON.stringify(posts)),
    }
  } finally {
    disconnectMongoDB()
  }
}

export async function getStaticProps() {
  const content = await getDataPage()
  const data = {}

  return {
    props: {
      content,
      data,
    },
    revalidate: 2,
  }
}

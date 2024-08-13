// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'

// Components
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'
import { formatStrToDash, sanitizeHtml } from '@/utils/functions'

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menus } from '@/service/model/schemas/menusSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Categories as SchemaCategories } from '@/service/model/schemas/categoriesSchema'
import { CategoriesProducts } from '@/service/model/schemas/categoriesProductsSchema'
import { Form as FormDb } from '@/service/model/schemas/formsSchema'
import { Posts } from '@/service/model/schemas/postsSchema'

// Others || functions
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utils/cn'

export default function Blog({ content }) {
  const [posts, setPosts] = useState(content?.posts)
  const [isLoading, setIsLoading] = useState(true)

  const {
    metaTitle,
    metaDescription,
    banners,
    title,
    contentDescription: description,
  } = content?.page || {}

  const router = useRouter()
  const { page = 1 } = router.query
  const currentPage = parseInt(page, 10)
  const postsPerPage = 6
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const handlePageChange = (pageNumber) => {
    router.push(`/blog?page=${pageNumber}`)
  }

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / 3) * 3
    return new Array(Math.min(3, totalPages - start))
      .fill()
      .map((_, idx) => start + idx + 1)
  }

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

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={banners} />
        <BreadCrumb />
        <div className="mx-3.5 max-w-6xl py-8 md:mx-auto">
          <h1 className="mb-4 text-3xl font-bold md:pl-3">Publicações</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:px-3 lg:grid-cols-3">
            {currentPosts.map((post, key) => (
              <Link
                key={key}
                href={`/blog/${post.permaLink || formatStrToDash(post.title)}`}
              >
                <div className="flex h-full cursor-pointer flex-col justify-between border p-4 hover:bg-gray-100">
                  <div>
                    <h2 className="mb-2 h-20 overflow-hidden text-xl font-semibold">
                      {post.title}
                    </h2>
                    <Image
                      src={post.featuredImg?.url}
                      alt={post.featuredImg?.alt}
                      width={327}
                      height={208}
                      priority
                      quality={100}
                      onLoad={() => setIsLoading(false)}
                      className={cn(
                        'mb-2 h-52 w-full object-cover transition-[scale,filter] duration-700',
                        isLoading && 'scale-[1.02] blur-xl grayscale',
                      )}
                    />
                    <p className="text-gray-700">{`${post.contentHTML.slice(0, 120)}...`}</p>
                  </div>
                  <p
                    className="text-blue-600 hover:underline"
                    href={`/blog/${post.permaLink}`}
                  >
                    Leia mais
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <ul className="mt-4 flex justify-center">
            {currentPage > 3 && (
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="mx-1 rounded bg-gray-200 px-3 py-1 text-gray-700"
                >
                  &lt;
                </button>
              </li>
            )}
            {getPaginationGroup().map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePageChange(pageNumber)}
                  className={`mx-1 rounded px-3 py-1 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            {currentPage <= totalPages && (
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="mx-1 rounded bg-gray-200 px-3 py-1 text-gray-700"
                >
                  &gt;
                </button>
              </li>
            )}
          </ul>
        </div>
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
    const posts = await Posts.find().lean()

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

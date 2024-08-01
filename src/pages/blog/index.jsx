/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Title from '@/components/Title'

// Components
import Banner from '@/components/Banner/index'
import ContentDescription from '@/components/ContentDescription'
import InsertVideo from '@/components/InsertVideo'
import Partners from '@/components/Partners'
import Form from '@/components/Form'
import CompanyValues from '@/components/CompanyValues'
import Categories from '@/components/Categories'
import BreadCrumb from '@/components/BreadCrumb'
import TextVideo from '@/components/TextVideo'
import { formatStrToDash } from '@/utils/functions'

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menus } from '@/service/model/schemas/menusSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Categories as SchemaCategories } from '@/service/model/schemas/categoriesSchema'
import { CategoriesProducts } from '@/service/model/schemas/categoriesProductsSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'
import { Form as FormDb } from '@/service/model/schemas/formsSchema'
import { Posts } from '@/service/model/schemas/postsSchema'

// Others || functions
import { useState } from 'react'
import { useRouter } from 'next/router'
import Utilities from '@/components/Utilities'
import Link from 'next/link'

export default function Blog({ content, data }) {
  console.log(content)

  const [metaTitle] = useState(content?.page?.metaTitle)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [banners] = useState(content?.page?.banners)
  const [title] = useState(content?.page?.title)
  const [video] = useState(content?.page?.video)
  const [cardsValues] = useState(content?.page?.companyValues)
  const [description] = useState(content?.page?.contentDescription)
  const [formDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'default'),
  )
  const [posts, setPosts] = useState(content?.posts)

  const router = useRouter()
  const { page = 1 } = router.query // Default page to 1 if not specified
  const currentPage = parseInt(page, 10)
  const postsPerPage = 6
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const totalPages = Math.ceil(posts.length / postsPerPage)

  const paginate = (pageNumber) => {
    router.push(`/blog?page=${pageNumber}`)
  }

  const getPaginationGroup = () => {
    if (totalPages <= 3) {
      return new Array(totalPages).fill().map((_, idx) => idx + 1)
    }

    if (currentPage === 1) {
      return [1, 2, 3]
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages]
    }

    return [currentPage - 1, currentPage, currentPage + 1]
  }
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
          <h1 className="mb-4 text-3xl font-bold">Publicações</h1>
          <div className="flex flex-wrap gap-4 md:grid md:grid-cols-3">
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
                    <img
                      src={post.featuredImg?.url}
                      alt={post.featuredImg?.alt}
                      className="mb-2 h-52 w-full object-cover"
                    />
                    <p
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: `${post.contentHTML.slice(0, 120)}...`,
                      }}
                    ></p>
                  </div>
                  <div className="mt-auto">
                    <Link
                      className="text-blue-500 hover:underline"
                      href={`/blog/${post.permaLink}`}
                    >
                      Leia mais
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <ul className="mt-4 flex justify-center">
            {currentPage > 3 && (
              <li>
                <button
                  onClick={() => paginate(currentPage - 3)}
                  className="mx-1 rounded bg-blue-500 px-3 py-1 text-white"
                >
                  &lt;
                </button>
              </li>
            )}
            {getPaginationGroup().map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`mx-1 rounded px-3 py-1 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            {currentPage + 3 <= totalPages && (
              <li>
                <button
                  onClick={() => paginate(currentPage + 3)}
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

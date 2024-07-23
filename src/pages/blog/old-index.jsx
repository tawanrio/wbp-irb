/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */

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

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menus } from '@/service/model/schemas/menusSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Categories as SchemaCategories } from '@/service/model/schemas/categoriesSchema'
import { CategoriesProducts } from '@/service/model/schemas/categoriesProductsSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'
import { Form as FormDb } from '@/service/model/schemas/formsSchema'

// Others || functions
import { useState } from 'react'

import Utilities from '@/components/Utilities'
import Link from 'next/link'

export default function QuemSomos({ content, data }) {
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

  const [posts, setPosts] = useState(data)

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const getUrlImage = (post) => {
    let urlImageDest = '/images/components/others/not-found.jpg'
    if (post?.yoast_head_json?.og_image) {
      urlImageDest = post?.yoast_head_json.og_image[0]?.url
    }
    return urlImageDest
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
        <div className="mx-2 max-w-6xl py-8 md:mx-auto">
          <h1 className="mb-4 text-3xl font-bold">Publicações</h1>
          <div className="flex flex-wrap gap-4 md:grid md:grid-cols-3">
            {currentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="flex h-full cursor-pointer flex-col justify-between border p-4 hover:bg-gray-100">
                  <div>
                    <h2 className="mb-2 h-20 overflow-hidden text-xl font-semibold">
                      {post.title.rendered}
                    </h2>

                    <img
                      src={getUrlImage(post)}
                      alt={post.image?.alt}
                      className="mb-2 h-52 w-full object-cover"
                    />
                    <p
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: `${post.content.rendered.slice(0, 120)}...`,
                      }}
                    ></p>
                    {/* <p className="text-gray-700">{post.content.rendered.slice(0, 100)}...</p> */}
                  </div>
                  <div className="mt-auto">
                    <Link
                      className="text-blue-500 hover:underline"
                      href={`/blog/${post.id}`}
                    >
                      Leia mais
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <ul className="mt-4 flex justify-center">
            {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(
              (number) => (
                <li key={number}>
                  <button
                    onClick={() => paginate(number + 1)}
                    className="mx-1 rounded bg-blue-500 px-3 py-1 text-white"
                  >
                    {number + 1}
                  </button>
                </li>
              ),
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
    // const products = await ProductsDb.find().lean().limit(6);
    const form = await FormDb.findOne({ label: 'form' }).lean()

    return {
      page: JSON.parse(JSON.stringify(page)),
      partners: JSON.parse(JSON.stringify(partners)),
      categories: JSON.parse(JSON.stringify(categories)),
      form: JSON.parse(JSON.stringify(form)),
      template: JSON.parse(JSON.stringify(template)),
      menus: JSON.parse(JSON.stringify(menus)),
    }
  } finally {
    disconnectMongoDB()
  }
}

// export async function getStaticPaths() {
//   // Busque os caminhos possíveis para pré-renderizar
//   // Por exemplo, de um banco de dados ou API

//   return {
//     paths: [],
//     fallback: false, // ou true ou 'blocking' se necessário
//   };
// }

export async function getStaticProps() {
  const content = await getDataPage()
  const response = await fetch(
    'https://clientes.agenciawbp.com/irb/wordpress/wp-json/wp/v2/posts?per_page=100',
  )
  const data = await response.json()

  return {
    props: {
      content,
      data,
    },
    revalidate: 2,
  }
}

// export const getServerSideProps  = async () => {
//   try {
//     const content = await getDataPage();
//     const response = await fetch('https://irbauto.com.br/wp-json/wp/v2/posts');
//     const data = await response.json();
//     return {
//       props: {
//         content,
//         data
//       }
//     };

//   } catch (error) {
//     console.error('Erro na página:', error);

//     return {
//       props: {
//         content: null
//       },
//     };
//   }
// };

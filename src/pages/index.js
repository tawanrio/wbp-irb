import Home from '@/components/Pages/Home'
import HomeEn from '@/components/Pages/Home/en.jsx'

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menus } from '@/service/model/schemas/menusSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Categories as SchemaCategories } from '@/service/model/schemas/categoriesSchema'
import { CategoriesProducts } from '@/service/model/schemas/categoriesProductsSchema'
import { Posts } from '@/service/model/schemas/postsSchema'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Form as FormDb } from '@/service/model/schemas/formsSchema'

export default function index({ content, locale }) {
  console.log(content)

  return (
    <>
      {locale !== 'pt' ? (
        <HomeEn content={content} />
      ) : (
        <Home content={content} />
      )}
    </>
  )
}

async function getDataPage({ locale }) {
  try {
    await connectMongoDB(locale)

    const page = await Page.findOne({ label: 'home' }).lean()
    // const menu = await Menu.findOne({label:"menu"}).lean();
    const menus = await Menus.find().lean()
    const template = await Template.find()
    const partners = await SchemaCategories.findOne({
      label: 'partners',
    }).lean()
    const categories = await CategoriesProducts.find().lean()
    // const products = await ProductsDb.find().lean().limit(6);
    const form = await FormDb.findOne({ label: 'form' }).lean()
    const post = await Posts.find({}).lean()

    return {
      page: JSON.parse(JSON.stringify(page)),
      partners: JSON.parse(JSON.stringify(partners)),
      categories: JSON.parse(JSON.stringify(categories)),
      form: JSON.parse(JSON.stringify(form)),
      template: JSON.parse(JSON.stringify(template)),
      blogData: JSON.parse(JSON.stringify(post)),
      // menu:JSON.parse(JSON.stringify(menu)),
      menus: JSON.parse(JSON.stringify(menus)),
    }
  } finally {
    disconnectMongoDB()
  }
}

// export async function getStaticProps({ locale }) {
//   const content = await getDataPage({ locale })
//   const response = await fetch(
//     'https://clientes.agenciawbp.com/irb/wordpress/wp-json/wp/v2/posts',
//   )
//   content.blogData = await response.json()
//   // const content = await testeRoute(resolvedUrl)

//   return {
//     props: {
//       content,
//       locale,
//     },
//     revalidate: 3600,
//   }
// }

export const getServerSideProps = async (context) => {
  try {
    const content = await getDataPage({ locale: context.locale })
    // const response = await fetch(
    //   'https://clientes.agenciawbp.com/irb/wordpress/wp-json/wp/v2/posts',
    // )
    // content.blogData = await response.json()

    return {
      props: {
        content,
        locale: context.locale,
      },
    }
  } catch (error) {
    console.error('Erro na página:', error)

    return {
      props: {
        content: null,
      },
    }
  }
}

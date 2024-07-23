import Error from '@/components/Pages/Error'
import { connectMongoDB, disconnectMongoDB } from '@/service/db'

// Schema
import Page from '@/service/model/schemas/pageSchema'
import { Menus } from '@/service/model/schemas/menusSchema'
import { Template } from '@/service/model/schemas/templateSchema'

export default function Index({ content }) {
  console.log(content)
  return (
    <>
      {content?.type === 'error' && (
        <>
          <Error content={content} />
        </>
      )}
    </>
  )
}

const routeError = async () => {
  const template = await Template.find()
  const menus = await Menus.find().lean()
  const error = await Page.findOne({ label: 'error' }).lean()
  return {
    type: 'error',
    page: JSON.parse(JSON.stringify(error)),
    template: template && JSON.parse(JSON.stringify(template)),
    menus: menus && JSON.parse(JSON.stringify(menus)),
  }
}
const getData404 = async () => {
  try {
    await connectMongoDB()
    return await routeError()
  } finally {
    disconnectMongoDB()
  }
}

export const getStaticProps = async () => {
  const content = await getData404()

  return {
    props: {
      content,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose from 'mongoose'
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import { Posts } from '@/service/model/schemas/postsSchema'
import { formatStrToDash } from '@/utils/functions'

export default function UpdatePost({ content }) {
  // Aqui você pode adicionar a lógica de renderização se precisar
  return (
    <>
      {content.type === 'error' && <div>não autenticado</div>}
      {content.type !== 'error' && <div>ok</div>}
      {content.message}
    </>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const { auth } = context.query
    if (auth !== '2024irbdev') throw new Error('Autenticação falhou')

    await connectMongoDB()

    let page = 1
    let totalPages = 1
    let allPosts = []

    do {
      const response = await fetch(
        `https://clientes.agenciawbp.com/irb/wordpress/wp-json/wp/v2/posts?per_page=30&page=${page}`,
      )
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API')
      }

      const data = await response.json()
      allPosts = allPosts.concat(data)
      totalPages = parseInt(response.headers.get('x-wp-totalpages'), 10)

      page += 1
    } while (page <= totalPages)

    // Apaga todos os posts existentes antes de recriar
    await Posts.deleteMany({})
    console.log('Coleção de Posts apagada.')

    // Itera sobre todos os posts e os insere novamente
    for (const post of allPosts) {
      await Posts.create({
        postId: post.id,
        title: post.title.rendered,
        metaTitle: post.yoast_head_json.og_title,
        category: '',
        faq: [],
        metaDescription: post.yoast_head_json.og_description,
        featuredImg: {
          url: post.yoast_head_json.og_image[0]?.url,
          alt: post.title.rendered,
        },
        permaLink: formatStrToDash(post.title.rendered),
        contentHTML: post.content.rendered,
        enable: true,
        trash: false,
        _createdAt: new Date(post.date).toISOString(),
        _updatedAt: new Date(post.modified).toISOString(),
        // Adicione outros campos necessários
      })
      console.log(`Post ${post.id} inserido.`)
    }

    return {
      props: {
        content: {
          type: 'success',
          data: allPosts,
          message: null,
        },
      },
    }
  } catch (error) {
    console.log('Erro na página:', error)

    return {
      props: {
        content: {
          type: 'error',
          message: error.message,
        },
      },
    }
  } finally {
    await disconnectMongoDB()
  }
}

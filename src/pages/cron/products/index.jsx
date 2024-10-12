import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import { Products } from '@/service/model/schemas/productsSchema'
import { formatStrToDash } from '@/utils/functions'

// Função para adicionar um delay entre as requisições
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function UpdatePost({ content }) {
  return (
    <>
      {content.type === 'error' && <div>não autenticado</div>}
      {content.type !== 'error' && <div>ok</div>}
      {content.message}
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    // const { auth } = context.query
    // if (auth !== '2024irbdev') throw new Error('Autenticação falhou')

    await connectMongoDB('pt')

    let page = 1
    const perPage = 100
    let totalPages = 1
    let allProducts = []

    do {
      const response = await fetch(
        `https://clientes.agenciawbp.com/irb/wordpress/wp-json/wp/v2/product?per_page=${perPage}&page=${page}`,
      )
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API')
      }

      const data = await response.json()
      allProducts = allProducts.concat(data)
      totalPages = parseInt(response.headers.get('x-wp-totalpages'), 10)

      page += 1

      // Adiciona um delay para evitar bloqueios da API
      await sleep(1000)
    } while (page <= totalPages)

    // Obtenha os IDs de todos os Produtos recuperados do WordPress
    const productId = allProducts.map((product) => product.id)

    // Itera sobre todos os Produtos e insere ou atualiza de forma paralela
    await Promise.all(
      allProducts.map(async (product) => {
        const metaTitle =
          product.yoast_head_json?.og_title || 'Produto Automotivo IRB'
        const metaDescription = product.yoast_head_json?.og_description || ''
        const category = getCategoryFromTitle(product.title.rendered)

        const thumbnailUrl = getImageUrlFromCategory(category)

        await Products.findOneAndUpdate(
          { productId: product.id }, // Filtro
          {
            productId: product.id,
            title: product.title.rendered,
            metaTitle,
            category,
            label: product.slug,
            faq: [],
            metaDescription,
            thumbnail: {
              url: thumbnailUrl,
              alt: product.title.rendered,
            },
            permaLink: formatStrToDash(product.title.rendered),
            contentDescription: product.excerpt.rendered,
            enable: true,
            trash: false,
            _createdAt: new Date().toISOString(),
            _updatedAt: new Date().toISOString(),
          },
          { upsert: true, new: true }, // Opções: `upsert` cria ou atualiza, `new` retorna o documento atualizado
        )
        console.log(
          `Post ${product.id} - ${product.title.rendered} - ${category} inserido/atualizado.`,
        )
      }),
    )

    // Remove os Produtos do banco de dados que não estão mais no WordPress
    await Products.deleteMany({ productId: { $nin: productId } })
    console.log('Produtos obsoletos removidos.')

    return {
      props: {
        content: {
          type: 'success',
          data: allProducts,
          message: 'Produtos atualizados com sucesso',
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

const getCategoryFromTitle = (title) => {
  const keywords = {
    rolamento: 'rolamentos',
    trizeta: 'trizetas',
    radiador: 'radiadores-e-intercoolers',
    intercooler: 'radiadores-e-intercoolers',
    cubo: 'cubos-de-rodas',
    6000: 'linha-6000',
    eletroventilador: 'eletroventiladores',
  }

  // Converte o título para minúsculas para fazer a verificação case-insensitive
  const lowerTitle = title.toLowerCase()

  // Itera sobre os keywords e verifica se o título contém a palavra
  for (const keyword in keywords) {
    if (lowerTitle.includes(keyword)) {
      return keywords[keyword] // Retorna a categoria correspondente
    }
  }

  return '' // Retorna uma string vazia caso nenhuma palavra seja encontrada
}

const getImageUrlFromCategory = (category) => {
  const categoryImageMap = {
    rolamentos: '/images/products/rolamento.png',
    trizetas: '/images/products/trizetas.png',
    'radiadores-e-intercoolers': '/images/products/radiador-e-intercooler.png',
    'cubos-de-rodas': '/images/products/roda.png',
    'linha-6000': '/images/products/linha-6000.png',
    eletroventiladores: '/images/products/eletroventilador.png',
  }

  return categoryImageMap[category] || '' // Retorna uma imagem padrão se a categoria não for encontrada
}

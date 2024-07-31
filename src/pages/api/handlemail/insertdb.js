import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import { getCurrentDateFormatted } from '@/utils/functions'
import { Collection } from '@/service/model/schemas/collectionsSchema'
import { partnerCollection } from './partnersCollection'

const insertDataIntoDB = async (data) => {
  const { inputs, uniqueId } = data

  const currentDateFormatted = getCurrentDateFormatted()
  const novoItem = new Collection(
    partnerCollection({ uniqueId, inputs, currentDateFormatted }),
  )

  await novoItem.save()
}

export default async function insertDb(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Ok' })
  } else if (req.method === 'POST') {
    const { formData } = req.body

    try {
      await connectMongoDB()
      await insertDataIntoDB(formData)

      res.status(200).json({ message: 'Dados salvos com sucesso', formData })
    } catch (error) {
      res.status(500).json({
        message:
          error.name === 'MongoServerError' && error.code === 11000
            ? 'Esse CPNJ já está sendo utilizado por um parceiro IRB.'
            : 'Erro ao inserir dados no banco de dados.',
      })
    } finally {
      await disconnectMongoDB()
    }
  }
}

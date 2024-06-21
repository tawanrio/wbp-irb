import { handleFileUpload } from './service/imageService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const imagePath = await handleFileUpload(req, res);

      // Aqui você pode adicionar código para inserir a referência `imagePath` no seu banco de dados

      res.status(200).json({status:200, message: 'File uploaded successfully', path: imagePath });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}

export const config = {
  api: {
    bodyParser: false, // Desativar o bodyParser padrão do Next.js
  },
};

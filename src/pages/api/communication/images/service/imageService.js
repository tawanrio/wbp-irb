// services/fileService.js

import multer from 'multer'
import sharp from 'sharp'
import heicConvert from 'heic-convert'
import { promises as fs } from 'fs'
import path from 'path'
import {
  formatStrToNoSpecialChars,
  getCurrentDateFormatted,
} from '@/utils/functions'
import { Medias } from '@/service/model/schemas/mediasSchema'
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type } from 'os'

// Função para criar diretórios se não existirem
const ensureDirExists = async (dir) => {
  try {
    await fs.access(dir)
  } catch (error) {
    await fs.mkdir(dir, { recursive: true })
  }
}

// Função para configurar armazenamento do multer
const createMulterStorage = () => {
  return multer.memoryStorage()
}

const storage = createMulterStorage()
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|heic|pdf/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    )

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(
        'Error: File upload only supports the following filetypes - ' +
          filetypes,
      )
    }
  },
})

// Função middleware para uso com Multer
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

// Função para converter HEIC para JPG
const convertHeicToJpg = async (buffer) => {
  const outputBuffer = await heicConvert({
    buffer,
    format: 'JPEG',
    quality: 1,
  })
  return outputBuffer
}

// Função para processar e salvar a imagem
const processAndSaveImage = async (
  buffer,
  originalName,
  origin = null,
  id = null,
) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const uploadDir = path.join(
    process.cwd(),
    'public',
    'uploads',
    year.toString(),
    month,
  )

  await ensureDirExists(uploadDir)

  const isHeic = originalName.toLowerCase().endsWith('.heic')
  let imageBuffer = buffer

  console.log(isHeic)

  if (isHeic) {
    imageBuffer = await convertHeicToJpg(buffer)
    originalName = originalName.replace(/\.heic$/i, '.jpg')
  }

  let fileModifiedName = `${Date.now().toString().slice(-4)}-${originalName}`
  fileModifiedName = id
    ? id + '-' + Date.now().toString().slice(-3) + '-' + originalName
    : fileModifiedName
  fileModifiedName = origin ? origin + '-' + fileModifiedName : fileModifiedName

  const filePath = path.join(uploadDir, fileModifiedName)
  const image = sharp(imageBuffer)

  // Obter metadata da imagem
  const metadata = await image.metadata()

  // Redimensionar e ajustar a qualidade se necessário
  if (
    metadata.size > 500 * 1024 ||
    metadata.width > 1200 ||
    metadata.height > 1200
  ) {
    await image
      .resize({
        width: metadata.width > 1200 ? 1200 : null,
        height: metadata.height > 1200 ? 1200 : null,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 })
      .toFile(filePath)
  } else {
    await fs.writeFile(filePath, imageBuffer)
  }

  const data = {
    path: path.join(
      '/uploads',
      year.toString(),
      month,
      path.basename(filePath),
    ),
    type: metadata.format,
  }
  return data
}

// Função para processar e salvar o PDF
const processAndSavePdf = async (buffer, originalName) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const uploadDir = path.join(
    process.cwd(),
    'public',
    'uploads',
    year.toString(),
    month,
  )

  await ensureDirExists(uploadDir)

  const filePath = path.join(uploadDir, `${Date.now()}-${originalName}`)
  await fs.writeFile(filePath, buffer)

  return path.join('/uploads', year.toString(), month, path.basename(filePath))
}

// Função para processar o upload de arquivos
const handleFileUpload = async (req, res) => {
  await runMiddleware(req, res, upload.single('file'))
  let { origin, id } = req.body
  id = formatStrToNoSpecialChars(id)

  const { buffer, originalname, mimetype } = req.file

  let fileData

  if (mimetype === 'application/pdf') {
    fileData = await processAndSavePdf(buffer, originalname, origin, id)
  } else {
    fileData = await processAndSaveImage(buffer, originalname, origin, id)
  }
  fileData.path = fileData.path.replaceAll('\\', '/')

  try {
    await connectMongoDB()

    const newMedia = new Medias({
      path: fileData.path,
      _createdAt: getCurrentDateFormatted(),
      origin,
      type: fileData.type,
    })

    await newMedia.save()
  } finally {
    await disconnectMongoDB()
  }

  return fileData.path
}

export const truncateFileName = (filename, maxLength = 25) => {
  if (filename.length <= maxLength) return filename

  const ext = filename.slice(filename.lastIndexOf('.'))
  const nameWithoutExt = filename.slice(0, filename.lastIndexOf('.'))
  const truncatedName = nameWithoutExt.slice(0, maxLength - ext.length)

  return truncatedName + ext
}

export {
  upload,
  handleFileUpload,
  runMiddleware,
  processAndSaveImage,
  processAndSavePdf,
}

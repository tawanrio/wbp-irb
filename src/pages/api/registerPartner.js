/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectMongoDB, disconnectMongoDB } from '@/service/db'
// import mongoose from 'mongoose';
import mongoose, { Schema } from 'mongoose' // Importar Schema de mongoose

import { Collection } from '@/service/model/schemas/collectionsSchema'
import { UsersModel } from '@/service/model/schemas/userSchema'

export default async function registerPartner(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Ok' })
  } else if (req.method === 'POST') {
    const { partnerType, partnerData, uniqueId } = req.body

    try {
      const data = {
        partnerType,
        info: partnerData.info,
        address: partnerData.address,
        uniqueId,
      }
      partnerData.requirements
        ? (data.requirements = partnerData.requirements)
        : null

      console.log(data)
      await insertDataIntoDB(data)

      res.status(200).json({ message: 'Dados salvos com sucesso' })
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
      res.status(500).json({ message: 'Erro ao salvar dados' })
    }
  }
}

function getCurrentDateFormatted() {
  const currentDate = new Date()

  // Extract year, month, day, hour, and minutes from the current date
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Add leading zero if necessary
  const day = String(currentDate.getDate()).padStart(2, '0') // Add leading zero if necessary
  const hour = String(currentDate.getHours()).padStart(2, '0') // Add leading zero if necessary
  const minutes = String(currentDate.getMinutes()).padStart(2, '0') // Add leading zero if necessary

  // Format the date in 'yyyy/mm/dd-hh-mm' format
  const formattedDate = `${year}/${month}/${day}-${hour}:${minutes}`

  return formattedDate
}

const insertDataIntoDB = async (data) => {
  const { info, address, partnerType, uniqueId, requirements } = data

  try {
    // Conectar-se ao banco de dados
    await connectMongoDB()
    console.log(data)

    // Inserir os dados na coleção

    const currentDateFormatted = getCurrentDateFormatted()

    const novoItem = new Collection({
      label: partnerType,
      enabled: false,
      idToValidationRegister: uniqueId,
      _createdAt: currentDateFormatted,
      _updatedAt: currentDateFormatted,
      requirements: requirements || null,
      cnpj: info.cnpj.replace(/\D/g, ''),
      tradingName: info.tradingName.toLowerCase().trim(),
      companyName: info.companyName,
      metaTitle: `IRB Automotive - Distribuidor - ${info.companyName}`,
      metaDescription: [
        info.companyName,
        info.tradingName,
        info.phone,
        `${address.street} - ${address.city} - ${address.state}`,
      ],
      category: 'partners',
      geo: {
        states: [
          {
            name: address.state,
          },
        ],
        cities: [
          {
            name: address.city,
          },
        ],
      },
      info: {
        phone: [
          {
            label: 'Telefone',
            number: `${info.phone.replace(/\D/g, '')}`,
            layout: {
              width: '100%',
              height: '70px',
              weight: '700',
              border: 'solid black 3px',
              colors: {
                bg: '#fff',
                text: '#000',
              },
            },
            alt: 'Icone Telefone',
            route: '/',
            icon: '/images/components/button/phone.png',
          },
          {
            label: 'Email',
            email: info.email,
          },
        ],
        address: [
          {
            street: address.street,
            number: address.number,
            city: address.city,
            state: address.state,
            countryCode: 'BR',
            country: 'Brasil',
            label: 'default',
            location:
              'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d58484.03925472226!2d-46.66658594944962!3d-23.63112842470943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x94ce5b1b31b2204d%3A0x70a824ccefd961ae!2sR.%20Rosa%20de%20Morais%2C%20149%20-%20Vila%20%C3%81gua%20Funda%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004155-000!3m2!1d-23.6312125!2d-46.6253861!5e0!3m2!1spt-BR!2sbr!4v1707271240335!5m2!1spt-BR!2sbr',
            maps: [
              {
                label: 'google',
                route: 'http://maps.app.goo.gl/nptLxSavsDFi6To29',
                icon: '/images/components/address/icon/maps.png',
                alt: 'Icone do Google Maps',
              },
              {
                label: 'waze',
                route:
                  'https://www.waze.com/en/live-map/directions/sao-paulo/sao-paulo?place=11453434.149',
                icon: '/images/components/address/icon/waze.png',
                alt: 'Icone do Google Maps',
              },
            ],
          },
        ],
      },
      banners: {
        colors: {
          bg: '#fff',
          text: '#fff',
          controllers: '#fff',
        },
        size: {
          height: 160,
        },
        carousel: [
          {
            title: 'AUTOPEÇAS PARCEIRAS IRB',
            description: '',
            url: '/images/pages/banners/products.jpg',
            alt: 'banner dois',
            position: 'start',
          },
        ],
      },
      products: [
        {
          label: 'rolamentos',
        },
        {
          label: 'radiadores-e-intercoolers',
        },
        {
          label: 'cubos-de-rodas',
        },
        {
          label: 'linha-6000',
        },
        {
          label: 'trizetas',
        },
        {
          label: 'eletroventiladores',
        },
      ],
      gallery: [
        {
          name: 'Imagem 1',
          url: '/images/components/others/image-not-found.jpg',
        },
        {
          name: 'Imagem 2',
          url: '/images/components/others/image-not-found.jpg',
        },
      ],
      logo: {
        url: '/images/components/others/image-not-found.jpg',
        alt: 'LOGO IRB automotive',
      },
      contentDescription: [
        'A IRB Automotive é uma empresa, de marca própria, que fornece peças automotivas para todo o Brasil. Com mais de 22 anos de atuação no segmento de reposição automotiva',
      ],
      catalog: [
        {
          label: 'product',
        },
        {
          label: 'services',
          collection: [
            {
              title: 'Troca de pneu',
              label: 'troca de pneu',
              image: '/caminho/da/imagem.png',
              description: ['description', 'descrição'],
            },
            {
              title: 'Manutenção',
              label: 'manutencao',
              image: '/caminho/da/imagem.png',
              description: ['description', 'descrição'],
            },
          ],
        },
      ],
    })

    // Salvar o novo item no banco de dados
    await novoItem.save()

    console.log('Dados inseridos na coleção com sucesso!')

    // Desconectar-se do banco de dados
    await disconnectMongoDB()
  } catch (error) {
    console.error('Erro ao inserir dados na coleção:', error)
    throw error // Rejeitar o erro para que possa ser capturado pelo código chamador
  }
}

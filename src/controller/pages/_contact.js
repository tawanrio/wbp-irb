import {base} from '../base'

export const contact = {
    title : 'Contato',
    metaTitle: 'IRB Automotive - Contato',
    metaDescription: [' Blablabla',' blablabla 2'],
   logoContact: {
    title: 'Mecânico / Autocenter',
    contentDescription : [
      'A IRB Automotive é uma empresa, de marca própria, que fornece peças automotivas para todo o Brasil. Com mais de 22 anos de atuação no segmento de reposição automotiva '
    ],
    
    logo : {
      url: '/images/header/logo.svg',
      alt: 'LOGO IRB automotive',
      route: '/'
    },
    button :{
      phone: {
        title: 'Telefone',
        number: '1198537-3835',
        route: '',
        font :{
          width: '100%',
          height: '70px',
          weight: '700',
          border: 'solid black 3px',
          colors: {
            bg: '#fff',
            text: '#000'
          },
        },
        icon: {
          url: '/images/components/button/phone.png',
          alt:'Icone Telefone'
        }
      },
      whatsapp: {
        title: 'WhatsApp',
        number: '1198537-3835',
        route: '#whats',
        font :{
          width: '100%',
          height: '70px',
          weight: '700',
          border: 'solid black 3px',
          colors: {
            bg: '#61C25F',
            text: '#000'
          },
        },
        icon: {
          url: '/images/components/button/whatsapp.png',
          alt: 'Icone WhatsApp'
        }
      },

    },
   },
   address: {
    location : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.2502443847657!2d-46.627961024142785!3d-23.631207564162917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5b1b31b2204d%3A0x70a824ccefd961ae!2sR.%20Rosa%20de%20Morais%2C%20149%20-%20Vila%20%C3%81gua%20Funda%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004155-000!5e0!3m2!1spt-BR!2sbr!4v1703885718660!5m2!1spt-BR!2sbr',
    button: {
      title: 'Ir Agora',
      number: null,
      route: '',
      font :{
        width: '100%',
        height: '70px',
        weight: '700',
        border: 'solid black 3px',
        colors: {
          bg: '#fff',
          text: '#000'
        },
      },
      icon: {
        url: null,
        alt:null
      }
    },
    icons : {
      maps: {
        route: '#maps',
        url : '/images/components/address/icon/maps.png',
        alt: 'Icone do Google Maps'
      },
      waze: {
        route: '#waze',
        url : '/images/components/address/icon/waze.png',
        alt: 'Icone do Maps'
      }
    }
  },
    banners : {
      colors : {
        bg : '#fff',
        text: '#fff',
        controllers : '#fff'
      },
      size :{
        height : base.banner.size.height
      },
      carousel : [
                        
                        {
           title: 'TUDO QUE VOCÊ PRECISA, EM UM SÓ LUGAR.',
           description: '',
           url: '/images/carousel/banner1.svg',
           alt: 'banner dois',
           position: 'start'
         },
                        {
           title: 'TUDO QUE VOCÊ PRECISA, EM UM SÓ LUGAR.',
           description: '',
           url: '/images/carousel/banner3.svg',
           alt: 'banner dois',
           position: 'center'
         },
                        {
           title: 'TUDO QUE VOCÊ PRECISA, EM UM SÓ LUGAR.',
           description: '',
           url: '/images/carousel/banner4.svg',
           alt: 'banner dois',
           position: 'start'
         },
         {
          title: 'TUDO QUE VOCÊ PRECISA, EM UM SÓ LUGAR.',
          description: '',
          url: '/images/carousel/banner2.svg',
          alt: 'banner dois',
          position: 'center'
        },
       ],
    },
    faq: [
      {
        asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
        iconOpen: '/images/arrow.webp',
        iconClosed: '/images/arrow.webp'
      },
      {
        asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
        iconOpen: '/images/arrow.webp',
        iconClosed: '/images/arrow.webp'
      },
      {
        asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
        iconOpen: '/images/arrow.webp',
        iconClosed: '/images/arrow.webp'
      },
      {
        asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
        iconOpen: '/images/arrow.webp',
        iconClosed: '/images/arrow.webp'
      },
      {
        asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
        iconOpen: '/images/arrow.webp',
        iconClosed: '/images/arrow.webp'
      },
      {
        asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
        iconOpen: '/images/arrow.webp',
        iconClosed: '/images/arrow.webp'
      },
    ]
    }
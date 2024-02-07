export const data = {
  clientName: 'client',
  colors : {
    header : {
      background : '#fff',
      fontColor: '#000',
    },
    footer : {
      background : '#000',
      fontColor: '#fff'
    }
  },
  template : {
    header : {
      colors:{
        bg : '#fff',
        text: '#000',
        hoverbg: '#eee',
        hovertext: '#000'
      },
      nav : [
        { label: 'home', route: '/' },
        { label: 'quem somos', route: '/quem-somos' },
        { label: 'para o seu negócio', route: '/para-o-seu-negocio' },
        { label: 'produtos', route: '/produtos',submenu: [
          { label: 'rolamento', route: 'url' },
          { label: 'radiadores e intercooler', route: 'url' },
          { label: 'cubos de rodas', route: 'url' },
          { label: 'linhas 6000', route: 'url' },
          { label: 'trizetas', route: 'url' },
          { label: 'kit de rolamento', route: 'url' }
        ] },
        { label: 'contato', route: '/contato' }
      ],
      iconArrow : '/images/arrow.svg'
      ,
      logo : {
        url: '/images/header/logo.svg',
        alt: 'IRB automotive',
        route: '/'
      }
    },
    footer : {
      colors:{
        bg : '#000',
        text: '#fff',
        hoverbg: '#000',
        hovertext: '#fff'
      },
      lists :  [
          [
            {name:'Empresa', url:'url'},
            {name:'História', url:'url'},
            {name:'Quem Somos', url:'url'},
            {name:'Visão, Missão e Valores', url:'url'},
            {name:'Política de Privacidade e LGPD', url:'url'},
            {name:'Fale Conosco', url:'url'},
            {name:'Trabalhe Conosco', url:'url'}
          ],
          [
            {name:'Para Seu Negócio', url:'url'},
            {name:'Fábricas', url:'url'},
            {name:'Distribuídoras', url:'url'},
            {name:'Autopeças', url:'url'},
            {name:'Auto Centers', url:'url'},
            {name:'Mecânicas', url:'url'},
          ],
          [
            {name:'Produtos', url:'url'},
            {name:'Rolamento', url:'url'},
            {name:'Radiadores e Intercooler', url:'url'},
            {name:'Cubos de Rodas', url:'url'},
            {name:'Linhas 6000', url:'url'},
            {name:'Trizetas', url:'url'},
            {name:'KIT de Rolamento', url:'url'},
          ]
        ],
        socialMidia : {
          labelName : 'Redes Sociais',
          networks : [
            {
              name : 'Facebook',
              imageUrl : '/images/templates/footer/face.svg', 
              url: 'www.google.com'
            
          },
          {
              name : 'Instagram',
              imageUrl : '/images/templates/footer/instagram.svg' ,
              url: ''
          },
          {
              name : 'Whatsapp',
              imageUrl : '/images/templates/footer/instagram.svg' ,
              url: ''
          }
          ]
        },
        address: 'Endereço: Rua Rosa de Morais, 149 Vila Água Funda – São Paulo – SP'
    },
    copyright  : {
      colors : {
        bg : '#fff',
        text: '#000'
      },
      label : 'Copyright © 2023 - IRB Automotive. Todos os direitos reservados. | Desenvolvido por WBP'
      
    }
  },
  page : {
    home : {
      title : 'home',
      banners : {
        colors : {
          bg : '#fff',
          text: '#fff',
          controllers : '#fff'
        },
        size :{
          height : 430
        },
        carousel : [
          {  
             title: 'REFERÊNCIA EM PEÇAS AUTOMOTIVAS',
             description: '',
             url: '/images/carousel/banner1.svg',
             alt: 'banner um',
             position: 'start'
           },
           {
             title: 'TUDO QUE VOCÊ PRECISA, EM UM SÓ LUGAR.',
             description: '',
             url: '/images/carousel/banner2.svg',
             alt: 'banner dois',
             position: 'center'
           },
           {
             title: 'OS MELHORES PREÇOS PARA O SEU NEGÓCIO.',
             description: '',
             url: '/images/carousel/banner3.svg',
             alt: 'banner tres',
             position: 'end'
           },
           {
             title: 'REFERÊNCIA EM PEÇAS AUTOMOTIVAS',
             description: '',
             url: '/images/carousel/banner4.svg',
             alt: 'banner quatro',
             position: 'center'
           }
         ],
      }
    },
    quemSomos : {
      title : 'quem somos',
      banners : {
        colors : {
          bg : '#fff',
          text: '#fff',
          controllers : '#fff'
        },
        size :{
          height : 430
        },
        carousel : [
                          {
             title: 'TUDO QUE VOCÊ PRECISA, EM UM SÓ LUGAR.',
             description: '',
             url: '/images/carousel/banner2.svg',
             alt: 'banner dois',
             position: 'center'
           },
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
           }
         ],
      },
      companyValues : [
        {
          colors : {
            bg : '#22326E',
            text: '#fff',
            hr: '#6FBFD8' || '#fff'
          },
          title : 'missão',
          description : 'Gerar valor e entusiasmo ao nosso cliente fornecendo peças automotivas, com qualidade e alta performance, à toda frota brasileira de veículos.',
          image: '/images/components/companyValues/mission.svg' 
        },
        {
          colors : {
            bg : '#353535',
            text: '#fff',
            hr: '#C12025' || '#fff'
          },
          title : 'visão',
          description : 'Ser referência global em peças automotivas.',
          image: '/images/components/companyValues/vision.svg' 
        },
        {
          colors : {
            bg : '#C12025',
            text: '#fff',
            hr: '#22326E' || '#fff'
          },
          title : 'valores',
          description : 'Ética, respeito, inovação, entusiasmo, simplicidade, profissionalismo e segurança automotiva',
          image: '/images/components/companyValues/values.svg' 
        },
      ],
      contentDescription : [
        'A IRB Automotive é uma empresa, de marca própria, que fornece peças automotivas para todo o Brasil. Com mais de 22 anos de atuação no segmento de reposição automotiva, e com comprometimento e amor ao que fazemos, nos tornamos referência nacional na linha de Rolamentos e Cubos de Roda para linha leve de veículos. No decorrer dos anos nos dedicamos a desenvolver itens que atendessem toda a frota brasileira de veículos e esse se tornou nosso grande diferencial. Hoje, somos a empresa que oferece o maior portfólio de Rolamentos e Cubos de Roda.',
        'Com a constante evolução e crescimento do mercado, e seguindo o princípio de levar segurança e qualidade aos nossos clientes, ampliamos nosso portfólio pois sentimos a necessidade de trazer ao setor de reposição automotiva a qualidade, alta performance e diferenciais dos Rolamentos e Cubos de Roda IRB para outros produtos. Atualmente, trabalhamos com as seguintes linhas: Radiadores, Trizetas, Linha 6000 (Rolamentos para motocicletas e máquinas agrícolas), Rolamentos e Cubos de Roda (Linha leve) e Rolamentos de Roda (Linha pesada).'
      ],
      faq: [
        {
          asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
          iconOpen: '/images/arrow.svg',
          iconClosed: '/images/arrow.svg'
        },
        {
          asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
          iconOpen: '/images/arrow.svg',
          iconClosed: '/images/arrow.svg'
        },
        {
          asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
          iconOpen: '/images/arrow.svg',
          iconClosed: '/images/arrow.svg'
        },
        {
          asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
          iconOpen: '/images/arrow.svg',
          iconClosed: '/images/arrow.svg'
        },
        {
          asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
          iconOpen: '/images/arrow.svg',
          iconClosed: '/images/arrow.svg'
        },
        {
          asking: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
          iconOpen: '/images/arrow.svg',
          iconClosed: '/images/arrow.svg'
        },
      ]
      },
  },
  partners : {
    colors: {
      text: '#fff',
      textShadow : null
    },
    title: 'Para o seu negócio',
    cards : [
      {
        title: 'Fábricas',
        bgImage: '/images/carousel/banner1.svg',
        category: 'fabricas'
      },
      {
        title: 'Distribuidoras',
        bgImage: '/images/carousel/banner2.svg',
        category: 'distribuidoras'
      },
      {
        title: 'Autopeças',
        bgImage: '/images/carousel/banner3.svg',
        category: 'autopecas'
      },
      {
        title: 'Autocenters e mecânicas',
        bgImage: '/images/carousel/banner4.svg',
        category: 'autocenters'
      },
      
    ]
  },
  products : {
    title: 'Produtos',
    collection: [
      {
        id: 'uniqueID',
        title: 'Rolamento',
        description: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'],
        category: 'products',
        gallery: [
          {
            title: 'title img',
            imageUrl: '/images/carousel/banner1.svg',
            alt: 'alt'
          },
          {
            title: 'title img',
            imageUrl: '/images/products/rolamento.svg',
            alt: 'alt'
          },
        ]
        ,
        thumbnail :{
          title: 'title img',
          imageUrl: '/images/carousel/banner1.svg',
          alt: 'rolamento'
        }
      },
      {
        id: 'uniqueID',
        title: 'Radiadores e intercooler',
        description: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'],
        category: 'products',
        gallery: [
          {
            title: 'title img',
            imageUrl: '/images/carousel/banner1.svg',
            alt: 'alt'
          },
          {
            title: 'title img',
            imageUrl: '/images/products/rolamento.svg',
            alt: 'alt'
          },
        ]
        ,
        thumbnail :{
          title: 'title img',
          imageUrl: '/images/carousel/banner1.svg',
          alt: 'rolamento'
        }
      },
      {
        id: 'uniqueID',
        title: 'Cubos de rodas',
        description: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'],
        category: 'products',
        gallery: [
          {
            title: 'title img',
            imageUrl: '/images/carousel/banner1.svg',
            alt: 'alt'
          },
          {
            title: 'title img',
            imageUrl: '/images/products/rolamento.svg',
            alt: 'alt'
          },
        ]
        ,
        thumbnail :{
          title: 'title img',
          imageUrl: '/images/carousel/banner1.svg',
          alt: 'rolamento'
        }
      },
      {
        id: 'uniqueID',
        title: 'Linha 6000',
        description: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'],
        category: 'products',
        gallery: [
          {
            title: 'title img',
            imageUrl: '/images/carousel/banner1.svg',
            alt: 'alt'
          },
          {
            title: 'title img',
            imageUrl: '/images/products/rolamento.svg',
            alt: 'alt'
          },
        ]
        ,
        thumbnail :{
          title: 'title img',
          imageUrl: '/images/carousel/banner1.svg',
          alt: 'rolamento'
        }
      },
      {
        id: 'uniqueID',
        title: 'Trizetas',
        description: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'],
        category: 'products',
        gallery: [
          {
            title: 'title img',
            imageUrl: '/images/carousel/banner1.svg',
            alt: 'alt'
          },
          {
            title: 'title img',
            imageUrl: '/images/products/rolamento.svg',
            alt: 'alt'
          },
        ]
        ,
        thumbnail :{
          title: 'title img',
          imageUrl: '/images/carousel/banner1.svg',
          alt: 'rolamento'
        }
      },
      {
        id: 'uniqueID',
        title: 'kit de rolamento',
        description: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'],
        category: 'products',
        gallery: [
          {
            title: 'title img',
            imageUrl: '/images/carousel/banner1.svg',
            alt: 'alt'
          },
          {
            title: 'title img',
            imageUrl: '/images/products/rolamento.svg',
            alt: 'alt'
          },
        ]
        ,
        thumbnail :{
          title: 'title img',
          imageUrl: '/images/carousel/banner1.svg',
          alt: 'rolamento'
        }
      },

    ],
    colors: {
      text: '#fff',
      textShadow : null
    }
  },
  contact : {
    name: true,
    email: true,
    phone: true,
    subject: false,
    message: true
  }
  
  }




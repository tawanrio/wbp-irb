export const EQUIPMENT_LIST = [
  'Torquímetro',
  'Paquímetro',
  'Micrometro',
  'Relógio comparador centesimal',
  'Base magnética',
  'Refratometro',
  'Balança de precisão',
  'Kit de teste de estanqueidade do sistema de arrefecimento',
  'Scanner automotivo',
  'Multímetro - alicate amperímetro',
  'Acesso aos manuais técnicos de manutenção',
  'Ferramentas manuais',
  'Macaco jacaré hidráulico',
  'Cavaletes',
]

export const RESPONSE_MESSAGES = {
  success: 'Cadastro enviado com sucesso, aguarde aprovação.',
  error: {
    default: 'Erro ao enviar cadastro',
    uploadImages: 'Erro ao fazer upload das imagens.',
    database: 'Erro ao inserir dados no banco de dados.',
    emailPartner: 'Erro ao enviar e-mail para o parceiro.',
    emailAdmin: 'Erro ao enviar e-mail para o administrador.',
    emailJob: 'Erro ao enviar e-mail para a IRB.',
  },
}

export const EMAIL_RECIPIENTS = [
  'tawan.rio@webfoco.com',
  'rodrigo.silva@webfoco.com',
]

export const PRODUCT_CATALOG_DETAILS = {
  imageProduct: {
    imageUrl: '/images/partners/bannerIRB.png',
    alt: 'catalogo online',
  },
  title:
    'Baixe agora mesmo o catálogo eletrônico e consulte facilmente toda nossa linha de produtos.',
  subtitle: 'Acesse pelo computador ou celular',
  button: [
    {
      title: '',
      alt: 'appstore',
      image: '/images/products/appstore.png',
      link: 'https://apps.apple.com/br/app/irb-cat%C3%A1logo/id1169028455',
    },
    {
      title: '',
      alt: 'google-play',
      image: '/images/products/google-play.png',
      link: 'https://play.google.com/store/apps/details?id=br.com.ideia2001.CatalogoIRB',
    },
  ],

  description: [
    'Tenha acesso a nossa ampla gama de peças automotivas de alta qualidade para atender as necessidades do seu veículo.',
    'Encontre tudo o que você precisa para manter o seu carro funcionando perfeitamente: rolamentos de roda, cubos de roda, trizetas, radiadores, intercoolers e eletroventiladores.',
    'Baixe nosso catálogo hoje mesmo e descubra as melhores soluções para a manutenção e reparo do seu veículo!',
  ],
}

export const COMPANY_CORE_VALUES = [
  {
    colors: {
      bg: '#22326E',
      text: '#fff',
      hr: '#6FBFD8',
    },
    title: 'nosso sonho',
    content: {
      listStyle: 'none',
      description: [
        'Ser a primeira escolha do cliente e líder mundial no segmento de peças automotivas.',
      ],
    },
    image: '/images/components/companyValues/mission.webp',
  },
  {
    colors: {
      bg: '#353535',
      text: '#fff',
      hr: '#C12025',
    },
    title: 'nosso combustível',
    content: {
      listStyle: 'auto',
      description: [
        'Fazemos negócios com ética, integridade e profissionalismo.',
        'Somos movidos por surpreender nossos clientes e fornecer o melhor produto do mercado.',
        'Somos incansáveis em entregar qualidade, inovação e segurança em nossas soluções.',
        'Somos comprometidos em encontrar nossos colaboradores e gerar valor para a sociedade.',
      ],
    },
    image: '/images/components/companyValues/vision.webp',
  },
  {
    colors: {
      bg: '#C12025',
      text: '#fff',
      hr: '#22326E',
    },
    title: 'nossas atitudes',
    content: {
      listStyle: 'disc',
      description: [
        'Atitude corajosa',
        'Impulsiona resultados',
        'Graxa na veia',
        'Cliente no centro',
        'Constrói parcerias',
        'Aprendizagem contínua',
      ],
    },
    image: '/images/components/companyValues/values.webp',
  },
]

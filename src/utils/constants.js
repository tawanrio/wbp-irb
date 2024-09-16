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
    icon: '/images/components/companyValues/mission.svg',
    title: 'missão',
    description:
      'Os cubos de rodas são componentes essenciais nos sistemas de suspensão e direção de um veículo. Localizados na',
  },
  {
    icon: '/images/components/companyValues/vision.svg',
    title: 'visão',
    description:
      'Os cubos de rodas são componentes essenciais nos sistemas de suspensão e direção de um veículo. Localizados na',
  },
  {
    icon: '/images/components/companyValues/values.svg',
    title: 'valores',
    description:
      'Os cubos de rodas são componentes essenciais nos sistemas de suspensão e direção de um veículo. Localizados na',
  },
]

export const PARTNER_TYPES = [
  {
    surtitle: 'Redes',
    title: 'Autopeças',
    src: '/images/components/icons/gear-red.svg',
    alt: 'Ícone de Autopeças',
    link: '/autopecas',
  },
  {
    surtitle: 'Nossos',
    title: 'Distribuidoras',
    src: '/images/components/icons/distributors-red.svg',
    alt: 'Ícone de Distribuidoras',
    link: '/distribuidoras',
  },
  {
    surtitle: 'Encontre',
    title: 'Mecânicas',
    src: '/images/components/icons/mechanic-red.svg',
    alt: 'Ícone de Mecânicas',
    link: '/mecanicas',
  },
]

export const SERVICE_ADVANTAGES = [
  {
    title: 'Portfólio',
    description: 'Cobertura de 99% da frota circulante',
    icon: {
      url: '/images/components/icons/truck.svg',
      alt: 'Ícone de Caminhão',
    },
  },
  {
    title: 'Produtos',
    description: 'Desenvolvidos sob medida para o clima e solo brasileiros',
    icon: {
      url: '/images/components/icons/brazil.svg',
      alt: 'Ícone do Brasil',
    },
  },
  {
    title: 'Certificações',
    description:
      'Maiores <strong class="font-medium">certificadoras</strong> mundiais',
    icon: {
      url: '/images/components/icons/tool.svg',
      alt: 'Ícone de Ferramenta',
    },
  },
]

export const QUALITY_CERTIFICATIONS = [
  {
    url: '/images/components/icons/iso-16949-red.png',
    alt: 'ISO 16949',
  },
  {
    url: '/images/components/icons/iso-9001-red.png',
    alt: 'ISO 9001',
  },
]

export const NAVIGATION_LINKS = [
  {
    title: 'Nossos Produtos',
    href: '/#product-carousel',
  },
  {
    title: 'EngraxaMente',
    href: 'https://engraxamente.eadplataforma.app',
    target: '_blank',
  },
  {
    title: 'Parceiros',
    href: '/registre-se',
  },
]

export const UTILITIES_CARDS = [
  {
    title: 'Publicação Quinzenal de Vídeos Educativos',
    surtitle: 'Nosso canal no Youtube (IRB Automotive)',
    description: 'Dicas Sobre Mecânica Automotiva no Canal do YouTube',
    image: '/images/components/utilityCards/mobile.png',
    link: 'https://engraxamente.eadplataforma.app/',
    linkText: 'Saiba mais',
  },
  {
    title: 'IRB Code é uma ferramenta desenvolvida pela IRB Automotive',
    surtitle: 'IRB Code (desenvolvida pela IRB Automotive)',
    description:
      'Auxilia nossos amigos reparadores no correto diagnóstico de problemas no circuito ABS dos rolamentos.',
    image: '/images/components/utilityCards/mobile.png',
    link: '/autopecas',
    linkText: 'Onde encontrar',
  },
  {
    title: 'Consulte nosso catálogo eletrônico',
    surtitle: '(disponível para Android, IOS e Windows)',
    description:
      'e confira todos os itens, aplicações e características técnicas',
    image: '/images/components/utilityCards/mobile.png',
    link: 'https://c123.com.br/app/aplicativo/?n=IRB',
    linkText: 'Baixar catálogo',
  },
  {
    title: "Na aba 'Educacional' há eBooks grátis para download!",
    surtitle: 'Baixe os eBooks e se aprenda com nossos materiais',
    description:
      'Neles você conhecerá mais sobre nossas linhas de produtos, especificações e dicas técnicas',
    image: '/images/components/utilityCards/mobile.png',
    link: 'https://irbauto.rds.land/material-rico',
    linkText: 'Baixar E-books',
  },
]

export const OPTIONS = { loop: true }

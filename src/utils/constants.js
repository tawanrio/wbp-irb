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
  // 'rodrigo.silva@webfoco.com',
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

export const PARTNER_TYPES_NO_MECHANICS = [
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
    href: '/produtos',
  },
  {
    title: 'EngraxaMente EAD',
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
    bgImage: "url('/images/components/utilityCards/mechanic-working.png')",
    title: {
      name: 'Consulte nosso catálogo eletrônico',
      weight: 700,
      size: '28px',
    },
    surtitle: {
      name: '(disponível para Android, IOS e Windows)',
      weight: 300,
      size: '12px',
    },
    description: {
      name: 'e confira todos os itens, aplicações e características técnicas.',
      weight: 700,
      size: '20px',
    },
    image: {
      src: '/images/components/utilityCards/mobile.png',
      width: 297.33,
      height: 455,
      margin: '-34px',
    },
    link: 'https://c123.com.br/app/aplicativo/?n=IRB',
    linkText: 'Baixar catálogo',
  },
  {
    bgImage: "url('/images/components/utilityCards/wrench-workshop.png')",
    title: {
      name: 'IRB Code',
      weight: 700,
      size: '48px',
    },
    description: {
      name: 'Ferramenta desenvolvida pela IRB Automotive, que auxilia nossos amigos reparadores no correto diagnóstico de problemas no circuito ABS dos rolamentos.',
      weight: 400,
      size: '20px',
    },
    image: {
      src: '/images/components/utilityCards/irbCode.png',
      width: 300,
      height: 400,
      margin: '130px',
    },
    link: '/contato',
    linkText: 'Clique aqui',
    target: '_blank',
  },
  {
    bgImage: "url('/images/components/utilityCards/mechanic-relaxing.png')",
    title: {
      name: 'Novidade',
      weight: 400,
      size: '16px',
      color: '#982225',
      transform: 'uppercase',
      background: '#FFFFFF',
      rounded: '19px',
      padding: '2px 18px',
      width: 'fit-content',
      align: 'end',
    },
    surtitle: {
      name: 'Cubo Vazio e Eletroventilador',
      weight: 700,
      size: '28px',
      align: 'end',
    },
    description: {
      name: 'Trouxemos a qualidade e tecnologia já conhecida dos rolamentos e radiadores IRB para essas novas linhas.',
      weight: 300,
      size: '20px',
      align: 'end',
      wrap: 'balance',
    },
    image: {
      src: '/images/components/utilityCards/parts.png',
      width: 300,
      height: 300,
      margin: '20px',
    },
    link: '/produtos',
    linkText: 'Clique aqui',
  },
  {
    bgImage: "url('/images/components/utilityCards/road_united_states.jpg')",
    title: {
      name: 'Qualidade que conecta continentes',
      weight: 700,
      size: '28px',
      align: 'end',
    },
    description: {
      name: 'Iniciamos operação nos EUA com a linha de <strong>Cubo de Roda</strong> com qualidade adaptada às condições climáticas e geográficas do país.',
      weight: 300,
      size: '20px',
      align: 'end',
      wrap: 'balance',
    },
    image: {
      src: '/images/products/roda.png',
      width: 300,
      height: 400,
      margin: '100px',
    },
    link: '/cubos-de-rodas',
    linkText: 'Clique aqui',
  },
]

export const OPTIONS = { loop: true }

export const CONTACT_BANNER = {
  colors: {
    bg: '#fff',
    text: '#fff',
    controllers: '#fff',
  },
  size: {
    height: 415,
  },
  carousel: [
    {
      title: '',
      description: '',
      textWidth: 100,
      url: '/images/pages/contact/banner-contact.png',
      alt: 'banner dois',
      position: 'start',
    },
  ],
}

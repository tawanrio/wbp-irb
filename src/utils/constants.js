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

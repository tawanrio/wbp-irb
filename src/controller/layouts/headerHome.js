export const headerHome = {
    colors:{
      bg : '#fff',
      text: '#fff',
      textSub: '#000',
      hoverbg: 'transparent',
      hovertext: '#fff'
    },
    nav : {
      icon : '/images/arrow.svg',
      separateIcon : '/images/arrow.svg',
      links :[
          { label: 'home', route: '/' },
          { label: 'quem somos', route: '/quem-somos' },
          // { label: 'para o seu negócio', route: '/para-o-seu-negocio' },
            { label: 'fábrica', route: '/fabrica' },
          { label: 'parceiros', route: '/parceiros' },
          // { label: 'parceiros', route: '#',
          // submenu: [
          //   { label: 'fábrica', route: '/fabrica' },
          //   { label: 'distribuidoras', route: '/distribuidoras' },
          //   { label: 'autopeças', route: '/autopecas' },
          //   { label: 'autocenters e mecânicas', route: '/autocenter-e-mecanicas' }
          // ] },
          { label: 'produtos', route: '/produtos'},
          // { label: 'produtos', route: '/produtos',
          // submenu: [
          //   { label: 'rolamento', route: '/rolamento' },
          //   { label: 'radiadores e intercooler', route: '/radiadores-e-intercooler' },
          //   { label: 'cubos de rodas', route: '/cubos-de-rodas' },
          //   { label: 'linhas 6000', route: '/linha-6000' },
          //   { label: 'trizetas', route: '/trizetas' },
          //   { label: 'kit de rolamento', route: '/kit-de-rolamento' }
          // ] },
          { label: 'contato', route: '/contato' }
        ]
    },
    logo : {
      url: '/images/templates/header/logo-white.svg',
      alt: 'IRB automotive',
      route: '/'
    }
  } 
import {base} from '../base'

export const home = {
    title : 'home',
    metaTitle: 'IRB Automotive',
    metaDescription: [' Blablabla',' blablabla 2'],
    banners : {
      colors : {
        bg : '#fff',
        text: '#fff',
        controllers : '#fff'
      },
      size :{
        height : base.bannerHome.size.height
      },
      carousel : [
        {  
           title: 'REFERÊNCIA EM PEÇAS AUTOMOTIVAS',
           description: '',
           url: '/images/pages/home/banners/banner1.svg',
           alt: 'banner um',
           position: 'end'
         }
       ],
    }
  }
import { VideoPlayer } from '../Video'

export const Infos = () => {
  return (
    <section className="mx-auto mb-20 mt-10 w-full max-w-7xl space-y-14 px-6 text-white md:px-14">
      <h1 className="w-full max-w-[1079.63px] font-['Libre_Baskerville'] text-3xl font-normal sm:text-4xl md:text-5xl">
        De uma <i>simples importadora,</i> a{' '}
        <strong>
          uma
          <br /> grande empresa
        </strong>{' '}
        desenvolvedora de produtos
      </h1>

      <div className="flex flex-col gap-6 md:flex-row">
        <VideoPlayer />

        <div className="flex w-full max-w-[431px] flex-col justify-between gap-6">
          <h2 className="w-full max-w-[350px] font-['Libre_Baskerville'] text-4xl font-bold sm:text-5xl">
            Centro de logística IRB
          </h2>
          <p className="text-lg font-extralight sm:text-xl">
            Com mais de 25 anos de expertise no ramo de reposição automotiva,
            somos líderes no desenvolvimento e fabricação de peças projetadas
            para enfrentar as diversas condições climáticas e geográficas do
            Brasil, garantindo segurança, qualidade, desempenho e durabilidade.{' '}
          </p>
        </div>
      </div>
    </section>
  )
}

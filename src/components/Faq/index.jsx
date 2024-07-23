import SectionTitle from '../SectionTitle'

import FaqHtml from './components/FaqHtml'
export const FaqComponent = FaqHtml

export default function Faq({ faq }) {
  return (
    <section className="flex flex-col items-center" id="faq">
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-10 md:gap-10 md:px-14">
        <SectionTitle title={'Perguntas frequentes'} line />
        <FaqHtml faq={faq} />
      </div>
    </section>
  )
}

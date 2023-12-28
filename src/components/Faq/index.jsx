import SectionTitle from "../SectionTitle"

import FaqHtml from "./components/FaqHtml";
export const FaqComponent = FaqHtml

export default function Faq({ faq }) {


    return (
        <section className="flex flex-col items-center " id="faq">
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4 flex flex-col justify-between md:gap-10">
                <SectionTitle title={'Perguntas frequentes'} line />
                <FaqHtml faq={faq}/>

            </div>
        </section>

    )
}
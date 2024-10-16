/* eslint-disable @next/next/no-img-element */
import ImportantNoticeImg from '../../../../public/images/components/cookiePopup/important-notice-image.jpg'

export const ImportantNotice = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9998] flex h-full w-full items-center justify-center bg-black/50 p-3.5">
      <div className="z-[9999] flex max-h-[90vh] flex-col items-center gap-5 rounded bg-[#f0f0f0] p-5 shadow-lg">
        <img
          src={ImportantNoticeImg.src}
          alt="Comunicado Importante"
          className="max-h-[70vh] max-w-full object-contain"
        />
        <button
          onClick={onClose}
          className="w-1/2 rounded border-none bg-[rgb(34_50_110)] px-4 py-2 text-white"
        >
          Entendi
        </button>
      </div>
    </div>
  )
}

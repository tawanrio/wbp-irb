export const PrivacyNotice = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-40 flex h-full w-full items-end justify-center">
      <div className="z-50 mx-6 mb-20 flex w-full max-w-5xl flex-col items-center gap-5 rounded bg-[#f0f0f0] p-5 shadow-lg">
        <p className="text-center">
          Este site utiliza cookies para oferecer uma melhor experiência de
          navegação. Ao continuar, você concorda com o uso de cookies e aceita o
          armazenamento dos seus dados de acordo com a LGPD (Lei Geral de
          Proteção de Dados).
        </p>
        <button
          onClick={onClose}
          className="w-1/3 rounded border-none bg-[rgb(34_50_110)] px-4 py-2 text-white"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}

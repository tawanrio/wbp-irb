import { useState, useEffect } from 'react';

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  

  useEffect(() => {
    // Verifica se o cookie "cookieAccepted" existe
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      // Se o cookie não existe, mostra o popup
      setShowPopup(true);
    }
  }, []);

  const acceptCookies = () => {
    // Define o cookie "cookieAccepted" quando o usuário aceita os cookies
    localStorage.setItem('cookieAccepted', 'true');
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="cookie-popup">
          <div className="cookie-popup-content gap-5 flex items-center  flex-col">
            <p>Este site utiliza cookies para oferecer uma melhor experiência de navegação. Ao continuar, você concorda com o uso de cookies e aceita o armazenamento dos seus dados de acordo com a LGPD (Lei Geral de Proteção de Dados).</p>
            <button className="accept-btn w-1/2" onClick={acceptCookies}>
              Aceitar
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .cookie-popup {
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          z-index: 9999;
        }
        .cookie-popup-content {
          text-align: center;
        }
        .accept-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default CookiePopup;
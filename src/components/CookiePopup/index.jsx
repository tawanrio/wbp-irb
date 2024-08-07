import { useEffect, useState } from 'react'
import { PrivacyNotice } from './PrivacyNotice'
import { ImportantNotice } from './ImportantNotice'

export const CookiePopup = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false)
  const [showImportantNotice, setShowImportantNotice] = useState(false)

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted')
    const noticeAccepted = localStorage.getItem('noticeAccepted')

    if (!noticeAccepted) {
      setShowImportantNotice(true)
    } else if (!cookieAccepted) {
      setShowPrivacyNotice(true)
    }
  }, [])

  const handleImportantNoticeClose = () => {
    localStorage.setItem('noticeAccepted', 'true')
    setShowImportantNotice(false)
    setShowPrivacyNotice(true)
  }

  const handlePrivacyNoticeClose = () => {
    localStorage.setItem('cookieAccepted', 'true')
    setShowPrivacyNotice(false)
  }

  return (
    <>
      {showImportantNotice && (
        <ImportantNotice onClose={handleImportantNoticeClose} />
      )}
      {!showImportantNotice && showPrivacyNotice && (
        <PrivacyNotice onClose={handlePrivacyNoticeClose} />
      )}
    </>
  )
}

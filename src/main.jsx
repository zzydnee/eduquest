import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Root() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showSplash && (
        <div className="splash">
          <div className="splash-emoji">🎓</div>
          <div className="splash-title">EduQuest</div>
          <div className="splash-subtitle">Learn. Play. Win!</div>
          <div className="splash-loader"></div>
        </div>
      )}
      <App />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
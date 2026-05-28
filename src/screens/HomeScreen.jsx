import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HomeScreen() {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  function handleStart() {
    if (name.trim() === '') {
      setError(true)
      return
    }
    navigate(`/levels/${name}`)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '32px',
      background: '#f8f0ff'
    }}>
      <div style={{ fontSize: 80 }}>🎓</div>
      <h1 style={{ fontSize: 40, color: '#6200EE', margin: '8px 0' }}>EduQuest</h1>
      <p style={{ color: '#03DAC6', fontSize: 18, margin: 0 }}>Learn. Play. Win!</p>

      <div style={{ marginTop: 48, width: '100%', maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(false) }}
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: 16,
            borderRadius: 12,
            border: error ? '2px solid red' : '2px solid #6200EE',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        {error && <p style={{ color: 'red', fontSize: 13, margin: '4px 0' }}>Please enter your name!</p>}

        <button
          onClick={handleStart}
          style={{
            width: '100%',
            padding: '16px',
            marginTop: 16,
            fontSize: 18,
            fontWeight: 'bold',
            background: '#6200EE',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer'
          }}
        >
          Start Playing! 🚀
        </button>

        <button
          onClick={() => navigate('/leaderboard')}
          style={{
            width: '100%',
            padding: '14px',
            marginTop: 12,
            fontSize: 16,
            background: 'white',
            color: '#6200EE',
            border: '2px solid #6200EE',
            borderRadius: 12,
            cursor: 'pointer'
          }}
        >
          🏆 Leaderboard
        </button>
      </div>
    </div>
  )
}

export default HomeScreen
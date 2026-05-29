import { useNavigate, useParams } from 'react-router-dom'

function ResultScreen() {
  const { level, correct, total, name, grade } = useParams()
  const navigate = useNavigate()

  const correctNum = parseInt(correct)
  const totalNum = parseInt(total)
  const pct = Math.round((correctNum / totalNum) * 100)
  const stars = correctNum === totalNum ? 3 : correctNum >= totalNum * 0.7 ? 2 : correctNum >= totalNum * 0.5 ? 1 : 0
  const xp = correctNum * 10

  const emoji = stars === 3 ? '🏆' : stars === 2 ? '🥈' : stars === 1 ? '🥉' : '😅'
  const message = stars === 3 ? 'Perfect! You are a genius! 🧠' : stars === 2 ? 'Great job! Keep it up! 💪' : stars === 1 ? 'Good try! Practice more!' : "Don't give up! Try again!"

  function renderStars() {
    return [1, 2, 3].map(i => (
      <span key={i} style={{ fontSize: 36 }}>{i <= stars ? '⭐' : '☆'}</span>
    ))
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f0ff',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ fontSize: 80 }}>{emoji}</div>
      <h1 style={{ color: '#6200EE', fontSize: 28, margin: '8px 0' }}>Level {level} Complete!</h1>
      <p style={{ color: '#888', fontSize: 14, margin: '0 0 8px' }}>Grade {grade}</p>
      <div style={{ marginBottom: 24 }}>{renderStars()}</div>

      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 2px 8px rgba(98,0,238,0.08)',
        marginBottom: 32,
        textAlign: 'center'
      }}>
        <p style={{ fontSize: 16, color: '#333', marginBottom: 20 }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#6200EE' }}>{correctNum}/{totalNum}</div>
            <div style={{ fontSize: 13, color: '#888' }}>Correct</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#6200EE' }}>{pct}%</div>
            <div style={{ fontSize: 13, color: '#888' }}>Score</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#6200EE' }}>+{xp}</div>
            <div style={{ fontSize: 13, color: '#888' }}>XP Earned</div>
          </div>
        </div>
      </div>

      {parseInt(level) < 10 && stars === 3 && (
        <button
          onClick={() => navigate(`/quiz/${parseInt(level) + 1}/${name}/${grade}`)}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '16px',
            fontSize: 18,
            fontWeight: 'bold',
            background: '#03DAC6',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            marginBottom: 12
          }}
        >
          Next Level ➡️
        </button>
      )}

      <button
        onClick={() => navigate(`/levels/${name}/${grade}`)}
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '16px',
          fontSize: 18,
          fontWeight: 'bold',
          background: '#6200EE',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
          marginBottom: 12
        }}
      >
        Back to Levels
      </button>

      <button
        onClick={() => navigate(`/quiz/${level}/${name}/${grade}`)}
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '14px',
          fontSize: 16,
          background: 'white',
          color: '#6200EE',
          border: '2px solid #6200EE',
          borderRadius: 12,
          cursor: 'pointer'
        }}
      >
        Try Again 🔄
      </button>
    </div>
  )
}

export default ResultScreen
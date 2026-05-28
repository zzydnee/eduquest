import { useNavigate } from 'react-router-dom'

function LeaderboardScreen() {
  const navigate = useNavigate()

  function getScores() {
    const scores = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith('stars_')) {
        const parts = key.split('_')
        const playerName = parts[1]
        const level = parts[2]
        const stars = parseInt(localStorage.getItem(key))
        const xp = stars * 10
        scores.push({ playerName, level, stars, xp })
      }
    }
    return scores.sort((a, b) => b.xp - a.xp)
  }

  const scores = getScores()

  function renderStars(count) {
    return [1, 2, 3].map(i => (
      <span key={i} style={{ fontSize: 14 }}>{i <= count ? '⭐' : '☆'}</span>
    ))
  }

  function getMedal(rank) {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f0ff', padding: '24px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, color: '#6200EE' }}>🏆 Leaderboard</h2>
      </div>

      {scores.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 80, color: '#888' }}>
          <div style={{ fontSize: 48 }}>🎮</div>
          <p>No scores yet!</p>
          <p>Play some levels first.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {scores.map((score, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                borderRadius: 12,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: '0 2px 8px rgba(98,0,238,0.08)',
                border: '2px solid #EDE1FF'
              }}
            >
              <div style={{ fontSize: 20, width: 40, textAlign: 'center' }}>
                {getMedal(index + 1)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: 15, color: '#333' }}>
                  {score.playerName}
                </div>
                <div style={{ fontSize: 13, color: '#888' }}>
                  Level {score.level} • {renderStars(score.stars)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: '#6200EE', fontSize: 16 }}>
                  +{score.xp} XP
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LeaderboardScreen
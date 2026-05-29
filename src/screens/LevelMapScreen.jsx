import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function LevelMapScreen() {
  const { name, grade } = useParams()
  const navigate = useNavigate()

  const gradeNum = parseInt(grade)

  const levels = Array.from({ length: 10 }, (_, i) => ({
    level: i + 1,
    grade: gradeNum
  }))

  function getStars(level) {
    const saved = localStorage.getItem(`stars_${name}_${grade}_${level}`)
    return saved ? parseInt(saved) : 0
  }

  function renderStars(count) {
    return [1, 2, 3].map(i => (
      <span key={i} style={{ fontSize: 18 }}>{i <= count ? '⭐' : '☆'}</span>
    ))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f0ff', padding: '24px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#6200EE',
            border: 'none',
            borderRadius: 20,
            padding: '8px 16px',
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ← Home
        </button>
        <button
          onClick={() => navigate('/leaderboard')}
          style={{ padding: '8px 16px', background: '#6200EE', color: 'white', border: 'none', borderRadius: 20, cursor: 'pointer' }}
        >
          🏆 Board
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, color: '#6200EE' }}>Hi, {name}! 👋</h2>
        <p style={{ margin: 0, fontSize: 14, color: '#888' }}>Grade {grade} — Choose a Level</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }}>
        {levels.map(({ level }) => {
          const stars = getStars(level)
          const unlocked = level === 1 || getStars(level - 1) >= 3

          return (
            <div
              key={level}
              onClick={() => {
                if (!unlocked) {
                  alert(`Finish Level ${level - 1} with 3 stars first! ⭐⭐⭐`)
                } else {
                  navigate(`/quiz/${level}/${name}/${grade}`)
                }
              }}
              style={{
                background: unlocked ? 'white' : '#f0f0f0',
                borderRadius: 16,
                padding: '20px 16px',
                textAlign: 'center',
                cursor: unlocked ? 'pointer' : 'not-allowed',
                border: `2px solid ${stars === 3 ? '#6200EE' : unlocked ? '#EDE1FF' : '#ddd'}`,
                boxShadow: unlocked ? '0 2px 8px rgba(98,0,238,0.08)' : 'none',
                opacity: unlocked ? 1 : 0.5,
                position: 'relative'
              }}
            >
              {!unlocked && <div style={{ fontSize: 22, marginBottom: 4 }}>🔒</div>}
              <div style={{ fontSize: 20, fontWeight: 'bold', color: unlocked ? '#6200EE' : '#aaa' }}>Level {level}</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Grade {grade}</div>
              <div>{renderStars(stars)}</div>
              {stars === 3 && (
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  background: '#6200EE', color: 'white',
                  borderRadius: 20, fontSize: 10,
                  padding: '2px 8px', fontWeight: 'bold'
                }}>DONE ✓</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LevelMapScreen
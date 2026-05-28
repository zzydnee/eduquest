import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function LevelMapScreen() {
  const { name } = useParams()
  const navigate = useNavigate()

  const levels = [
    { level: 1, grade: 'Grade 1' },
    { level: 2, grade: 'Grade 1' },
    { level: 3, grade: 'Grade 1' },
    { level: 4, grade: 'Grade 2' },
    { level: 5, grade: 'Grade 2' },
    { level: 6, grade: 'Grade 2' },
    { level: 7, grade: 'Grade 3' },
    { level: 8, grade: 'Grade 3' },
    { level: 9, grade: 'Grade 4' },
    { level: 10, grade: 'Grade 4' },
  ]

  function getStars(level) {
    const saved = localStorage.getItem(`stars_${name}_${level}`)
    return saved ? parseInt(saved) : 0
  }

  function renderStars(count) {
    return [1, 2, 3].map(i => (
      <span key={i} style={{ fontSize: 18 }}>{i <= count ? '⭐' : '☆'}</span>
    ))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f0ff', padding: '24px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: '#6200EE' }}>Hi, {name}! 👋</h2>
        <button
          onClick={() => navigate('/leaderboard')}
          style={{ padding: '8px 16px', background: '#6200EE', color: 'white', border: 'none', borderRadius: 20, cursor: 'pointer' }}
        >
          🏆 Board
        </button>
      </div>

      <h3 style={{ color: '#333', marginBottom: 16 }}>Choose a Level</h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }}>
        {levels.map(({ level, grade }) => (
          <div
            key={level}
            onClick={() => navigate(`/quiz/${level}/${name}`)}
            style={{
              background: 'white',
              borderRadius: 16,
              padding: '20px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              border: '2px solid #EDE1FF',
              boxShadow: '0 2px 8px rgba(98,0,238,0.08)'
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 'bold', color: '#6200EE' }}>Level {level}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{grade}</div>
            <div>{renderStars(getStars(level))}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LevelMapScreen
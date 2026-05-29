import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

function QuizScreen() {
  const { level, name } = useParams()
  const navigate = useNavigate()

  const [levelQuestions, setLevelQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [hintLevel, setHintLevel] = useState(0)
  const [showHint, setShowHint] = useState(false)

useEffect(() => {
    async function loadQuestions() {
      const q = query(
        collection(db, 'questions'),
        where('gameLevel', '==', parseInt(level))
      )
      const snapshot = await getDocs(q)
      const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const shuffled = loaded.sort(() => Math.random() - 0.5)
      setLevelQuestions(shuffled)
    }
    loadQuestions()
  }, [level])

  if (levelQuestions.length === 0) return <div style={{ padding: 32 }}>Loading...</div>

  const question = levelQuestions[currentIndex]
  const isLast = currentIndex === levelQuestions.length - 1

  function handleSelect(index) {
    if (answered) return
    setSelectedOption(index)
    setAnswered(true)
    if (index === question.correctIndex) {
      setCorrectCount(prev => prev + 1)
    }
  }

  function handleNext() {
    if (isLast) {
      const total = levelQuestions.length
      const stars = correctCount === total ? 3 : correctCount >= total * 0.7 ? 2 : correctCount >= total * 0.5 ? 1 : 0
      localStorage.setItem(`stars_${name}_${level}`, stars)
      navigate(`/result/${level}/${correctCount}/${total}/${name}`)
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setAnswered(false)
      setHintLevel(0)
      setShowHint(false)
    }
  }

  function handleHint() {
    if (hintLevel < 3) {
      setHintLevel(prev => prev + 1)
      setShowHint(true)
    }
  }

function getOptionColor(index) {
  if (!answered) return { bg: 'white', text: '#333', border: '#EDE1FF' }
  if (index === question.correctIndex) return { bg: '#4CAF50', text: 'white', border: '#4CAF50' }
  if (index === selectedOption) return { bg: '#F44336', text: 'white', border: '#F44336' }
  return { bg: 'white', text: '#333', border: '#EDE1FF' }
}

  return (
    <div style={{ minHeight: '100vh', background: '#f8f0ff', padding: '24px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button onClick={() => navigate(`/levels/${name}`)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
        <span style={{ fontWeight: 'bold', color: '#6200EE' }}>Level {level} • Q{currentIndex + 1}/{levelQuestions.length}</span>
        <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ {correctCount}</span>
      </div>

      <div style={{ background: '#EDE1FF', borderRadius: 8, height: 8, marginBottom: 20 }}>
        <div style={{ background: '#6200EE', height: 8, borderRadius: 8, width: `${((currentIndex + 1) / levelQuestions.length) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      <div style={{ background: '#6200EE', borderRadius: 12, padding: '8px 14px', display: 'inline-block', marginBottom: 12 }}>
        <span style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>{question.subject}</span>
      </div>

      <div style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: '0 2px 8px rgba(98,0,238,0.08)' }}>
        <p style={{ fontSize: 18, fontWeight: '500', color: '#333', margin: 0, lineHeight: 1.5 }}>{question.text}</p>
      </div>

      <div>
       {question.options.map((option, index) => {
  const colors = getOptionColor(index)
  return (
    <div
      key={index}
      onClick={() => handleSelect(index)}
      style={{
        width: '100%',
        padding: '14px 16px',
        marginBottom: 10,
        borderRadius: 12,
        border: `2px solid ${colors.border}`,
        background: colors.bg,
        cursor: answered ? 'default' : 'pointer',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}
    >
      <span style={{ fontWeight: 'bold', fontSize: 15, color: colors.text, flexShrink: 0 }}>
        {['A', 'B', 'C', 'D'][index]}.
      </span>
      <span style={{ fontSize: 15, color: colors.text, lineHeight: 1.4, wordBreak: 'break-word' }}>
        {option}
      </span>
    </div>
  )
})}
      </div>

      {showHint && hintLevel > 0 && (
        <div style={{ background: '#FFF3E0', border: '2px solid #FF6D00', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>🤖 </span>
          <span style={{ fontSize: 14, color: '#333' }}>{question.hints[hintLevel - 1]}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <button
          onClick={handleHint}
          disabled={answered || hintLevel >= 3}
          style={{
            flex: 1, padding: '12px', borderRadius: 12, fontSize: 14,
            background: 'white', border: '2px solid #6200EE', color: '#6200EE',
            cursor: answered || hintLevel >= 3 ? 'not-allowed' : 'pointer',
            opacity: answered || hintLevel >= 3 ? 0.5 : 1
          }}
        >
          💡 Hint ({3 - hintLevel} left)
        </button>

        <button
          onClick={handleNext}
          disabled={!answered}
          style={{
            flex: 1, padding: '12px', borderRadius: 12, fontSize: 14,
            background: answered ? '#6200EE' : '#ccc',
            color: 'white', border: 'none',
            cursor: answered ? 'pointer' : 'not-allowed'
          }}
        >
          {isLast ? 'Finish! 🎉' : 'Next ➡'}
        </button>
      </div>
    </div>
  )
}

export default QuizScreen
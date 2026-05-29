import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

function AdminScreen() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  function handleLogin() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  function handleLogout() {
    signOut(auth)
  }

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>

  if (!user) return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f0ff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32
    }}>
      <div style={{ fontSize: 60 }}>🔐</div>
      <h2 style={{ color: '#6200EE' }}>Admin Access Only</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Sign in with your Google account to continue</p>
      <button
        onClick={handleLogin}
        style={{
          padding: '14px 32px',
          background: '#6200EE',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          fontSize: 16,
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Sign in with Google 🔑
      </button>
    </div>
  )

  if (user.email !== 'zydnee7@gmail.com') return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f0ff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32
    }}>
      <div style={{ fontSize: 60 }}>⛔</div>
      <h2 style={{ color: '#F44336' }}>Access Denied</h2>
      <p style={{ color: '#888' }}>You are not authorized to access this page.</p>
      <button onClick={handleLogout} style={{
        padding: '12px 24px', background: '#F44336', color: 'white',
        border: 'none', borderRadius: 12, fontSize: 15, cursor: 'pointer'
      }}>Sign Out</button>
    </div>
  )

  return <AdminDashboard user={user} handleLogout={handleLogout} />
}

function AdminDashboard({ user, handleLogout }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [filterGrade, setFilterGrade] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [filterSubject, setFilterSubject] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadQuestions()
  }, [])

  async function loadQuestions() {
    setLoading(true)
    const snapshot = await getDocs(collection(db, 'questions'))
    const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    loaded.sort((a, b) => a.gameLevel - b.gameLevel)
    setQuestions(loaded)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this question?')) return
    await deleteDoc(doc(db, 'questions', id))
    loadQuestions()
  }

  function handleEdit(question) {
    setEditingQuestion(question)
    setShowForm(true)
  }

  function handleAddNew() {
    setEditingQuestion(null)
    setShowForm(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f0ff', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, color: '#6200EE' }}>🎓 EduQuest Admin</h2>
          <p style={{ margin: 0, fontSize: 13, color: '#888' }}>Logged in as {user.email}</p>
        </div>
        <button onClick={handleLogout} style={{
          padding: '8px 16px', background: 'white', color: '#F44336',
          border: '2px solid #F44336', borderRadius: 8, cursor: 'pointer'
        }}>Sign Out</button>
      </div>
        {/* Search and Filter */}
      <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 10,
            border: '2px solid #EDE1FF', fontSize: 14, boxSizing: 'border-box', outline: 'none'
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <select value={filterGrade} onChange={e => setFilterGrade(e.target.value)}
            style={{ padding: '8px', borderRadius: 8, border: '2px solid #EDE1FF', fontSize: 13 }}>
            <option value="all">All Grades</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
          </select>
          <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)}
            style={{ padding: '8px', borderRadius: 8, border: '2px solid #EDE1FF', fontSize: 13 }}>
            <option value="all">All Levels</option>
            {[1,2,3,4,5,6,7,8,9,10].map(l => <option key={l} value={l}>Level {l}</option>)}
          </select>
          <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}
            style={{ padding: '8px', borderRadius: 8, border: '2px solid #EDE1FF', fontSize: 13 }}>
            <option value="all">All Subjects</option>
            <option>English</option>
            <option>Math</option>
            <option>Science</option>
            <option>History</option>
            <option>Values</option>
          </select>
        </div>
      </div>
      <button onClick={handleAddNew} style={{
        width: '100%', padding: '14px', background: '#6200EE', color: 'white',
        border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 'bold',
        cursor: 'pointer', marginBottom: 20
      }}>+ Add New Question</button>

      {showForm && (
        <QuestionForm
          question={editingQuestion}
          onSave={() => { setShowForm(false); loadQuestions() }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? <p>Loading questions...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 8px' }}>
            Showing {questions.filter(q => {
              const matchGrade = filterGrade === 'all' || q.gradeLevel === parseInt(filterGrade)
              const matchLevel = filterLevel === 'all' || q.gameLevel === parseInt(filterLevel)
              const matchSubject = filterSubject === 'all' || q.subject === filterSubject
              const matchSearch = search === '' || q.text.toLowerCase().includes(search.toLowerCase())
              return matchGrade && matchLevel && matchSubject && matchSearch
            }).length} of {questions.length} questions
          </p>
          {questions.filter(q => {
            const matchGrade = filterGrade === 'all' || q.gradeLevel === parseInt(filterGrade)
            const matchLevel = filterLevel === 'all' || q.gameLevel === parseInt(filterLevel)
            const matchSubject = filterSubject === 'all' || q.subject === filterSubject
            const matchSearch = search === '' || q.text.toLowerCase().includes(search.toLowerCase())
            return matchGrade && matchLevel && matchSubject && matchSearch
          }).map(q => (
            <div key={q.id} style={{
              background: 'white', borderRadius: 12, padding: 16,
              border: '2px solid #EDE1FF', boxShadow: '0 2px 8px rgba(98,0,238,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ background: '#6200EE', color: 'white', fontSize: 11, padding: '2px 8px', borderRadius: 20 }}>Level {q.gameLevel}</span>
                    <span style={{ background: '#EDE1FF', color: '#6200EE', fontSize: 11, padding: '2px 8px', borderRadius: 20 }}>Grade {q.gradeLevel}</span>
                    <span style={{ background: '#e1f5ee', color: '#0f6e56', fontSize: 11, padding: '2px 8px', borderRadius: 20 }}>{q.subject}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: '#333', fontWeight: '500' }}>{q.text}</p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                    {q.options && q.options.map((opt, i) => (
                      <span key={i} style={{
                        fontSize: 12, padding: '2px 8px', borderRadius: 6,
                        background: i === q.correctIndex ? '#4CAF50' : '#f5f5f5',
                        color: i === q.correctIndex ? 'white' : '#666'
                      }}>{['A','B','C','D'][i]}. {opt}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => handleEdit(q)} style={{
                    padding: '6px 12px', background: '#6200EE', color: 'white',
                    border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13
                  }}>Edit</button>
                  <button onClick={() => handleDelete(q.id)} style={{
                    padding: '6px 12px', background: '#F44336', color: 'white',
                    border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13
                  }}>Del</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function QuestionForm({ question, onSave, onCancel }) {
  const [form, setForm] = useState({
    text: question?.text || '',
    option1: question?.options?.[0] || '',
    option2: question?.options?.[1] || '',
    option3: question?.options?.[2] || '',
    option4: question?.options?.[3] || '',
    correctIndex: question?.correctIndex ?? 0,
    subject: question?.subject || 'English',
    gradeLevel: question?.gradeLevel || 1,
    gameLevel: question?.gameLevel || 1,
    hint1: question?.hints?.[0] || '',
    hint2: question?.hints?.[1] || '',
    hint3: question?.hints?.[2] || '',
  })

  async function handleSave() {
    if (!form.text || !form.option1 || !form.option2 || !form.option3 || !form.option4) {
      alert('Please fill in all fields!')
      return
    }
    const data = {
      text: form.text,
      options: [form.option1, form.option2, form.option3, form.option4],
      correctIndex: parseInt(form.correctIndex),
      subject: form.subject,
      gradeLevel: parseInt(form.gradeLevel),
      gameLevel: parseInt(form.gameLevel),
      hints: [form.hint1, form.hint2, form.hint3]
    }
    if (question) {
      await updateDoc(doc(db, 'questions', question.id), data)
    } else {
      await addDoc(collection(db, 'questions'), data)
    }
    onSave()
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    border: '2px solid #EDE1FF', fontSize: 14, boxSizing: 'border-box',
    marginBottom: 10, outline: 'none'
  }

  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: 20,
      border: '2px solid #6200EE', marginBottom: 20
    }}>
      <h3 style={{ color: '#6200EE', margin: '0 0 16px' }}>
        {question ? 'Edit Question' : 'Add New Question'}
      </h3>

      <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>Question</label>
      <textarea
        value={form.text}
        onChange={e => setForm({...form, text: e.target.value})}
        style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
        placeholder="Type your question here..."
      />

      <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>Answer Choices</label>
      {['option1','option2','option3','option4'].map((key, i) => (
        <input key={key} type="text" placeholder={`Choice ${['A','B','C','D'][i]}`}
          value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})}
          style={inputStyle} />
      ))}

      <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>Correct Answer</label>
      <select value={form.correctIndex} onChange={e => setForm({...form, correctIndex: e.target.value})}
        style={inputStyle}>
        <option value={0}>A</option>
        <option value={1}>B</option>
        <option value={2}>C</option>
        <option value={3}>D</option>
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>Subject</label>
          <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={inputStyle}>
            <option>English</option>
            <option>Math</option>
            <option>Science</option>
            <option>History</option>
            <option>Values</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>Grade</label>
          <select value={form.gradeLevel} onChange={e => setForm({...form, gradeLevel: e.target.value})} style={inputStyle}>
            <option value={1}>Grade 1</option>
            <option value={2}>Grade 2</option>
            <option value={3}>Grade 3</option>
            <option value={4}>Grade 4</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>Level</label>
          <select value={form.gameLevel} onChange={e => setForm({...form, gameLevel: e.target.value})} style={inputStyle}>
            {[1,2,3,4,5,6,7,8,9,10].map(l => <option key={l} value={l}>Level {l}</option>)}
          </select>
        </div>
      </div>

      <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>Hints (optional)</label>
      <input type="text" placeholder="Hint 1 (easiest)" value={form.hint1}
        onChange={e => setForm({...form, hint1: e.target.value})} style={inputStyle} />
      <input type="text" placeholder="Hint 2 (medium)" value={form.hint2}
        onChange={e => setForm({...form, hint2: e.target.value})} style={inputStyle} />
      <input type="text" placeholder="Hint 3 (strongest)" value={form.hint3}
        onChange={e => setForm({...form, hint3: e.target.value})} style={inputStyle} />

      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <button onClick={onCancel} style={{
          flex: 1, padding: '12px', background: 'white', color: '#6200EE',
          border: '2px solid #6200EE', borderRadius: 12, cursor: 'pointer', fontSize: 15
        }}>Cancel</button>
        <button onClick={handleSave} style={{
          flex: 1, padding: '12px', background: '#6200EE', color: 'white',
          border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 'bold'
        }}>{question ? 'Update' : 'Save'} Question</button>
      </div>
    </div>
  )
}

export default AdminScreen
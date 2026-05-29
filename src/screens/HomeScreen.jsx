import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomeScreen() {
  const [players, setPlayers] = useState([])
  const [showPlayerPanel, setShowPlayerPanel] = useState(false)
  const [showAddPlayer, setShowAddPlayer] = useState(false)
  const [newName, setNewName] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [grade, setGrade] = useState(null)
  const [error, setError] = useState('')
  const [showWarning, setShowWarning] = useState(false)
  const [pendingGrade, setPendingGrade] = useState(null)
  const [warningFromGrade, setWarningFromGrade] = useState(null)
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [playerToDelete, setPlayerToDelete] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('eduquest_players')
    if (stored) {
      const parsedPlayers = JSON.parse(stored)
      setPlayers(parsedPlayers)
      const lastActive = localStorage.getItem('lastActivePlayer')
      if (lastActive) {
        const found = parsedPlayers.find(p => p.name === lastActive)
        if (found) setSelectedPlayer(found)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedPlayer) {
      const lastGrade = localStorage.getItem(`lastGrade_${selectedPlayer.name}`)
      if (lastGrade) setGrade(parseInt(lastGrade))
      else setGrade(null)
    }
  }, [selectedPlayer])

  function addPlayer() {
    if (newName.trim() === '') { setError('Please enter a name!'); return }
    if (players.find(p => p.name.toLowerCase() === newName.trim().toLowerCase())) {
      setError('That name already exists!'); return
    }
    const newPlayer = { name: newName.trim(), createdAt: Date.now() }
    const updated = [...players, newPlayer]
    setPlayers(updated)
    localStorage.setItem('eduquest_players', JSON.stringify(updated))
    setSelectedPlayer(newPlayer)
    setNewName('')
    setError('')
    setShowAddPlayer(false)
    setShowPlayerPanel(false)
  }

  function deletePlayer(name) {
    setPlayerToDelete(name)
    setShowDeleteWarning(true)
  }

  function confirmDelete() {
    const updated = players.filter(p => p.name !== playerToDelete)
    setPlayers(updated)
    localStorage.setItem('eduquest_players', JSON.stringify(updated))
    if (selectedPlayer?.name === playerToDelete) {
      setSelectedPlayer(null)
      setGrade(null)
    }
    setShowDeleteWarning(false)
    setPlayerToDelete(null)
  }

  function cancelDelete() {
    setShowDeleteWarning(false)
    setPlayerToDelete(null)
  }

  function selectPlayer(player) {
    setSelectedPlayer(player)
    setShowPlayerPanel(false)
    setShowAddPlayer(false)
    setError('')
  }

  function handlePlay() {
    if (!selectedPlayer) { setError('Please select a player!'); return }
    if (!grade) { setError('Please select a grade!'); return }

    const lastGrade = localStorage.getItem(`lastGrade_${selectedPlayer.name}`)
    if (lastGrade && parseInt(lastGrade) !== grade) {
      let hasProgress = false
      for (let level = 1; level <= 10; level++) {
        const stars = localStorage.getItem(`stars_${selectedPlayer.name}_${lastGrade}_${level}`)
        if (stars !== null) { hasProgress = true; break }
      }
      let isCompleted = true
      for (let level = 1; level <= 10; level++) {
        const stars = localStorage.getItem(`stars_${selectedPlayer.name}_${lastGrade}_${level}`)
        if (!stars || parseInt(stars) === 0) { isCompleted = false; break }
      }
      if (hasProgress && !isCompleted) {
        setPendingGrade(grade)
        setWarningFromGrade(parseInt(lastGrade))
        setShowWarning(true)
        return
      }
    }

    localStorage.setItem('lastActivePlayer', selectedPlayer.name)
    localStorage.setItem(`lastGrade_${selectedPlayer.name}`, grade)
    navigate(`/levels/${selectedPlayer.name}/${grade}`)
  }

  function confirmGradeSwitch() {
    localStorage.setItem('lastActivePlayer', selectedPlayer.name)
    localStorage.setItem(`lastGrade_${selectedPlayer.name}`, pendingGrade)
    setShowWarning(false)
    navigate(`/levels/${selectedPlayer.name}/${pendingGrade}`)
  }

  function cancelGradeSwitch() {
    setGrade(warningFromGrade)
    setShowWarning(false)
    setPendingGrade(null)
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh',
      padding: '32px 24px', background: '#f8f0ff'
    }}>
      <div style={{ fontSize: 72 }}>🎓</div>
      <h1 style={{ fontSize: 36, color: '#6200EE', margin: '8px 0' }}>EduQuest</h1>
      <p style={{ color: '#03DAC6', fontSize: 16, margin: '0 0 32px' }}>Learn. Play. Win!</p>

      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Current Player Display */}
        {selectedPlayer ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '16px', borderRadius: 14,
            background: 'white', border: '2px solid #6200EE',
            marginBottom: 16, textAlign: 'center'
          }}>
            <div style={{
  width: 60, height: 60, borderRadius: '50%',
  background: 'linear-gradient(135deg, #6200EE, #9C27B0)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 28, fontWeight: 'bold', color: 'white'
}}>
  {selectedPlayer.name.charAt(0).toUpperCase()}
</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Playing as</div>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: '#6200EE', marginBottom: 10 }}>{selectedPlayer.name}</div>
            <button
              onClick={() => { setShowPlayerPanel(true); setShowAddPlayer(false) }}
              style={{
                padding: '6px 20px', background: '#EDE1FF', color: '#6200EE',
                border: 'none', borderRadius: 20, cursor: 'pointer',
                fontSize: 13, fontWeight: 'bold'
              }}
            >Switch Player</button>
          </div>
        ) : (
          <button
            onClick={() => setShowPlayerPanel(true)}
            style={{
              width: '100%', padding: '14px', background: 'white', color: '#6200EE',
              border: '2px dashed #6200EE', borderRadius: 12, cursor: 'pointer',
              fontSize: 15, fontWeight: 'bold', marginBottom: 16
            }}
          >👤 Select Player</button>
        )}

        {/* Grade Selection */}
        <p style={{ fontSize: 15, fontWeight: 'bold', color: '#555', margin: '0 0 10px' }}>
          Select grade:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[1, 2, 3, 4].map(g => (
            <div key={g} onClick={() => setGrade(g)} style={{
              padding: '14px', borderRadius: 12, textAlign: 'center',
              cursor: 'pointer', fontWeight: 'bold', fontSize: 15,
              border: `2px solid ${grade === g ? '#6200EE' : '#EDE1FF'}`,
              background: grade === g ? '#6200EE' : 'white',
              color: grade === g ? 'white' : '#6200EE'
            }}>Grade {g}</div>
          ))}
        </div>

        {error && (
          <p style={{ color: '#F44336', fontSize: 13, margin: '0 0 10px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <button onClick={handlePlay} style={{
          width: '100%', padding: '16px', fontSize: 18, fontWeight: 'bold',
          background: selectedPlayer && grade ? '#6200EE' : '#ccc',
          color: 'white', border: 'none', borderRadius: 12,
          cursor: selectedPlayer && grade ? 'pointer' : 'not-allowed', marginBottom: 12
        }}>Start Playing! 🚀</button>

        <button onClick={() => navigate('/leaderboard')} style={{
          width: '100%', padding: '14px', fontSize: 16, background: 'white',
          color: '#6200EE', border: '2px solid #6200EE', borderRadius: 12, cursor: 'pointer'
        }}>🏆 Leaderboard</button>
      </div>

      {/* Player Panel Modal */}
      {showPlayerPanel && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(98,0,238,0.3)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white', borderRadius: 20, padding: 24,
            width: '90%', maxWidth: 400, maxHeight: '80vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, color: '#6200EE' }}>Select Player</h3>
              <button onClick={() => { setShowPlayerPanel(false); setShowAddPlayer(false) }}
                style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#888' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              {players.map(player => (
                <div key={player.name} onClick={() => selectPlayer(player)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                  border: `2px solid ${selectedPlayer?.name === player.name ? '#6200EE' : '#EDE1FF'}`,
                  background: selectedPlayer?.name === player.name ? '#EDE1FF' : 'white'
                }}>
                  <div style={{ fontSize: 28 }}>👤</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: 15, color: '#333' }}>{player.name}</div>
                  </div>
                  {selectedPlayer?.name === player.name && <div style={{ fontSize: 18 }}>✓</div>}
                  <button onClick={(e) => { e.stopPropagation(); deletePlayer(player.name) }}
                    style={{ background: 'none', border: 'none', color: '#F44336', cursor: 'pointer', fontSize: 16 }}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {showAddPlayer ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter player name"
                  value={newName}
                  onChange={e => { setNewName(e.target.value); setError('') }}
                  onKeyDown={e => { if (e.key === 'Enter') e.preventDefault() }}
                  style={{
                    width: '100%', padding: '12px 16px', fontSize: 15,
                    borderRadius: 10, border: '2px solid #6200EE',
                    outline: 'none', boxSizing: 'border-box', marginBottom: 8
                  }}
                  autoFocus
                />
                {error && <p style={{ color: '#F44336', fontSize: 13, margin: '0 0 8px' }}>{error}</p>}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setShowAddPlayer(false); setError('') }} style={{
                    flex: 1, padding: '10px', background: 'white', color: '#6200EE',
                    border: '2px solid #6200EE', borderRadius: 10, cursor: 'pointer', fontSize: 14
                  }}>Cancel</button>
                  <button onClick={addPlayer} style={{
                    flex: 1, padding: '10px', background: '#6200EE', color: 'white',
                    border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 'bold'
                  }}>Add Player</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAddPlayer(true)} style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #6200EE, #9C27B0)',
                color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer',
                fontSize: 15, fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(98,0,238,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
                <span style={{ fontSize: 20 }}>➕</span>
                Add New Player
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grade Switch Warning Modal */}
      {showWarning && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(98,0,238,0.3)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: 24, boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'white', borderRadius: 20, padding: 28, maxWidth: 360, width: '100%',
            boxShadow: '0 20px 60px rgba(98,0,238,0.3)', border: '2px solid #EDE1FF', textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ color: '#6200EE', margin: '0 0 8px', fontSize: 18 }}>Switch Grade?</h3>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>
              You have unfinished levels in <strong>Grade {warningFromGrade}</strong>!
              Don't worry — your stars and progress are always saved.
              You can come back anytime.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={cancelGradeSwitch} style={{
                flex: 1, padding: '12px', background: 'white', color: '#6200EE',
                border: '2px solid #6200EE', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 'bold'
              }}>Stay in Grade {warningFromGrade}</button>
              <button onClick={confirmGradeSwitch} style={{
                flex: 1, padding: '12px', background: '#6200EE', color: 'white',
                border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 'bold'
              }}>Switch to Grade {pendingGrade}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Player Warning Modal */}
      {showDeleteWarning && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(98,0,238,0.3)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1001, padding: 24, boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'white', borderRadius: 20, padding: 28, maxWidth: 360, width: '100%',
            boxShadow: '0 20px 60px rgba(98,0,238,0.3)', border: '2px solid #EDE1FF', textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ color: '#F44336', margin: '0 0 8px', fontSize: 18 }}>Delete Player?</h3>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>
              Are you sure you want to delete <strong>{playerToDelete}</strong>?
              All their stars and progress will be lost forever!
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={cancelDelete} style={{
                flex: 1, padding: '12px', background: 'white', color: '#6200EE',
                border: '2px solid #6200EE', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 'bold'
              }}>Cancel</button>
              <button onClick={confirmDelete} style={{
                flex: 1, padding: '12px', background: '#F44336', color: 'white',
                border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 'bold'
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomeScreen
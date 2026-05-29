import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LevelMapScreen from './screens/LevelMapScreen'
import QuizScreen from './screens/QuizScreen'
import ResultScreen from './screens/ResultScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import AdminScreen from './screens/AdminScreen'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/levels/:name/:grade" element={<LevelMapScreen />} />
        <Route path="/quiz/:level/:name/:grade" element={<QuizScreen />} />
        <Route path="/result/:level/:correct/:total/:name/:grade" element={<ResultScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
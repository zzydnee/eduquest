import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LevelMapScreen from './screens/LevelMapScreen'
import QuizScreen from './screens/QuizScreen'
import ResultScreen from './screens/ResultScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/levels/:name" element={<LevelMapScreen />} />
        <Route path="/quiz/:level/:name" element={<QuizScreen />} />
        <Route path="/result/:level/:correct/:total/:name" element={<ResultScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/auth'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Students from './components/Students'
import StudentDetails from './components/StudentDetails'
import Classes from './components/Classes'
import NewStudent from './components/NewStudent'
import NewClass from './components/NewClass'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  let navigate = useNavigate()

  const signOut = () => {
    toggleAuthenticated(false)
    setUser(null)
    localStorage.clear()
    navigate('/')
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <header>
        <NavBar authenticated={authenticated} signOut={signOut} />
      </header>

      <main>
        {authenticated ? (
          <Routes>
            <Route
              path="/"
              element={<Home user={user} authenticated={authenticated} />}
            />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/students/new" element={<NewStudent />} />
            <Route path="/classes/new" element={<NewClass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <Login
                  setUser={setUser}
                  toggleAuthenticated={toggleAuthenticated}
                />
              }
            />
          </Routes>
        )}
      </main>
    </div>
  )
}

export default App

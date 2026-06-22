import NavBar from './components/matrial/NavBar'
import Main from './components/use/Main'
import Welcome from './components/use/Welcome'
import ErrorPage from './components/matrial/ErrorPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useTheme } from './hooks/UseTheme'


function TimePages() {
  return (
    <BrowserRouter basename='/preyer-times' >
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/times' element={<Main />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  const { darkMode } = useTheme()

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className='bg-[#FBF8F1] dark:bg-slate-900 transition-colors duration-300 min-h-screen'>

      <NavBar />
      <TimePages />
      </div>
    </div>
  )
}

export default App

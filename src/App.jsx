import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/page/Home'
import Login from './components/page/Login'
import Registro from './components/page/Registro'
import { Link } from 'react-router-dom'





function App() {

  return (
    <BrowserRouter>
    <nav style={{ padding: '1rem' }}>
      <Link to="/" ></Link>
      <Link to="/login" >Login</Link>
      <Link to="/registro">Registro</Link>
    </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registro' element={<Registro/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

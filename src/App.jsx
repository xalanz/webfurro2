import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/page/Home'
import Login from './components/page/Login'
import Registro from './components/page/Registro'
import { Link } from 'react-router-dom'
import InformacioNostros from './components/page/InformacioNostros'




function App() {

  return (
    <BrowserRouter>
    
      <Link to="/"></Link>
      <Link to="/login" ></Link>
      <Link to="/registro"></Link>
      <Link to="/InformacioNostros"></Link>
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registro' element={<Registro/>} />
        <Route path='/InformacioNostros' element={<InformacioNostros/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

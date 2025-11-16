import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/page/Home'
import Login from './components/page/Login'
import Registro from './components/page/Registro'
import Tienda from './components/page/Tienda'
import { Link } from 'react-router-dom'

import { Link } from 'react-router-dom'
import InformacioNostros from './components/page/InformacioNostros'
import Carito from './components/page/Carito'



function App() {

  return (
    <BrowserRouter>
    
      <Link to="/"></Link>
      <Link to="/login" ></Link>
      <Link to="/registro"></Link>
      <Link to="/InformacioNostros"></Link>
      <Link to="/tienda"></Link>
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registro' element={<Registro/>} />
        <Route path='/tienda' element={<Tienda/>} />
        <Route path='/InformacioNostros' element={<InformacioNostros/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

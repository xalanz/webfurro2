import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/page/Home'
import Login from './components/page/Login'
import Registro from './components/page/Registro'
import Profile from './components/page/Profile'
import { Link } from 'react-router-dom'
import InformacioNostros from './components/page/InformacioNostros'
import Carito from './components/page/Carito'





function App() {

  return (
    <BrowserRouter>
      <Link to="/Home"></Link>
      <Link to="/login" ></Link>
      <Link to="/registro"></Link>
      <Link to="/InformacioNostros"></Link>
      <Link to="/Productos"></Link>
      <Link to="/Profile"></Link>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/Productos' element={<Carito/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registro' element={<Registro/>} />
        <Route path='/InformacioNostros' element={<InformacioNostros/>} />
        <Route path='/Profile' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App










//comando npm i react-router-dom react-router-hash-link
//npm install axios react-router-dom
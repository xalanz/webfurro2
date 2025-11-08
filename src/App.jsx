import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/page/Home'
import { Link } from 'react-router-dom'





function App() {

  return (
    <BrowserRouter>
    <Link to="/">Home</Link>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

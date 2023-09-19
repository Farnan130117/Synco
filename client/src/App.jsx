
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from "./Register"
import Login from "./Login"
import Home from './Home'
import Dashboard from './Dashboard'

function App() {

  return (
    <div>
      <BrowserRouter>
      
      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        
      </Routes>
    </BrowserRouter>
 
    </div>
  )
}

export default App

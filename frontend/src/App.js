import React from 'react'
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Navbar from "./components/navbar"
import Register from "./pages/register_form"
import Login from './pages/login_form'

function App() {
  
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route
                path="/register_form"
                element={<Register />}
            />
            <Route
              path="/login_form"
              element={<Login />}
            />
        </Routes>
    </Router>
  )
}

export default App
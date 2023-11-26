import React from 'react'
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Navbar from "./components/navbar"
import Register from "./pages/register_form"

function App() {
  
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route
                path="/register_form"
                element={<Register />}
            />
        </Routes>
    </Router>
  )
}

export default App
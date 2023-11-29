import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import NavbaNoUser from "./components/navbar_noUser"
import NavbarYesUser from './components/navbar_yesUser'
import Register from "./pages/register_form"
import Login from './pages/login_form'
import Logout from './pages/logout_form'

function App() {
  
  const [message, setMessage] = useState()
  const [isLogged, setIsLogged] = useState(false)

  const handleGet = async () => {
      // event.preventDefault()
      await fetch("http://localhost:5000/polls", {
        method: 'get',
        headers: {
          'Authorization': localStorage.getItem('token')
        },
      })
      .then((response) => {
          if (response.status === 200) {
            setIsLogged(true)
          } else {
            setIsLogged(false)
          }
      })
  }

  useEffect(() => handleGet)

  return (
    <Router>
        <div className='App'>
          {!isLogged ?
          <>
            <NavbaNoUser />
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
                <div>{message}</div>
          </>
          :
          <>
            <NavbarYesUser />
              <Routes>
                <Route
                  path="/logout_form"
                  element={<Logout />}
                />
              </Routes>
          </>
        }
        </div>
    </Router>
  )
}

export default App
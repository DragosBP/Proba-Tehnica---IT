import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import "./styles.css"

function App() {
  
  // const [message, setMessage] = useState()
  const [isLogged, setIsLogged] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

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
            setIsLoaded(true)
          } else {
            setIsLogged(false)
            setIsLoaded(true)
          }
      })
  }

  useEffect(() => {
    handleGet()
  }, [])

  return (
    <div className="app" id="main">
      <Navbar loaded={isLoaded} logged={isLogged}/>
      
    </div>
  )
}

export default App
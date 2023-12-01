import React, { useState } from 'react'

const Logout = () => {

    // const [message, setMessage] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:5000/logout", {
            method: 'post',
        })
        .then((respone) => {
            localStorage.removeItem('token')
            // setMessage("Logged out succsfully")
            window.location.reload(false)
        })
    }

    return (
        <>
            <button onClick={handleSubmit}>
                Logout
            </button>
        </>
    )
}

export default Logout
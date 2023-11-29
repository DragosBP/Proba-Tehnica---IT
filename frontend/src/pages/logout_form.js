import React from 'react'

const Logout = () => {

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:5000/logout", {
            method: 'post',
        })
        .then((respone) => {
            localStorage.removeItem('token')
        })
    }

    return (
        <button onSubmit={handleSubmit} type="submit">
            Logout
        </button>
    )
}

export default Logout
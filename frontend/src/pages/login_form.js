import React, {useEffect, useState} from 'react'

//TODO Update the site to 

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:5000/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                token: localStorage.getItem('token')
            })
        })
        .then((response) => response.text())
        .then((data) => {
            const errMessage = JSON.stringify(data).includes("email")
            if (errMessage) {
                setErrorMessage(data)
            } else {
                localStorage.setItem('token', data)
                setErrorMessage("Looged in with succes")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <br></br>
            <label htmlFor='password'>Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <br></br>
            <div>{errorMessage}</div>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login
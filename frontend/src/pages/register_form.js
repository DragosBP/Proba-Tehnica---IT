import React, {useState} from 'react'

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [emailMessage, setEmailMessage] = useState()
    const [passwordMessage, setPasswordMessage] = useState()
    const [succesMessage, setSuccescMessage] = useState()
    const [nothing, setNothing] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:5000/register", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            })
        })
        .then((response) => response.text())
        .then((data) => {
            console.log(data)
            const containsEmail = JSON.stringify(data).toLowerCase().includes('email')
            const containsPassword = JSON.stringify(data).toLowerCase().includes('password')
            if (containsEmail) {
                setEmailMessage(data)
                setPasswordMessage()
                setSuccescMessage()
            } else if (containsPassword) {
                setEmailMessage()
                setPasswordMessage(data)
                setSuccescMessage()
            } else {
                setEmailMessage()
                setPasswordMessage()
                setSuccescMessage(data)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>{emailMessage}</div>
            <br></br>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <br></br>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                />
            <br></br>
            <div>{passwordMessage}</div>
            <div>{succesMessage}</div>
            <br></br>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register

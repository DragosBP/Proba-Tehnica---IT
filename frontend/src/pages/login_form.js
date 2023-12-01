import React, {useState, useEffect} from 'react'
import Popup from 'reactjs-popup';

const Login = () => {

    const [blurr, setBlurr] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        blurr ? 
            document.getElementById('main').style.filter = 'blur(5px)'
            : 
            document.getElementById('main').style.filter = 'blur(0px)'
    }, [blurr])
    
    const handleBlurr = () => {
        setBlurr(!blurr)
        setOpen(!open)
    }


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
                window.location.reload(false)
            }
        })
    }

    return (
        <>
        <Popup 
            trigger={
                <button>
                    Login
                </button>}
            onOpen={handleBlurr}
            onClose={handleBlurr}
            modal
            nested
        >
            <h1>Login</h1>
            <form>
                <label htmlFor='email'></label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='popup-input'
                    placeholder='Email'
                />
                <label htmlFor='password'></label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <div className='popup-message'>{errorMessage}</div>
            </form>
            <button type="submit" onClick={handleSubmit}>Login</button>
        </Popup>
        </>
    )
}

export default Login
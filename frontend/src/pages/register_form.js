import React, {useState, useEffect} from 'react'
import Popup from 'reactjs-popup';

const Register = () => {

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
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [emailMessage, setEmailMessage] = useState()
    const [passwordMessage, setPasswordMessage] = useState()
    const [succesMessage, setSuccescMessage] = useState()

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

    // const ClosePopup = () => {

    // }
    //TODO Adauga buton de inchidere

    return (
        <>
        <Popup 
            trigger={
                <button>
                    Register
                </button>
                }
            onOpen={handleBlurr}
            onClose={handleBlurr}
            modal
            nested
        >
            <h1>Register</h1>
            <form>
                <label htmlFor='email'></label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <label htmlFor="password"></label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <label htmlFor="passwordConfirm"></label>
                <input
                    type="password"
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Confirm password"
                    />
                <div className='popup-message'>
                    {emailMessage}
                    {passwordMessage}
                    {succesMessage}
                </div>
            </form>
            <button type="submit" onClick={handleSubmit} >Create account</button>
        </Popup>
        </>
    )
}

export default Register

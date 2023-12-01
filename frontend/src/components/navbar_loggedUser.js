import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import Logout from "../pages/logout_form";
import CreatePoll from "../pages/poll_create"
import '../styles.css'
 
const NavbarLoggedUser = () => {

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

    return (
        <>
            <li>
                <Popup 
                    trigger={
                        <button>
                            Create Poll
                        </button>}
                    onOpen={handleBlurr}
                    onClose={handleBlurr}
                    modal
                    nested
                    className="create-popup"
                >
                    <div>
                        <CreatePoll />
                    </div>
                </Popup>
            </li>
            <li>
                <Logout />
            </li>
        </>
    )
}

export default NavbarLoggedUser
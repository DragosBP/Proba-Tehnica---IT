import React from 'react'
import Register from "../pages/register_form";
import Login from "../pages/login_form";
import "../styles.css"
 
const NavbarNoUser = () => {
    //TODO: vezi ce poti face sa fie alea mai bine puse la login si logout ca sa fie distante egale
    return (
        <>
            <li>
                <Login />
            </li>
            <li>
                <Register />
            </li>
        </>
    )
}

export default NavbarNoUser
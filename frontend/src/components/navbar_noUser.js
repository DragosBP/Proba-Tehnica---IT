import React from 'react'
import Register from "../pages/register_form";
import Login from "../pages/login_form";
import "../styles.css"
 
const NavbarNoUser = () => {
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
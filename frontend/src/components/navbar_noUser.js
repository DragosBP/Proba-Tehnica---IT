import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const NavbarNoUser = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/register_form">
                        Register
                    </NavLink>
                    <NavLink to="/login_form">
                        Login
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default NavbarNoUser
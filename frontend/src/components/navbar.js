import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/register_form" activeStyle>
                        Register
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar
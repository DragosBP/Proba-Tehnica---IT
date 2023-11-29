import React from "react";
import { Nav, NavButton, NavLink, NavMenu } from "./NavbarElements";
 
const NavbarYesUser = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavButton to="/logout_form">
                        Logout
                    </NavButton>
                </NavMenu>
            </Nav>
        </>
    )
}

export default NavbarYesUser
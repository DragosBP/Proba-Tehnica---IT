import React from "react";
import Logout from "../pages/logout_form";
import CreatePoll from "../pages/poll_create"
import '../styles.css'
 
const NavbarLoggedUser = (props) => {


    return (
        <>
            <li>
                <CreatePoll 
                    handleGetPolls={props.handleGetPolls}
                />
            </li>
            <li>
                <Logout />
            </li>
        </>
    )
}

export default NavbarLoggedUser
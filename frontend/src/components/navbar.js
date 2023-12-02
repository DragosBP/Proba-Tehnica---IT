import React, {useEffect, useState} from 'react'
import NavbarNoUser from './navbar_noUser'
import NavbarLoggedUser from './navbar_loggedUser'
import "../styles.css"

const Navbar = (props) => {
    const [sticky, setSticky] = useState(true)

    const handleStickyNavbar = () => {
        if (window.innerWidth <= 768)
            setSticky(false)
        else
            setSticky(true)
    }

    useEffect(() => {
        handleStickyNavbar()
    }, [])
    
    return(
        <div className={`navbar ${sticky ? "sticky" : ""}`}>
        <nav>
            <h1>Poza va veni aici</h1>
            <ul>
                {props.loaded ? (
                <>
                    {!props.logged ? (
                    <>
                        <NavbarNoUser />
                    </>
                    ) : (
                    <>
                        <NavbarLoggedUser />
                    </>
                    )}
                </>
                ) : (
                <>
                    <h1>Loading</h1> {/*Felt cute, might delete later*/}
                </>
                )}
            </ul>
        </nav>
        </div>
    )
}

export default Navbar
import React, {useEffect} from 'react'
import NavbarNoUser from './navbar_noUser'
import NavbarLoggedUser from './navbar_loggedUser'
import "../styles.css"

const Navbar = (props) => {
    useEffect(() => {
        document.getElementById('main').style.filter = 'blur(0px)'
    }, [])

    return(
        <nav className='navbar'>
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
    )
}

export default Navbar
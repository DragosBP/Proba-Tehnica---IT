import React, { useEffect, useState } from 'react';
import NavbarNoUser from './navbar_noUser';
import NavbarLoggedUser from './navbar_loggedUser';
import '../styles.css';
import logo from '../images/logo.png';
import menu from '../images/hamburger.png';

const Navbar = (props) => {
    const [sticky, setSticky] = useState(true);
    const [hamburger, setHamburger] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleDeviceType = () => {
        if (window.innerWidth <= 768) {
            setHamburger(true);
            setSticky(false);
        } else {
            setHamburger(false);
            setSticky(true);
        }
    };

    const handleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        window.addEventListener('resize', handleDeviceType);
        handleDeviceType();
        return () => {
            window.removeEventListener('resize', handleDeviceType);
        };
    }, []);

    return (
        <>
            <div className={`navbar ${sticky ? 'sticky' : ''}`}>
                <nav>
                    <img src={logo} alt='Logo' />
                    {hamburger ? (
                        <div className="hamburger-menu">
                            <button onClick={() => handleMenu()}>
                                <img src={menu} alt="Menu" />
                            </button>
                        </div>
                    ) : (
                        <ul>
                            {props.loaded ? (
                                <>
                                    {!props.logged ? <NavbarNoUser /> : <NavbarLoggedUser />}
                                </>
                            ) : (
                                <h1>Loading</h1>
                            )}
                        </ul>
                    )}
                </nav>
            </div>
            {showMenu && hamburger && (
                <div className="dropdown-menu">
                    {!props.logged ? <NavbarNoUser /> : <NavbarLoggedUser />}
                </div>
            )}
        </>
    );
};

export default Navbar;

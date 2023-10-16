import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import cartImage from "./IMG/cart-image-white-removebg.png"
import marvel from "./IMG/marvel-logo.png"
import '../App.css';


const Layout = ({
    showLoginForm, setShowLoginForm, showRegistrationForm,
    setShowRegistrationForm, loggedIn, setLoggedIn, comicsInCart }) => {

    const [cartIcon, setCartIcon] = useState(0)

    useEffect(() => {
        const comicsAmount = [...comicsInCart]
        setCartIcon(comicsAmount ? comicsAmount.length : 0)
    }, [comicsInCart])

    return (
        <div className='toolbar'>
            <div className="buttons">
                <div className="Home" > <NavLink to='/' >HOME</NavLink>
                </div>
                <div className="Comics"> <NavLink to='/comics'>COMICS</NavLink>
                </div>
                <div className="cart-circle-nav-parent">
                    <div className="cart-circle-nav">{cartIcon}</div>
                    <NavLink to='/cart'><img className="cart-image-nav" src={cartImage} alt="cart" /></NavLink>
                </div>
            </div>
            <div className="logo-container">
                <img src={marvel} className="marvel-logo" alt="Marvel logo" />
            </div>
            <div className='LogIn'>
                {(!showLoginForm && !showRegistrationForm && !loggedIn) &&
                    <div className="log_manage" onClick={() => setShowLoginForm(true)}>LOGIN</div>}
                {(showLoginForm || showRegistrationForm) &&
                    <Login showLoginForm={showLoginForm}
                        setShowLoginForm={setShowLoginForm}
                        setShowRegistrationForm={setShowRegistrationForm}
                        showRegistrationForm={showRegistrationForm}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn} />}
                {loggedIn && <NavLink to='/profile'><div className="profile">PROFILE</div></NavLink>}
                {loggedIn && <NavLink to='/'><div className="log_manage" onClick={() => setLoggedIn(false)}>LOGOUT</div></NavLink>}
            </div>

        </div >)
}

export default Layout
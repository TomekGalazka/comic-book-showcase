import { useState, useEffect } from "react";
import Layout from "./Layout";
import ComicLabel from "./ComicLabel";
import "./Cart.css";



function Cart({ showLoginForm, setShowLoginForm, showRegistrationForm, setShowRegistrationForm,
    loggedIn, setLoggedIn, comicsInCart, setComicsInCart }) {

    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [displayedComicLabels, setDisplayedComicLabels] = useState([])
    useEffect(() => {
        const uniqueComics = [];
        [...comicsInCart].map(comicIncart => {
            if (!uniqueComics.includes(comicIncart)) {
                uniqueComics.push(comicIncart)
            }
        })
        setDisplayedComicLabels(uniqueComics)
    }, [comicsInCart])

    useEffect(() => {
        setCartSubTotal([...comicsInCart]
            .map(comic => comic.prices[0].price)
            .reduce((acc, cur) => acc + cur, 0)
            .toFixed(2))
    }, [comicsInCart])

    console.log(comicsInCart)
    return (
        <>
            <div className="cart-navbar">
                <Layout
                    comicsInCart={comicsInCart}
                    showLoginForm={showLoginForm}
                    setShowLoginForm={setShowLoginForm}
                    showRegistrationForm={showRegistrationForm}
                    setShowRegistrationForm={setShowRegistrationForm}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    displayedComicLabels={displayedComicLabels} />
            </div>
            <div className="cart-title-div">
                <h3 className="cart-title">Cart</h3>
            </div>
            <div className="cart-list">
                <div className="cart-elements">
                    {[...displayedComicLabels].map(comic => (
                        <ComicLabel comic={comic}
                            comicsInCart={comicsInCart}
                            setComicsInCart={setComicsInCart}
                        />
                    ))}
                </div>
                <div className="cart-total">
                    <div className="subtotal">Subtotal: {cartSubTotal}$</div>
                    <div className="cart-button-div">
                        <button className="add-to-cart cart-button" type="button">Checkout</button>
                    </div>
                </div>
            </div>
            {!loggedIn && <div className="cart-not-logged-in">
                You are not logged in! You must
                <a className="highlighted_click" onClick={() => setShowLoginForm(true)}> login </a>to purchase comics</div>}
        </>
    )
}

export default Cart;
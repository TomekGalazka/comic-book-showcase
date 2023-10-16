import { useEffect, useState } from "react"
function ComicLabel({ comic, comicsInCart, setComicsInCart }) {
    const [comicQuantity, setComicQuantity] = useState(0)

    useEffect(() => {
        let copies = 0;
        [...comicsInCart].map(comicInCart => {
            if(comicInCart === comic){
                copies++
            }
        })
        setComicQuantity(copies)
    })

    function increaseCopies() {
        setComicQuantity(comicQuantity + 1)
        setComicsInCart([...comicsInCart, comic])
    }

    function decreaseCopies() {
        setComicQuantity(comicQuantity - 1)
        let updatedCart = [...comicsInCart]
        for (let i = 0; i < updatedCart.length; i++) {
            if (updatedCart[i] === comic) {
                updatedCart.splice(i, 1);
                setComicsInCart([...updatedCart])
                return;
            }
        }
    }

    if (comicQuantity === 0) {
        return;
    }

    return (
        <div className="single-item" key={comic.id}>
            <img className="cart-comic-image" src={comic.thumbnail.path + ".jpg"} alt="comic front page" />
            <div className="cart-comic-title">
                <div className="cart-comic-title">{comic.title}</div>
                <div className="cart-comic-quantity">x{comicQuantity}</div>
            </div>
            <div className="cart-comic-price">${(comic.prices[0].price * comicQuantity).toFixed(2)}</div>
            <div>
                <div onClick={() => increaseCopies()}>&#129169;</div>
                <div onClick={() => decreaseCopies()}>&#129171;</div>
            </div>
        </div>
    )
}
export default ComicLabel
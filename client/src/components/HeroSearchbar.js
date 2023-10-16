import Modal from "react-modal";
import { useState } from "react";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


function HeroSearchbar(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [chosenHero, setChosenHero] = useState({})

    function closeModal() {
        setIsOpen(false);
    }

    function handleInputClick(e) {
        props.setShowHeroesRecommendations(true)
    }
    function handleHeroClick(e) {
        const hero = [...props.heroes].filter(el => el.name === e.target.innerText)[0]
        // heroCard Pop-up
        setChosenHero(hero);
        setIsOpen(true);
    }

    return (
        <div className="hero_search_container">
            <input type="text" className="hero_search" placeholder="Search Your Hero" onClick={(e) => handleInputClick(e)} onChange={(e) => props.setHeroSearch(e.target.value)}></input>
            {props.showHeroesRecommendations && (<div className="recommendations">{[...props.heroes].filter(el => el.name.includes(props.heroSearch)).map((el, i) => (<div className="heroName" key={i} onClick={(e) => handleHeroClick(e)}>{el.name}</div>))}</div>)}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Hero-modal"
                appElement={document.getElementById("root") || undefined}
            >
                {modalIsOpen && <div className="heroCard">
                    <button onClick={closeModal}>X</button>
                    <h2>Name: {chosenHero.name}</h2>
                    <div><img src={chosenHero.thumbnail.path + ".jpg"} alt="selected hero" /></div>
                    <div>Description: {chosenHero.description}</div>
                </div>}
            </Modal>
        </div>)
}

export default HeroSearchbar
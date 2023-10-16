import HeroSearchbar from "./HeroSearchbar"
import Layout from "./Layout"

function Homepage({ handleGlobalClick, showLoginForm, setShowLoginForm, showRegistrationForm, setShowRegistrationForm, loggedIn,
    setLoggedIn, setHeroSearch, heroSearch, heroes, setShowHeroesRecommendations, showHeroesRecommendations, comicsInCart }) {
    return (<div>
        <div onClick={(e) => handleGlobalClick(e)} className="App">
            <div className='background-img'>
                <Layout
                    showLoginForm={showLoginForm}
                    setShowLoginForm={setShowLoginForm}
                    showRegistrationForm={showRegistrationForm}
                    setShowRegistrationForm={setShowRegistrationForm}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    comicsInCart={comicsInCart}
                />
                <HeroSearchbar
                    handleGlobalClick={handleGlobalClick}
                    setHeroSearch={setHeroSearch}
                    heroSearch={heroSearch}
                    heroes={heroes}
                    setShowHeroesRecommendations={setShowHeroesRecommendations}
                    showHeroesRecommendations={showHeroesRecommendations} />
            </div>
        </div>
    </div>
    )
}

export default Homepage
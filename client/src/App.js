import './App.css';
import { useState, useEffect } from 'react'
import ProfilePanel from './components/ProfilePanel'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComicsPage from './components/ComicsPage';
import Homepage from './components/Homepage';
import Cart from "./components/Cart.js"


function App() {
  const [heroes, setHeroes] = useState("");
  const [comics, setComics] = useState("");
  const [heroSearch, setHeroSearch] = useState("");
  const [showHeroesRecommendations, setShowHeroesRecommendations] = useState(false);
  const [comicsSearch, setComicsSearch] = useState("");
  const [showComicsRecommendations, setShowComicsRecommendations] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [comicsInCart, setComicsInCart] = useState([]);

  function handleGlobalClick(e) {
    if (e.target.className !== "hero_search") {
      setShowHeroesRecommendations(false)
    }
    if (e.target.className !== "comics_search") {
      setShowComicsRecommendations(false)
    }
  }



  useEffect(() => {
    const getHeroes = async () => {
      const response = await fetch('http://localhost:5000/heroes')
      const data = await response.json();
      setHeroes(data.heroes)
    }
    const getComics = async () => {
      const response = await fetch('http://localhost:5000/comics');
      const data = await response.json();
      setComics(data)
    }

    getComics()
    getHeroes()
  }, [])

  async function deleteAccount(nick) {
    await fetch('http://localhost:5000/api/login', {
      method: "delete",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nick })
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error())
    setLoggedIn(false)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage
          handleGlobalClick={handleGlobalClick}
          setHeroSearch={setHeroSearch}
          heroSearch={heroSearch}
          heroes={heroes}
          setShowHeroesRecommendations={setShowHeroesRecommendations}
          showHeroesRecommendations={showHeroesRecommendations}
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          showRegistrationForm={showRegistrationForm}
          setShowRegistrationForm={setShowRegistrationForm}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          comicsInCart={comicsInCart}
          setComicsInCart={setComicsInCart}
        />} />
        <Route path="/comics" element={<ComicsPage
          handleGlobalClick={handleGlobalClick}
          setComicsSearch={setComicsSearch}
          comicsSearch={comicsSearch}
          comics={comics}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          showRegistrationForm={showRegistrationForm}
          setShowRegistrationForm={setShowRegistrationForm}
          setShowComicsRecommendations={setShowComicsRecommendations}
          showComicsRecommendations={showComicsRecommendations}
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          comicsInCart={comicsInCart}
          setComicsInCart={setComicsInCart}
        />}
        />
        <Route path="/profile" element={<ProfilePanel
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          deleteAccount={deleteAccount}
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          showRegistrationForm={showRegistrationForm}
          setShowRegistrationForm={setShowRegistrationForm}
          comicsInCart={comicsInCart} 
        />} />
        <Route
          path="/cart"
          element={
            <Cart
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              deleteAccount={deleteAccount}
              showLoginForm={showLoginForm}
              setShowLoginForm={setShowLoginForm}
              showRegistrationForm={showRegistrationForm}
              setShowRegistrationForm={setShowRegistrationForm}
              comicsInCart={comicsInCart}
              setComicsInCart={setComicsInCart}
            />
          }



        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

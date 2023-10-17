import React from 'react';
import titleImage from '../images/title.png';
import pokemonsImage from '../images/pokemons.png';
import { useNavigate } from 'react-router-dom';

import './SplashScreen.css';

function SplashScreen() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/app')
    }

    return <div className={"splash-images"}>
        <img id={"titleImage"} src={titleImage} alt={"Title"}/>
        <img id={"pokemonsImage"} src={pokemonsImage} alt={"Pokemon's"}/>
        <button className={"start-button"} onClick={handleClick}>Explore more</button>
    </div>
}

export default SplashScreen;
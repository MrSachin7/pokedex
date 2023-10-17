import "./Home.css"

function Home() {
    return <>
        <div className={"app-container"}>
            <div className={"pokemons-container"}>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>
                 <PokemonCard/>

            </div>

            <div className={"pokemon-details-container"}>

            </div>
        </div>

    </>
}

function PokemonCard() {
    return <div className={"pokemon-card"}>
        <div className={"pokemon-image"}>
            Image goes here..
        </div>
        <div className={"pokemon-name"}>
            Name goes here
        </div>
        <div className={"pokemonId"}>
            Id goes here
        </div>
    </div>
}


export default Home;
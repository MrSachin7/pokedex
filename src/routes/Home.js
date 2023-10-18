import "./Home.css"
import {useQuery} from "@tanstack/react-query";
import {fetchData, fetchPokemonPage} from "../api/pokemon";
import {getAverageRGBA, getContrastColor} from "../utils/colorCalculator";
import {useEffect, useState} from "react";

function Home() {
    const pokemonPageQuery = useQuery({
        queryKey: ["pokemonPage"],
        queryFn: fetchPokemonPage
    });

    if (pokemonPageQuery.isLoading) return <LoadingComponent/>;
    if (pokemonPageQuery.isError) return <ErrorComponent error={pokemonPageQuery.error}/>;

    const pokemonList = pokemonPageQuery.data.data.results;
    return <div className={"app-container"}>
        <div className={"pokemons-container"}>
            <PokemonListComponent pokemons={pokemonList}/>
        </div>

        <div className={"pokemon-details-container"}>
            <div className={"details"}>
                <div className={"stats"}></div>
            </div>
            <div className={"stats"}></div>

        </div>

    </div>

}

function LoadingComponent() {
    return <div>Loading...</div>
}

function ErrorComponent({error}) {
    return <h1> {JSON.stringify(error)}</h1>
}

function PokemonListComponent({pokemons}) {
    return pokemons.map(pokemon => {
        return <PokemonElement key={pokemon.id} pokemon={pokemon}/>
    })
}

function PokemonElement({pokemon}) {

    const [color, setColor] = useState({}); // [state, setState

    const pokemonQuery = useQuery({
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchData(pokemon.url)
    })

    useEffect(() => {
        if (pokemonQuery.isLoading) return;
        if (pokemonQuery.isError) return;

        const pokemonData = pokemonQuery.data.data;
        console.log(pokemonData);

        getAverageRGBA(pokemonData.sprites.front_default).then((averageColour) => {
           const contrastColor= getContrastColor(averageColour);
            setColor({
                contrastColor: `rgb(${contrastColor.r}, ${contrastColor.g}, ${contrastColor.b}`,
                backgroundColor: `rgba(${averageColour.r}, ${averageColour.g}, ${averageColour.b}, ${averageColour.a})`
            });
        });
    }, [pokemonQuery]);

    if (pokemonQuery.isLoading) return;
    if (pokemonQuery.isError) return;

    const pokemonData = pokemonQuery.data.data;
    console.log(pokemonData);

    return <div key={pokemon.id} className={"pokemon-card"} style={{backgroundColor: color.backgroundColor, color : color.contrastColor}}>
        <div className={"pokemon-image"}>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name}/>
        </div>
        <div className={"pokemon-name"}>
            {pokemonData.name}
        </div>
        <div className={"pokemon-id"}>
            #{pokemonData.id}
        </div>
    </div>

}


export default Home;
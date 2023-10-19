import "./Home.css"
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {fetchData, fetchPokemonPage} from "../api/pokemon";
import {getAverageRGBA, getContrastColor} from "../utils/colorCalculator";
import {useEffect, useState} from "react";

function Home() {

    return <div className={"app-container"}>
        <PokemonListComponent/>
        <PokemonDetailsContainer/>
    </div>

}

function LoadingComponent() {
    return <div>Loading...</div>
}

function ErrorComponent({error}) {
    return <h1> {JSON.stringify(error)}</h1>
}

function PokemonListComponent() {

    const {data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage}
        = useInfiniteQuery({
            queryKey: ["pokemonPage"],
            queryFn: fetchPokemonPage,
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.data.next) {
                    console.log("returning next page");
                    return pages.length + 1;
                }
                console.log("returning undefined");
                return undefined;
            }
        }
    );
    if (isLoading) return <LoadingComponent/>;
    if (isError) return <ErrorComponent error={error}/>;

    const pokemons = data.pages.flatMap((page) => page.data.results);

    console.log("pages");
    console.log(data);
    console.log(pokemons);

    return <div className={"pokemons-container"}>
        <div>

            {pokemons?.map((pokemon) => {
                return <PokemonElement key={pokemon.id} pokemon={pokemon}/>
            })}
            <button className={"load-more"} onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage}>
                Load More...
            </button>
        </div>

    </div>


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

        getAverageRGBA(pokemonQuery.data.data.sprites.front_default).then((averageColour) => {
            const contrastColor = getContrastColor(averageColour);
            console.log(contrastColor);
            setColor({
                contrastColor: `rgb(${contrastColor.r}, ${contrastColor.g}, ${contrastColor.b}`,
                backgroundColor: `rgba(${averageColour.r}, ${averageColour.g}, ${averageColour.b}, ${averageColour.a})`
            });
        });
    }, [pokemonQuery.data]);
    if (pokemonQuery.isLoading) return;
    if (pokemonQuery.isError) return;

    const pokemonData = pokemonQuery.data.data;


    return <div key={pokemon.id} className={"pokemon-card"}
                style={{backgroundColor: color.backgroundColor, color: color.contrastColor}}>
        <div>
            <img className={"pokemon-image"} src={pokemonData.sprites.front_default} alt={pokemonData.name}/>
        </div>
        <div className={"pokemon-name"}>
            {pokemonData.name}
        </div>
        <div className={"pokemon-id"}>
            #{pokemonData.id}
        </div>
    </div>

}

function PokemonDetailsContainer() {
    return <div className={"pokemon-details-container"}>
        <div className={"details"}>
            <div className={"details-id"}>
                Id here
            </div>
            <div className={"details-image"}>
                Image here
            </div>
            <div className={"details-name"}>
                Bulbasaur
            </div>

        </div>
        <div className={"stats"}>
            Stats goes here..

        </div>
    </div>

}


export default Home;
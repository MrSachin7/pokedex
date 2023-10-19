import axios from "axios";

 function fetchPokemonPage({pageParam =1}) {
     console.log("Fetching......"+ pageParam);
    let pokemonsPerPage = 20;
    let offset = (pageParam - 1) * pokemonsPerPage;
    let url =`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`;
    return fetchData(url);
}

function fetchData(url){
    return axios.get(url);
}

export  {fetchPokemonPage, fetchData};
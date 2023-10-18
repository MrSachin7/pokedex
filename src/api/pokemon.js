import axios from "axios";

 function fetchPokemonPage() {
    let pokemonsPerPage = 20;
    let offset = 0;
    let url =`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`;
    return fetchData(url);
}

function fetchData(url){
    return axios.get(url);
}

export  {fetchPokemonPage, fetchData};
import axios from "axios";
import { pokeApiMemo } from "../helper/memo";

//Constantes
const dataInicial = {
	count: 0,
	next: null,
	previous: null,
	results: [],
	pokemonDetalle: {},
};

//TYPES
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_PAGINA_EXITO = "SIGUIENTE_PAGINA_EXITO";
const RETROCEDER_PAGINA_EXITO = "RETROCEDER_PAGINA_EXITO";
const OBTENER_DETALLE_POKEMON_EXITO = "OBTENER_DETALLE_POKEMON_EXITO";

//Reducers
export default function pokeReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_POKEMONES_EXITO:
			return { ...state, ...action.payload };
		case SIGUIENTE_PAGINA_EXITO:
			return { ...state, ...action.payload };
		case RETROCEDER_PAGINA_EXITO:
			return { ...state, ...action.payload };
		case OBTENER_DETALLE_POKEMON_EXITO:
			return { ...state, pokemonDetalle: action.payload };
		default:
			return state;
	}
}

//Actions

export const unPokeDetalleAccion =
	(urlPokemonDetalle = "") =>
	async (dispatch) => {
		try {
			const { data: pokemonDetalle } = await axios.get(urlPokemonDetalle);
			dispatch({ type: OBTENER_DETALLE_POKEMON_EXITO, payload: pokemonDetalle });
		} catch (error) {
			console.log(error);
		}
	};

export const obtenerPokemonesAccion = () => async (dispatch) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=50`;

	try {
		const res = await pokeApiMemo(url);
		dispatch({ type: OBTENER_POKEMONES_EXITO, payload: res });
	} catch (error) {
		console.log(error);
	}
};

export const siguientePaginaAction = () => async (dispatch, getState) => {
	const nextUrl = getState().pokemones.next; //Api next url

	//Helper for memoization
	try {
		const res = await pokeApiMemo(nextUrl);
		dispatch({ type: SIGUIENTE_PAGINA_EXITO, payload: res });
	} catch (error) {
		console.log(error);
	}
};
export const retrocederPaginaAction = () => async (dispatch, getState) => {
	const backUrl = getState().pokemones.previous; //Api previously url

	//Helper for memoization
	try {
		const res = await pokeApiMemo(backUrl);
		dispatch({ type: SIGUIENTE_PAGINA_EXITO, payload: res });
	} catch (error) {
		console.log(error);
	}
};

import axios from "axios";

//Constantes
const dataInicial = {
	count: 0,
	next: null,
	previous: null,
	results: [],
};

//TYPES
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_PAGINA_EXITO = "SIGUIENTE_PAGINA_EXITO";
const RETROCEDER_PAGINA_EXITO = "RETROCEDER_PAGINA_EXITO";

//Reducers
export default function pokeReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_POKEMONES_EXITO:
			return { ...state, ...action.payload };
		case SIGUIENTE_PAGINA_EXITO:
			return { ...state, ...action.payload };
		case RETROCEDER_PAGINA_EXITO:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}

//Actions
export const obtenerPokemonesAccion = () => async (dispatch) => {
	try {
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

		dispatch({ type: OBTENER_POKEMONES_EXITO, payload: res.data });
	} catch (error) {
		console.log(error);
	}
};

export const siguientePaginaAction = () => async (dispatch, getState) => {
	//Accedemos a las urls que nos devuelve la API
	const nextUrl = getState().pokemones.next;
	try {
		// http
		const res = await axios.get(nextUrl);

		dispatch({ type: SIGUIENTE_PAGINA_EXITO, payload: res.data });
	} catch (error) {
		console.log(error);
	}
};
export const retrocederPaginaAction = () => async (dispatch, getState) => {
	//Accedemos a las urls que nos devuelve la API
	const backUrl = getState().pokemones.previous;

	try {
		// http
		const res = await axios.get(backUrl);

		dispatch({ type: SIGUIENTE_PAGINA_EXITO, payload: res.data });
	} catch (error) {
		console.log(error);
	}
};

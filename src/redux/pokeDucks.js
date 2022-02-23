import axios from "axios";

//Constantes
const dataInicial = {
	array: [],
	offset: 0,
};

//TYPES
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_PAGINA_EXITO = "SIGUIENTE_PAGINA_EXITO";

//Reducers
export default function pokeReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_POKEMONES_EXITO:
			return { ...state, array: action.payload };
		case SIGUIENTE_PAGINA_EXITO:
			return { ...state, array: action.payload.array, offset: action.payload.offset };
		default:
			return state;
	}
}

//Actions
export const obtenerPokemonesAccion = () => async (dispatch) => {
	try {
		//Llamamos a los datos con los que vamos a trabajar
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

		//dispatch es el que se encarga de llevar le objeto con los datos desde las actions al reducer.
		// la propiedad type es el que se encarga de identificar que reducer vamos a ocupar.
		// y el payload es los datos que queremos llevar al store.
		dispatch({ type: OBTENER_POKEMONES_EXITO, payload: res.data.results });
	} catch (error) {
		console.log(error);
	}
};

//Notese que podemos enviar argumenbtos desde el componente React para que podamos usarlo en el
//action. En este caso enviamos un argumento número que se utiliza en la lógica del action para hacer
// la interacción
export const siguientePaginaAction =
	(numero = 0) =>
	async (dispatch, getState) => {
		// estado actual del offset
		const { offset } = getState().pokemones;

		// nuevo offset que vamos a utilizar
		const siguiente = offset + numero;

		try {
			// http
			const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`);

			//En el dispatch en vez de utilizar un dato vamos a enviar un objeto para poder enviar tanto la respuesta del http
			//como el nuevo offset
			dispatch({ type: SIGUIENTE_PAGINA_EXITO, payload: { array: res.data.results, offset: siguiente } });
		} catch (error) {
			console.log(error);
		}
	};

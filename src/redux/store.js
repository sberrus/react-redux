import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Reducers
import pokeReducer from "./pokeDucks";
import usuarioReducer, { leerUsuarioActivoAccion } from "./usuarioDuck";

//Unificamos los reducers
const rootReducer = combineReducers({
	pokemones: pokeReducer,
	usuario: usuarioReducer,
});

export default function generateStore() {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
	/**
	 * Con redux podemos disparar acciones en el momento de que la página web se cargue. Esto nos permite disparar ciertas
	 * acciones antes de que ejecute el resto de codigo de nuestra app.
	 * En este caso la utilizamos para ller el usuario que esta en localStorage al momento de cargar la web.
	 *
	 * Para que funcione correctamente debemos enviarle como argumento a la función que devuelve la acción, el dispatch que
	 * nos provee la store.
	 */
	leerUsuarioActivoAccion()(store.dispatch);
	// 						  ^^^^^^^^^^^^^^
	// Es importante que enviemos el dispatch en el segundo paréntesis para que todo funcione correctamente.
	return store;
}

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Reducers
import pokeReducer from "./pokeDucks";

//Unificamos los reducers
const rootReducer = combineReducers({
	pokemones: pokeReducer,
});

export default function generateStore() {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
	return store;
}

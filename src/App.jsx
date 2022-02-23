import Pokemones from "./components/Pokemones";

// Para poder acceder a los datos que nos ofrece redux tenemos que arropar a todos los componentes
// que querramos que accedan a dichos datos mediante un provider.
// Similar a como tenemos que hacer con los context.
// Este provider recive como prop la store que deseamos que provea los datos.
import { Provider } from "react-redux";

// Importamos la store que
import generateStore from "./redux/store";

function App() {
	// creamos la instancia de la tienda
	const store = generateStore();
	return (
		// Pasamos la tienda como prop al provider
		<Provider store={store}>
			<Pokemones />
		</Provider>
	);
}

export default App;

/**
 * Hasta este punto en el pluggin de redux-devtools deberiamos ver el array de pokemones.
 * Si no se ve ha habido algun error con la configuración de la store
 */

import Pokemones from "./components/Pokemones";

function App() {
	// creamos la instancia de la tienda
	return (
		// Pasamos la tienda como prop al provider
		<Pokemones />
	);
}

export default App;

/**
 * Hasta este punto en el pluggin de redux-devtools deberiamos ver el array de pokemones.
 * Si no se ve ha habido algun error con la configuración de la store
 */

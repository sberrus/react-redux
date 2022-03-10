import axios from "axios";

/**
 * ME ACABO DE ACORDAR QUE ESTO NO ES MEMOIZATION PERO IGUAL SIRVE PARA
 * NO REALIZAR QUERYS INNECESARIAS
 */

export const pokeApiMemo = async (url = "") => {
	//verificar si existe el espacio en memoria
	if (!localStorage.getItem("pokeApiMemo")) {
		localStorage.setItem("pokeApiMemo", JSON.stringify({}));
	}

	//obtenemos el storage
	const localStorageMemo = JSON.parse(localStorage.getItem("pokeApiMemo"));

	//verificar si los datos no estan en localStorage buscando por su url
	if (!localStorageMemo[url]) {
		try {
			//obtenemos la data
			const res = await axios.get(url);

			//insertamos la data en el objeto que se guardara en localstorage
			localStorageMemo[url] = res.data;

			// guardamos el objeto en localstorage
			localStorage.setItem("pokeApiMemo", JSON.stringify(localStorageMemo));

			// retornamos la data
			return localStorageMemo[url];
		} catch (error) {
			console.log(error);
		}
	}

	return localStorageMemo[url];
};

import React from "react";

// Dispatch y selector son los metodos que nos permiten interactuar y leer datos de la store
import { useDispatch, useSelector } from "react-redux";

// Importamos la acción que deseamos usar de los redux de la store.
import { obtenerPokemonesAccion } from "../redux/pokeDucks";

const Pokemones = () => {
	// Instanciamos dispatch para poder interactuar con la store.
	const dispatch = useDispatch();

	return (
		<div>
			<h1>Lista de pokemones</h1>
			<button
				onClick={() => {
					// Ejecutamos en el argumento la acción que deseemos ejecutar del reducer.
					// En este caso usamos la acción "obtenerPokemonesAccion" definida en el pokePato.
					dispatch(obtenerPokemonesAccion());
				}}
			>
				Get Pokemones
			</button>
		</div>
	);
};

export default Pokemones;

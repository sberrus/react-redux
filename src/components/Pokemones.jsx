import React, { useState } from "react";

// Dispatch y selector son los metodos que nos permiten interactuar y leer datos de la store
import { useDispatch, useSelector } from "react-redux";

// Importamos la acción que deseamos usar de los redux de la store.
import { obtenerPokemonesAccion, siguientePaginaAction } from "../redux/pokeDucks";

const Pokemones = () => {
	// Instanciamos dispatch para poder interactuar con la store.
	const dispatch = useDispatch();

	// Instanciamos useSelector para poder leer los datos de la store.
	// useSelector recibe un callback que recibe la store y nosotros podemos
	// indicar a que datos de la store queremos acceder
	const pokemones = useSelector((store) => {
		// Accedemos al array dentro de la propiedad pokemones de la store
		return store.pokemones.array;
	});

	const offset = useSelector((store) => {
		// Accedemos al array dentro de la propiedad pokemones de la store
		return store.pokemones.offset;
	});

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

			<button
				onClick={() => {
					// Ejecutamos en el argumento la acción que deseemos ejecutar del reducer.
					// En este caso usamos la acción "obtenerPokemonesAccion" definida en el pokePato.

					// Podemos enviar argumentos que recibirá la primera función flecha de los actions
					dispatch(siguientePaginaAction(20));
				}}
			>
				Siguiente
			</button>

			<ol>
				{pokemones.map((pokemon) => (
					<li key={pokemon.name}>
						<a href={pokemon.url}>{pokemon.name}</a>
					</li>
				))}
			</ol>
		</div>
	);
};

export default Pokemones;

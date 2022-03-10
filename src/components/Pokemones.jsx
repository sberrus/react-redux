import React from "react";
import { Container, Button } from "react-bootstrap";

// Dispatch y selector son los metodos que nos permiten interactuar y leer datos de la store
import { useDispatch, useSelector } from "react-redux";

// Importamos la acción que deseamos usar de los redux de la store.
import { obtenerPokemonesAccion, siguientePaginaAction, retrocederPaginaAction } from "../redux/pokeDucks";

const Pokemones = () => {
	// Instanciamos dispatch para poder interactuar con la store.
	const dispatch = useDispatch();

	const pokemones = useSelector((store) => {
		return store.pokemones.results;
	});
	const nextUrl = useSelector((store) => {
		return store.pokemones.next;
	});
	const previousUrl = useSelector((store) => {
		return store.pokemones.previous;
	});

	return (
		<Container>
			<h1>Lista de pokemones</h1>
			{previousUrl ? (
				<Button
					onClick={() => {
						dispatch(retrocederPaginaAction());
					}}
				>
					Anterior
				</Button>
			) : (
				<Button
					disabled
					onClick={() => {
						dispatch(retrocederPaginaAction());
					}}
				>
					Anterior
				</Button>
			)}{" "}
			{nextUrl ? (
				<Button
					disabled
					onClick={() => {
						dispatch(obtenerPokemonesAccion());
					}}
				>
					Get Pokemones
				</Button>
			) : (
				<Button
					onClick={() => {
						dispatch(obtenerPokemonesAccion());
					}}
				>
					Get Pokemones
				</Button>
			)}{" "}
			{nextUrl ? (
				<Button
					onClick={() => {
						dispatch(siguientePaginaAction());
					}}
				>
					Siguiente
				</Button>
			) : (
				<Button
					disabled
					onClick={() => {
						dispatch(siguientePaginaAction());
					}}
				>
					Siguiente
				</Button>
			)}
			<ol>
				{pokemones.map((pokemon) => (
					<li key={pokemon.name}>
						<a href={pokemon.url}>{pokemon.name}</a>
					</li>
				))}
			</ol>
		</Container>
	);
};

export default Pokemones;

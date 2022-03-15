import React from "react";
import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";

// Dispatch y selector son los metodos que nos permiten interactuar y leer datos de la store
import { useDispatch, useSelector } from "react-redux";

// Importamos la acción que deseamos usar de los redux de la store.
import {
	obtenerPokemonesAccion,
	siguientePaginaAction,
	retrocederPaginaAction,
	unPokeDetalleAccion,
} from "../redux/pokeDucks";

//Components
import DetallePokemon from "./DetallePokemon";

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
			<Row>
				<Col>
					<h5>Lista de pokemones</h5>
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
							variant={"secondary"}
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
							variant={"secondary"}
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
							variant={"secondary"}
							disabled
							onClick={() => {
								dispatch(siguientePaginaAction());
							}}
						>
							Siguiente
						</Button>
					)}
					{/* Lista de pokemones */}
					<ListGroup className="mt-3">
						{pokemones.map((pokemon) => (
							<ListGroup.Item
								key={pokemon.name}
								action
								onClick={() => {
									dispatch(unPokeDetalleAccion(pokemon.url));
								}}
							>
								{pokemon.name}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>

				{/* Detalles de pokemones */}
				<Col className="border">
					<DetallePokemon />
				</Col>
			</Row>
		</Container>
	);
};

export default Pokemones;

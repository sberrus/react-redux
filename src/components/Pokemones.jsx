import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
	obtenerPokemonesAccion,
	siguientePaginaAction,
	retrocederPaginaAction,
	unPokeDetalleAccion,
} from "../redux/pokeDucks";

//Components
import DetallePokemon from "./DetallePokemon";

const Pokemones = () => {
	const [auth] = useState(() => getAuth());

	const navigate = useNavigate();

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

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate("/login");
			}
		});

		return () => {};
	}, [auth, navigate]);

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

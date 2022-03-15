import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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
	//usando Firebase para authenticación
	const [isLogged, setIsLogged] = useState(false);
	const [auth] = useState(() => getAuth());
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				signInWithPopup(auth, provider)
					.then((result) => {
						// Si todo sale bien devuelve al usuario autenticado
					})
					.catch((error) => {
						//Cacheamos el error
						console.log(error);
					});
				return;
			}
			console.log(user);
			setIsLogged(true);
		});

		return () => {};
	}, []);

	const logOut = () => {
		signOut(auth)
			.then(() => {
				setIsLogged(false);
			})
			.catch((error) => console.log(error));
	};

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
				{isLogged && (
					<Col sm={12}>
						<Button
							variant="danger"
							onClick={() => {
								logOut();
							}}
						>
							Sign Out
						</Button>
					</Col>
				)}
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

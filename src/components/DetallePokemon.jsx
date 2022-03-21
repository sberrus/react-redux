import React from "react";
import { Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const DetallePokemon = () => {
	//Llamamos al dispatch de redux y a la store
	const detallePokemon = useSelector((store) => store.pokemones.pokemonDetalle);

	return (
		<div className="sticky-top">
			<h5 className="my-2">Detalle Pokemon</h5>
			<Card className="mt-5 text-center">
				{detallePokemon?.id ? (
					<>
						<Col md={10} lg={8} xl={6} className="m-auto">
							<Card.Img
								variant="top"
								src={detallePokemon.sprites.other["official-artwork"].front_default}
							/>
						</Col>
						<Card.Body>
							<Card.Title>{detallePokemon.name}</Card.Title>
							<Card.Text>
								alto:{detallePokemon.height} | ancho:{detallePokemon.weight}
							</Card.Text>
						</Card.Body>
					</>
				) : (
					<>
						<small className="text-secondary text-center w-100 d-block m-auto">Seleccione Pokemon</small>
					</>
				)}
			</Card>
		</div>
	);
};

export default DetallePokemon;

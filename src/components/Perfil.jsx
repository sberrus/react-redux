import React, { useState } from "react";
import { Button, Card, Container, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { cambiarNombreUsuario } from "../redux/usuarioDuck";

const Perfil = () => {
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [isChangingName, setIsChangingName] = useState(false);

	const dispatch = useDispatch();

	const usuario = useSelector((store) => store.usuario.user);

	const handleInputNameChange = (e) => {
		setNombreUsuario(e.target.value);
	};

	const toggleChangingNameFlag = () => {
		setIsChangingName(!isChangingName);
		setNombreUsuario("");
	};

	const handleChangeName = async () => {
		dispatch(cambiarNombreUsuario(nombreUsuario));
		setIsChangingName(!isChangingName);
		setNombreUsuario("");
	};

	return (
		<Container>
			<Card>
				<div className="m-auto mt-3 img-fluid position-relative">
					<Card.Img variant="top" src={usuario.photoUrl} style={{ height: "8em", width: "auto" }} />
					{/* Configurar para cambiar imágen */}
					<button className="btn ms-2 p-0 position-absolute top-0 end-0">
						<i className="bi bi-pencil-square"></i>
					</button>
				</div>

				<Card.Body className="text-center col-md-6 col-lg-4 m-auto">
					<Card.Title>
						{isChangingName ? (
							<>
								<InputGroup className="mb-3">
									<FormControl
										placeholder="Ingrese nuevo nombre de usuario"
										aria-label="Ingrese nuevo nombre de usuario"
										aria-describedby="Editar Nombre Usuario"
										value={nombreUsuario}
										onChange={(e) => {
											handleInputNameChange(e);
										}}
									/>
									<Button variant="outline-success" onClick={handleChangeName}>
										Editar Nombre
									</Button>
								</InputGroup>
								<Button variant="outline-danger" onClick={toggleChangingNameFlag}>
									Volver
								</Button>
							</>
						) : (
							<>
								{usuario.displayName}{" "}
								<button className="btn ms-2 p-0" onClick={toggleChangingNameFlag}>
									<i className="bi bi-pencil-square"></i>
								</button>
							</>
						)}
					</Card.Title>
					<ListGroup className="list-group-flush">
						<ListGroupItem>{usuario.email}</ListGroupItem>
					</ListGroup>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Perfil;

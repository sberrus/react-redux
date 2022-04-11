import React, { useState } from "react";
import {
	Button,
	Card,
	Container,
	Form,
	FormControl,
	InputGroup,
	ListGroup,
	ListGroupItem,
	Spinner,
} from "react-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { cambiarNombreUsuario, editarFotoPerfil } from "../redux/usuarioDuck";

const Perfil = () => {
	//Estados del input cambio de usuarios
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [isChangingName, setIsChangingName] = useState(false);
	const [show, setShow] = useState(false);

	//Redux
	const dispatch = useDispatch();
	const usuario = useSelector((store) => store.usuario.user);
	const loading = useSelector((store) => store.usuario.loading);

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

	const handleImageUpload = (e) => {
		//Extraido de notas masterjs dalto.
		const image = e.target.files[0];

		//Tipos válidos de archivos
		const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/svg", "image/svg+xml"];

		//Validación de tipo de archivos
		if (validTypes.includes(image.type)) {
			dispatch(editarFotoPerfil(image));
		} else {
			console.error(image.type);
			console.error("Archivo no válido");
		}
	};

	return (
		<>
			<Container className={"vh-100"}>
				<Card>
					<div className="m-auto mt-3 img-fluid position-relative">
						<Card.Img variant="top" src={usuario.photoUrl} style={{ height: "8em", width: "auto" }} />
						{/* Configurar para cambiar imágen */}
						<div className="position-absolute top-0 end-0 text-light">
							<Form.Group controlId="formFile" className="mb-3">
								<Form.Label className="btn btn-outline-dark p-1 px-2 border">
									<i className="bi bi-pencil-square"></i>
								</Form.Label>
								<Form.Control
									type="file"
									accept="image/*"
									style={{ display: "none" }}
									onChange={(e) => {
										handleImageUpload(e);
									}}
								/>
							</Form.Group>
						</div>
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

									<Button
										variant="outline-danger"
										onClick={toggleChangingNameFlag}
										disabled={loading}
									>
										Volver
									</Button>
								</>
							) : (
								<>
									{loading ? (
										<Spinner animation="border" variant="dark"></Spinner>
									) : (
										<>
											{usuario.displayName}{" "}
											<button className="btn ms-2 p-0" onClick={toggleChangingNameFlag}>
												<i className="bi bi-pencil-square"></i>
											</button>
										</>
									)}
								</>
							)}
						</Card.Title>
						<ListGroup className="list-group-flush">
							<ListGroupItem>{usuario.email}</ListGroupItem>
						</ListGroup>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default Perfil;

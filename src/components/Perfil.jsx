import React, { useState } from "react";
import { Button, Card, Container, FormControl, InputGroup, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { cambiarNombreUsuario } from "../redux/usuarioDuck";

const Perfil = () => {
	//Estados del input cambio de usuarios
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [isChangingName, setIsChangingName] = useState(false);

	//Estados del FileReader
	const [fileReaderImg, setfileReaderImg] = useState(null);

	const dispatch = useDispatch();

	const usuario = useSelector((store) => store.usuario.user);
	const loading = useSelector((store) => store.usuario.loading);

	console.log(loading);

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

	const handleFileLoad = (e) => {
		//Extraido de notas masterjs dalto.
		const file = e.target.files[0];

		//Usando FileReader.
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.addEventListener("load", (e) => {
			setfileReaderImg(e.currentTarget.result);
		});
	};

	return (
		<Container>
			<Card>
				<div className="m-auto mt-3 img-fluid position-relative">
					<Card.Img variant="top" src={usuario.photoUrl} style={{ height: "8em", width: "auto" }} />
					{/* Configurar para cambiar imágen */}
					<div>
						<label
							htmlFor="file-upload"
							className="custom-file-upload"
							style={{
								border: "1px solid #ccc",
								display: "inline-block",
								padding: "6px 12px",
								cursor: "pointer",
							}}
						>
							<input type="file" id="fileReader" onChange={handleFileLoad} />
							Custom Upload
						</label>
					</div>
					<button className="btn ms-2 p-0 position-absolute top-0 end-0">
						<i className="bi bi-pencil-square"></i>
					</button>
				</div>
				{fileReaderImg && (
					<>
						<img src={fileReaderImg} alt="" />
					</>
				)}

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

								<Button variant="outline-danger" onClick={toggleChangingNameFlag} disabled={loading}>
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
	);
};

export default Perfil;

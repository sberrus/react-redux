import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesionAccion } from "../redux/usuarioDuck";

const NavMenu = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const userActive = useSelector((store) => store.usuario.activo);
	const logOut = async () => {
		await dispatch(cerrarSesionAccion());
		navigate("/login");
	};

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg" className="mb-2">
				<Container className="d-flex">
					<div>
						<Link to="/" className="navbar-brand">
							Home
						</Link>
					</div>
					<div>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<NavLink to="/" className="nav-link">
									Inicio
								</NavLink>
								{userActive ? (
									<Button variant="danger" onClick={logOut}>
										Cerrar Sesión
									</Button>
								) : (
									<NavLink to="/login" className="nav-link">
										Login
									</NavLink>
								)}
							</Nav>
						</Navbar.Collapse>
					</div>
				</Container>
			</Navbar>
		</>
	);
};

export default NavMenu;

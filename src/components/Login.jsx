import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ingresoUsuarioAccion } from "../redux/usuarioDuck";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	//Con este loading haremos lógica de UX para nuestra pàgina
	const loading = useSelector((store) => store.usuario.loading);
	const activo = useSelector((store) => store.usuario.activo);

	const access = async () => {
		dispatch(ingresoUsuarioAccion());
	};

	useEffect(() => {
		if (activo) {
			navigate("/");
		}
		return () => {};
	}, [activo]);

	return (
		<div className="text-center mt-5">
			<h3>Ingreso con Google</h3>
			<hr />
			<Button variant="dark" onClick={access} disabled={loading}>
				Acceder
			</Button>
		</div>
	);
};

export default Login;

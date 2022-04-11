import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Components
import Pokemones from "./components/Pokemones";
import Login from "./components/Login";
import NavMenu from "./components/NavMenu";
import Perfil from "./components/Perfil";

function App() {
	const [auth] = useState(() => getAuth());
	const [firebaseUser, setFirebaseUser] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setFirebaseUser(user);
			} else {
				setFirebaseUser(null);
			}
		});

		return () => {};
	});

	//TODO: BUSCAR METODO MÁS OPTIMO PARA ESTA SOLUCIÓN
	const RutaPrivada = ({ children }) => {
		if (localStorage.getItem("usuario")) {
			const storedUser = JSON.parse(localStorage.getItem("usuario"));
			if (storedUser?.uid && firebaseUser?.uid) {
				if (storedUser.uid === firebaseUser.uid) {
					return children;
				}
				return <Navigate to={"/login"} />;
			}
			return <Navigate to={"/login"} />;
		} else {
			return <Navigate to={"/login"} />;
		}
	};

	return firebaseUser !== false ? (
		<>
			<NavMenu />
			<Routes>
				<Route
					path="/"
					element={
						<RutaPrivada>
							<Pokemones />
						</RutaPrivada>
					}
				/>
				<Route
					path="/perfil"
					element={
						<RutaPrivada>
							<Perfil />
						</RutaPrivada>
					}
				/>
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	) : (
		<>Cargando</>
	);
}

export default App;

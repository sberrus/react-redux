import { Route, Routes } from "react-router-dom";

//Components
import Pokemones from "./components/Pokemones";
import Login from "./components/Login";
import NavMenu from "./components/NavMenu";

function App() {
	return (
		<>
			<NavMenu />
			<Routes>
				<Route path="/" element={<Pokemones />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	);
}

export default App;

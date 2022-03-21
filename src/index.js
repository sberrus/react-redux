import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Assets
import "./index.css";

//Components
import App from "./App";

//Firebase Config
import "./config/firebase";

//Redux
import { Provider } from "react-redux";
import generateStore from "./redux/store";
import { BrowserRouter } from "react-router-dom";
//Store
const store = generateStore();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

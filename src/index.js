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
//Store
const store = generateStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

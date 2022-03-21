import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

//constants
const dataInicial = {
	loading: false,
	activo: false,
};

// types
const LOADING = "LOADING";
const USUARIO_ERROR = "USUARIO_ERROR";
const USUARIO_EXITO = "USUARIO_EXITO";
const CERRAR_SESION_EXITO = "CERRAR_SESION_EXITO";

// reducer
export default function usuarioReducer(state = dataInicial, action) {
	switch (action.type) {
		//
		case LOADING:
			return { ...state, loading: true };
		case USUARIO_ERROR:
			//Indicamos que el state va a ser de nuevo la data inicial que tiene ambos campos en false.
			return { ...dataInicial };
		case USUARIO_EXITO:
			return { ...state, loading: false, activo: true, user: action.payload };
		case CERRAR_SESION_EXITO:
			return { ...dataInicial };
		default:
			return { ...state };
	}
}

// actions
export const ingresoUsuarioAccion = () => async (dispatch) => {
	// Al ejecutarse esta acción inicializamos el estado de "loading" de este pato.
	dispatch({
		type: LOADING,
	});
	try {
		//Init auth provider
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		const res = await signInWithPopup(auth, provider);

		const usuario = {
			uid: res.user.uid,
			email: res.user.email,
			displayName: res.user.displayName,
			photoUrl: res.user.photoURL,
		};

		//Init firestore provider
		const db = getFirestore();

		const docRef = doc(db, "usuarios", usuario.email);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists) {
			console.log(docSnap.data());
			dispatch({
				type: USUARIO_EXITO,
				payload: docSnap.data(),
			});
			localStorage.setItem("usuario", JSON.stringify(docSnap.data()));
		} else {
			const usuariosRef = collection(db, "usuarios");
			await setDoc(doc(usuariosRef, usuario.email), usuario);
			dispatch({
				type: USUARIO_EXITO,
				payload: usuario,
			});
			localStorage.setItem("usuario", JSON.stringify(usuario));
		}
	} catch (error) {
		console.log(error);
		dispatch({ type: USUARIO_ERROR });
	}
};

export const leerUsuarioActivoAccion = () => async (dispatch) => {
	if (localStorage.getItem("usuario")) {
		dispatch({ type: USUARIO_EXITO, payload: JSON.parse(localStorage.getItem("usuario")) });
	}
};

export const cerrarSesionAccion = () => async (dispatch) => {
	const auth = getAuth();

	await signOut(auth);
	localStorage.removeItem("usuario");

	dispatch({ type: CERRAR_SESION_EXITO });
};
